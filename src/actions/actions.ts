"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { authSchema, FormSchema, PetEssentials, ValidPetId } from "@/lib/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// User Actions

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function logIn(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return "Invalid data";
  }

  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: FormData) {
  // check if formData is an instance of FormData
  if (!(formData instanceof FormData)) {
    return "Invalid data";
  }
  // convert formData to plain object
  const formDataEntries = Object.fromEntries(formData.entries());
  // validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return "Invalid data";
  }

  const { email, password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
  await signIn("credentials", formData);
}

// Pet Actions
export async function addPet(formData: PetEssentials) {
  console.log(formData);
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validatedPet = FormSchema.safeParse(formData);
  if (!validatedPet.success) {
    return validatedPet.error.errors;
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return "Error adding pet";
  }

  revalidatePath("/app", "layout");
}

export async function editPet(PetId: string, newPet: PetEssentials) {
  // authentication check
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  // validation check
  const validatedPet = FormSchema.safeParse(newPet);
  const validatedId = ValidPetId.safeParse(PetId);

  if (!validatedPet.success || !validatedId.success) {
    return "Invalid data";
  }
  // authorization check
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedId.data,
    },
  });
  if (!pet) {
    return "Pet not found";
  }
  if (pet.userId !== session.user.id) {
    return "Unauthorized";
  }

  // data mutation

  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return "Error editing pet";
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(id: string) {
  // authentication check
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  // validation check
  const validatedId = ValidPetId.safeParse(id);
  if (!validatedId.success) {
    return "Invalid data";
  }
  // authorization check
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedId.data,
    },
  });
  if (!pet) {
    return "Pet not found";
  }
  if (pet.userId !== session.user.id) {
    return "Unauthorized";
  }
  // data mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data,
      },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    console.error("Error deleting pet:", error);
  }
}

// Payment Actions
export async function createCheckoutSession() {
  // authentication check
  

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  console.log(session);
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1PvRLNE5yS7pWHMgBgM7guGA",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });
  console.log(checkoutSession.url);
  // return checkoutSession.url;

  redirect(checkoutSession.url);
}

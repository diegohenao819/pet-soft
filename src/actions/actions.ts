"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { FormSchema, PetEssentials, ValidPetId } from "@/lib/types";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// User Actions
export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  console.log(authData);
  await signIn("credentials", authData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  try {
    await prisma.user.create({
      data: {
        email: formData.get("email") as string,
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

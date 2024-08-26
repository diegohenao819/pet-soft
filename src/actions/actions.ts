"use server";

import { signIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { FormSchema, PetEssentials, ValidPetId } from "@/lib/types";
import { revalidatePath } from "next/cache";

// User Actions
export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  console.log(authData);

  await signIn("credentials", authData);
}

// Pet Actions
export async function addPet(formData: PetEssentials) {
  console.log(formData);

  const validatedPet = FormSchema.safeParse(formData);
  if (!validatedPet.success) {
    return validatedPet.error.errors;
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return "Error adding pet";
  }

  revalidatePath("/app", "layout");
}

export async function editPet(PetId: string, newPet: PetEssentials) {
  const validatedPet = FormSchema.safeParse(newPet);
  const validatedId = ValidPetId.safeParse(PetId);

  if (!validatedPet.success || !validatedId.success) {
    return "Invalid data";
  }

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
  const validatedId = ValidPetId.safeParse(id);
  if (!validatedId.success) {
    return "Invalid data";
  }

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

// export async function deletePet(id: string) {
//   // Usar await con una promesa que envuelve setTimeout
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   try {
//     await prisma.pet.delete({
//       where: {
//         id,
//       },
//     });

//     // Revalidar la ruta después de la eliminación
//     revalidatePath("/app", "layout");
//   } catch (error) {
//     console.error("Error deleting pet:", error);
//   }
// }

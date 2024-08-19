"use server";

import prisma from "@/lib/db";
import { FormSchema, PetEssentials } from "@/lib/types";
import { revalidatePath } from "next/cache";


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

export async function editPet(id: string, formData: PetEssentials) {
  console.log(formData);

  try {
    await prisma.pet.update({
      where: {
        id,
      },
      data: {
        name: formData.name,
        ownerName: formData.ownerName,
        imageUrl: formData.imageUrl,
        age: formData.age,
        notes: formData.notes,
      },
    });
  } catch (error) {
    return "Error editing pet";
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(id: string) {
  try {
    await prisma.pet.delete({
      where: {
        id,
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

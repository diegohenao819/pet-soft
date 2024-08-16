"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

type petFormType = {
  id?: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

export async function addPet(formData: petFormType) {
  console.log(formData);

  try {
    await prisma.pet.create({
      data: {
        name: formData.name,
        ownerName: formData.ownerName,
        imageUrl: formData.imageUrl,
        age: formData.age,
        notes: formData.notes,
      },
    });
  } catch (error) {
    return "Error adding pet";
  }

  revalidatePath("/app", "layout");
}

export async function editPet(id: string, formData: petFormType) {
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
  return new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      try {
        await prisma.pet.delete({
          where: {
            id,
          },
        });
        
        revalidatePath("/app", "layout");
        resolve();
        
      } catch (error) {
        console.error("Error deleting pet:", error);
        reject(error);
      }
    }, 2000);
  });
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

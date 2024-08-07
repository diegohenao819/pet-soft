"use server"


import prisma from "@/lib/db";

type petFormType = {
    id?: string;
    name: string;
    ownerName: string;
    imageUrl: string;
    age: number;
    notes: string;
}


// export async function addPet(newPet: petFormType) {
//     const { id, ...rest } = newPet;
//     const data = id === '' ? rest : newPet;

//     return await prisma.pet.create({
//         data: data,
//       });
// }


export async function addPet(formData) {
  console.log(formData)

  await prisma.pet.create({
    data: {
      name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl: formData.get("imageUrl"),
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
    },
  });
}




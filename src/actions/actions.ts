"use server"


import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

type petFormType = {
    id?: string;
    name: string;
    ownerName: string;
    imageUrl: string;
    age: number;
    notes: string;
}

export async function addPet(formData:petFormType) {
  console.log(formData)
  
  try {
    await prisma.pet.create({
      data: {
        // name: formData.name,
        ownerName: formData.ownerName,
        imageUrl: formData.imageUrl,
        age: formData.age,
        notes: formData.notes,
      },
    });
  }
  catch (error) {
    
    return "Error adding pet";
  }

  


  revalidatePath("/app", "layout");
}


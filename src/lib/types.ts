import { Pet } from "@prisma/client";
import { z } from "zod";

export type PetEssentials = Omit<Pet, "id" | "createdAt" | "updatedAt" | "userId">;

export const ValidPetId = z.string().cuid();

export const FormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(100, { message: "Username must be at most 100 characters." }),
    ownerName: z.string().trim().min(2, {
      message: "Owner name must be at least 2 characters.",
    }),
    imageUrl: z.string().trim().url({
      message: "Please enter a valid URL.",
    }),
    age: z.coerce.number().int().positive({
      message: "Please enter a valid age",
    }),
    notes: z.union([z.literal(""), z.string().trim().max(500)]),
  })
  .transform((data) => {
    return {
      ...data,
    };
  });




  export const authSchema = z.object({
    email: z.string().email().max(100),
    password: z.string().max(100),
  });


  export type TAuth = z.infer<typeof authSchema>;
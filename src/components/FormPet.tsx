"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  imageUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  age: z.number().int().positive({
    message: "Please enter a valid age",
  }),
  notes: z.string().max(100, {
    message: "Notes must be at most 100 characters.",
  }),
})

export function FormPet({setOpen}: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      ownerName: "",
      imageUrl: "https://i.pinimg.com/originals/2e/72/c9/2e72c928d6517c0591f59af35291260c.jpg",
      age: 0,
      notes: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {


   console.log(data)
    setOpen(false)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                Pet`s name`
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ownerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input placeholder="Owner Name" {...field} />
              </FormControl>
              <FormDescription>
                Owner`s name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />



        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Image URL" {...field} />
              </FormControl>
              <FormDescription>
                Image URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Age" {...field} 
                 onChange={(e) => field.onChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
               
                />
              </FormControl>
              <FormDescription>
                Age
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="Notes" {...field} />
              </FormControl>
              <FormDescription>
                Notes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />






        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { addPet } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { usePetContext } from "@/lib/hooks";

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
});

export function FormPet({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      ownerName: "",
      imageUrl:
        "https://th.bing.com/th/id/R.d9e65b111593ad20ddf76cae90e910e7?rik=61GtwwvMZvSn5w&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1024997.png&ehk=T6t8oq3OlRzsU6PgSXQzfUnpFuVXEol5SNjO5S8xi4s%3d&risl=&pid=ImgRaw&r=0",
      age: 0,
      notes: "",
    },
  });

  const { handleNewPet } = usePetContext();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setOpen(false);

    toast({
      title: "New Pet Added",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        action={addPet}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>Pet`s name`</FormDescription>
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
              <FormDescription>Owner`s name</FormDescription>
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
              <FormDescription>Image URL</FormDescription>
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
                <Input
                  type="number"
                  placeholder="Age"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? "" : parseInt(e.target.value, 10)
                    )
                  }
                />
              </FormControl>
              <FormDescription>Age</FormDescription>
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
              <FormDescription>Notes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

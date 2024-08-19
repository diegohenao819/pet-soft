"use client";

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
import { usePetContext } from "@/lib/hooks";
import { FormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormPet({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { handleNewPet } = usePetContext();

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

  return (
    <Form {...form}>
      <form
        action={async () => {
          const isValid = await form.trigger();
          if (!isValid) return;
          const data = form.getValues();
          setOpen(false);
          handleNewPet(data);
        }}
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
              <FormDescription>Pets name</FormDescription>
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
              <FormDescription>Owners name</FormDescription>
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

        <Button type="submit">Add Pet</Button>
      </form>
    </Form>
  );
}

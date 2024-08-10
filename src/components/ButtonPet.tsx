"use client";

import { usePetContext } from "@/lib/hooks";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FormEditPet } from "./FormEditPet";
import { FormPet } from "./FormPet";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { deletePet } from "@/actions/actions";

type ButtonPetProps = {
  actionType: "add" | "edit" | "delete";
  children?: React.ReactNode;
};

const ButtonPet = ({ actionType, children }: ButtonPetProps) => {
  const {  selectedPetId } = usePetContext();
 

  const [open, setOpen] = useState(false);
  if (actionType === "add") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full h-[50px] w-[50px]">
            <PlusIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Pet</DialogTitle>
            <FormPet setOpen={setOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (actionType === "edit") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pet</DialogTitle>
            <FormEditPet setOpen={setOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (actionType === "delete") {
    return (
      <Button
        variant="destructive"
        onClick={() => {
          deletePet(selectedPetId || "");
        }}
      >
        {children}
      </Button>
    );
  }

  // Optional: return null or a default JSX element if actionType does not match
  return null;
};

export default ButtonPet;

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import FormPet from "./FormPet";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

type ButtonPetProps = {
  actionType: "add" | "edit" | "delete";
  children?: React.ReactNode;
};

const ButtonPet = ({ actionType, children }: ButtonPetProps) => {
  if (actionType === "add") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full h-[50px] w-[50px]">
            <PlusIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Pet</DialogTitle>
            <FormPet />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "delete") {
    return <Button variant="destructive">{children}</Button>;
  }

  // Optional: return null or a default JSX element if actionType does not match
  return null;
};

export default ButtonPet;

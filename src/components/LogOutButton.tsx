"use client";

import { logOut } from "@/actions/actions";
import { Button } from "./ui/button";

const LogOutButton = () => {
  return (
    <Button
      className="w-20 self-center"
      onClick={async () => await logOut()}
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;

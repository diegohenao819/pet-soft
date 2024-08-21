import { Logo } from "@/components/Logo";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center flex-col items-center h-screen w-[50%] m-auto">
    <Logo />
    {children}
    </div>;
};

export default Layout;

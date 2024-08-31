"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { logOut } from "@/actions/actions";

const links = [
  { href: "/app/dashboard", label: "Dashboard" },
  { href: "/app/account", label: "Account" },
];

const AppHeader = () => {
  const activePathName = usePathname();

  return (
    <div className="flex justify-between items-center py-4 px-4 border-b-4 border-white/30">
      <Logo />

      <nav>
   
        <ul className="flex gap-3">
       
          {links.map((link) => {
            return (
              <li
                key={link.href}
                className={cn(
                  "text-white/70  p-2 rounded-lg text-sm hover:text-white focus:text-white transition",
                  {
                    "text-white bg-black/20": activePathName === link.href,
                  }
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            );
          })}
           <Button onClick={async () => await logOut()}
           >Log Out</Button>
        </ul>
      </nav>
    </div>
  );
};

export default AppHeader;

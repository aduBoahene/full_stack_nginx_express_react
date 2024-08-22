"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menus, MenuItem } from "@/constants/routes";
import { cn } from "@/lib/utils";

const Menus = () => {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex flex-col">
        {menus.map((menu: MenuItem) => {
          const isActive = pathname === menu.path;
          return (
            <div key={menu.path}>
              <Link
                className={cn(
                  { "bg-accent   ": isActive },
                  " hover:bg-accent  rounded-md text-[14px] items-center pl-2 mb-4 h-auto py-2 w-full flex flex-row text-center"
                )}
                href={menu.path}
                passHref
              >
                <menu.icon className="mr-4 h-6 w-6" />
                {menu.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menus;
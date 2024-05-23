"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarData } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="icons/hamburger.svg"
            width={36}
            height={36}
            alt="Hamburger Icon"
            className="cursor-pointer lg:hidden"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-node bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="icons/logo.svg"
              width={32}
              height={32}
              alt="Voom Logo"
              className="max-sm:size-10"
            />
            <p className="text-[26px] text-white">Voom</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarData.map((link, index) => {
                  const { label, route, imgURL } = link;
                  const isActive = pathname === route;
                  return (
                    <SheetClose asChild key={route}>
                      <Link
                        href={route}
                        key={index}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg w-full max-w-60",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          src={imgURL}
                          alt={label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;

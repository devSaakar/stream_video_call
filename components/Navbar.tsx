import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNavbar from "./MobileNavbar";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    // <nav className="flex justify-start items-center gap-2 fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 text-white">
    <nav className="flex-between items-center gap-2 fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 text-white">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="icons/logo.svg"
          width={32}
          height={32}
          alt="Voom Logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] text-white max-sm:hidden">Voom</p>
      </Link>
      <div className="flex-between gap-5">
        {/* Clerk User Management */}

        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;

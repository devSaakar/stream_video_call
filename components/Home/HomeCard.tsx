import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface HomeCardProps {
  title: string;
  description: string;
  icon: string;
  className: string;
}

const HomeCard = ({
  title,
  description,
  icon,
  className,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-lg cursor-pointer",
        className
      )}
    >
      <div className="flex-center glassmorphism size-12 rounded-md">
        <Image src={icon} alt="meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal text-white">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;

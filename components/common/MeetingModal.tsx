import React, { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  buttonText?: string;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText = "Schedule Meeting",
  handleClick,
  children,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  console.log("isOpen :>> ", isOpen);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="flex flex-col gap-6 w-full max-w-[520px]
      border-none bg-dark-1 px-6 py-9 text-white "
      >
        <div className="flex flex-col gap-6">
          {image && (
            <div>
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            onClick={handleClick}
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {buttonIcon && (
              <div>
                <Image
                  src={buttonIcon}
                  alt="button icon"
                  width={13}
                  height={13}
                />
              </div>
            )}
            &nbsp;
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;

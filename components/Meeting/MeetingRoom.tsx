import React, { useState } from "react";
import { CallLayoutType } from "./types";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { Button } from "../ui/button";
import { humanCase } from "@/utils/utils";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>(
    CallLayoutType.SPEAKER_LEFT
  );
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case CallLayoutType.GRID:
        return <PaginatedGridLayout />;
      case CallLayoutType.SPEAKER_RIGHT:
        return <SpeakerLayout participantsBarPosition={"left"} />;
      case CallLayoutType.SPEAKER_LEFT:
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex-center size-full">
        <div className=" flex items-center size-full max-w-[1000px] ">
          <CallLayout />
        </div>
        <div
          className={cn("hidden ml-2 h-[calc(100vh-86px)]", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="flex-center fixed bottom-0 w-full gap-5">
        <CallControls />
        <DropdownMenu>
          <div className="flex-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-dark-1 px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={24} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {Object.values(CallLayoutType).map((item, index) => {
              console.log("item :>> ", item);
              return (
                <div key={index}>
                  <DropdownMenuItem
                    className=" cursor-pointer"
                    onClick={() => setLayout(item as CallLayoutType)}
                  >
                    {humanCase(item)}
                  </DropdownMenuItem>
                  {index !== 2 && (
                    <DropdownMenuSeparator className=" border-dark-1" />
                  )}
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-dark-1 px-4 py-2 hover:bg-[#4c535b]">
            <Users size={24} className="text-white" />
          </div>
        </Button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;

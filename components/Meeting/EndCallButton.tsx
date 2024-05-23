"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localPraticipant = useLocalParticipant();

  const handleClick = async () => {
    await call?.endCall();
    router.push("/");
  };

  const isMeetingOwner =
    localPraticipant &&
    call?.state.createdBy &&
    localPraticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button onClick={handleClick} className="bg-red-500">
      End Call For Everyone
    </Button>
  );
};

export default EndCallButton;

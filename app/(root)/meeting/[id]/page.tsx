"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/Meeting/MeetingRoom";
import MeetingSetup from "@/components/Meeting/MeetingSetup";
import useGetCallById from "@/utils/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { isLoaded, user } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <main className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {isSetupComplete ? (
            <MeetingRoom />
          ) : (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;

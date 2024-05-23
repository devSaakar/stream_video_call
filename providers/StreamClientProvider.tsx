"use client";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API is missing");
    const { id, username, imageUrl } = user;
    const client = new StreamVideoClient({
      apiKey,
      user: { id, name: username || id, image: imageUrl },
      tokenProvider,
    });
    setVideoClient(client);
    console.log("client :>> ", client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return (
    <StreamVideo client={videoClient}>
      {children}
      {/* <StreamCall call={call}></StreamCall> */}
    </StreamVideo>
  );
};

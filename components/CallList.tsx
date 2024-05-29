"use client";
import useGetCalls from "@/utils/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./Meeting/MeetingCard";
import Loader from "./Loader";
import { LIST_TYPE } from "@/constants";
import { useToast } from "./ui/use-toast";

interface CallListProps {
  type: LIST_TYPE;
}

const CallList = ({ type }: CallListProps) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();

  console.log("upcomingCalls", upcomingCalls);
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: "Failed to fetch recordings" });
      }
    };
    if (type === LIST_TYPE.recordings) fetchRecordings();
  }, [type, callRecordings, toast]);

  const getCalls = () => {
    switch (type) {
      case LIST_TYPE.ended:
        return endedCalls;
      case LIST_TYPE.recordings:
        return recordings;
      case LIST_TYPE.upcoming:
        return upcomingCalls;

      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case LIST_TYPE.ended:
        return "No Previous Callls";
      case LIST_TYPE.upcoming:
        return "No Upcoming Callls";
      case LIST_TYPE.recordings:
        return "No Recordings";
      default:
        return "";
    }
  };
  const getCallIcons = () => {
    switch (type) {
      case LIST_TYPE.ended:
        return "icons/previous.svg";
      case LIST_TYPE.upcoming:
        return "icons/upcoming.svg";
      case LIST_TYPE.recordings:
        return "icons/recordings.svg";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallMessage = getNoCallsMessage();
  const cardIcon = getCallIcons();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls?.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          const { start_time } = (meeting as CallRecording) || {};
          const { state, id } = (meeting as Call) || {};
          const { startsAt, custom } = state || {};
          const { description } = custom || {};
          return (
            <MeetingCard
              key={(meeting as Call).id}
              icon={cardIcon}
              title={description?.substring(0, 26) || "Personal Room"}
              date={startsAt?.toLocaleString() || start_time?.toLocaleString()}
              isPreviousMeeting={type === LIST_TYPE.ended}
              buttonIcon1={
                type === LIST_TYPE.recordings ? "icons/play.svg" : undefined
              }
              buttonText={type === LIST_TYPE.recordings ? "Play" : "Start"}
              handleClick={() => {
                const newRoute =
                  type === LIST_TYPE.recordings
                    ? (meeting as CallRecording).url
                    : `meeting/${(meeting as Call)?.id}`;
                router.push(newRoute);
              }}
              link={
                type === LIST_TYPE.recordings
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call)?.id
                    }`
              }
            />
          );
        })
      ) : (
        <h1>{noCallMessage}</h1>
      )}
    </div>
  );
};

export default CallList;

"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { cardList } from "./constant";
import { MEETING_STATES } from "./types";
import { useRouter } from "next/navigation";
import MeetingModal from "../common/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import ReactDatePicker from "../ui/date-picker";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = useState<MEETING_STATES>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  console.log("values", values);

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeing = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting Created" });
    } catch (error) {
      console.log("error :>> ", error);
      toast({ title: "Failed to create meeting" });
    }
  };

  const handleClick = (value: MEETING_STATES) => {
    switch (value) {
      case MEETING_STATES.RECORDINGS:
        router.push("/recordings");
        break;

      default:
        setMeetingState(value);
        break;
    }
  };
  console.log("meetingState", meetingState);
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cardList.map((cardDetail) => {
        const { title, description, icon, className, value } = cardDetail;
        return (
          <div key={title} onClick={() => handleClick(value)}>
            <HomeCard
              title={title}
              description={description}
              icon={icon}
              className={className}
            />
          </div>
        );
      })}
      {callDetails ? (
        <MeetingModal
          isOpen={meetingState === MEETING_STATES.SCHUEDULE}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
            );
            toast({ title: "Link Copy" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      ) : (
        <MeetingModal
          isOpen={meetingState === MEETING_STATES.SCHUEDULE}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          buttonText="Start Meeting"
          handleClick={createMeeing}
        >
          <div>
            <label
              htmlFor=""
              className="text-base text-normal leading-[22px] text-sky-1"
            >
              Add a description
              <Textarea
                className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </label>
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label
              htmlFor="date-picker"
              className="text-base text-normal leading-[22px] text-sky-1"
            >
              Select Date and Time
            </label>
            <ReactDatePicker
              id="date-picker"
              selected={values.dateTime}
              // selected={new Date()}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat={"HH:mm"}
              timeIntervals={15}
              timeCaption="Time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded  p-2 focus:outline-none text-black"
            />
          </div>
        </MeetingModal>
      )}

      <MeetingModal
        isOpen={meetingState === MEETING_STATES.INSTANT}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeing}
      />
    </section>
  );
};

export default MeetingTypeList;

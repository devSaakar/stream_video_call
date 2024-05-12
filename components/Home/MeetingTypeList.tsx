"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { cardList } from "./constant";
import { MEETING_STATES } from "./types";
import { useRouter } from "next/navigation";
import MeetingModal from "../common/MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<MEETING_STATES>();

  const createMeeing = () => {};

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

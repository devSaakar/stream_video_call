"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { cardList } from "./constant";
import { MEETING_STATES } from "./types";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<MEETING_STATES>();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("e :>> ", e);
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cardList.map((cardDetail) => {
        const { title, description, icon, className } = cardDetail;
        return (
          <HomeCard
            key={title}
            onClick={handleClick}
            title={title}
            description={description}
            icon={icon}
            className={className}
          />
        );
      })}
    </section>
  );
};

export default MeetingTypeList;

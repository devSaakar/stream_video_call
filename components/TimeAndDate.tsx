"use client";
import useTime from "@/utils/hooks/useTime";
import React from "react";

const TimeAndDate = () => {
  const { formattedTime, formattedDate } = useTime();
  return (
    <div className="flex flex-col gap-2">
      <h1 className=" text-4xl font-extrabold lg:text-7xl">
        {`${formattedTime || ""}`}
      </h1>
      <p className="text-lg font-medium text-sky-1 lg:text-2xl">
        {formattedDate}
      </p>
    </div>
  );
};

export default TimeAndDate;

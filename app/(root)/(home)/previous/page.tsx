import CallList from "@/components/CallList";
import { LIST_TYPE } from "@/constants";
import React from "react";

const Previous = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Previous</h1>
      <CallList type={LIST_TYPE.ended} />
    </section>
  );
};

export default Previous;

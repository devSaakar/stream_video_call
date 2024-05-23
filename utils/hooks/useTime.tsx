import React, { useEffect, useRef, useState } from "react";
import { getFormattedDate, getFormattedTime } from "../utils";

const useTime = () => {
  const timeoutId = useRef(0);
  const [formattedTime, setFormattedTime] = useState<null | string>(null);
  const formattedDate = getFormattedDate();

  useEffect(() => {
    setFormattedTime(getFormattedTime());
    timeoutId.current = Number(
      setInterval(() => {
        setFormattedTime(getFormattedTime());
      }, 1000)
    );
    return () => {
      clearInterval(timeoutId.current);
    };
  }, []);
  return { formattedTime, formattedDate };
};

export default useTime;

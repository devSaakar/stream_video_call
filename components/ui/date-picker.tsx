import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

const ReactDatePicker = (props: ReactDatePickerProps) => {
  return <DatePicker {...props} />;
};

export default ReactDatePicker;

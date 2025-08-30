import { th } from "date-fns/locale/th";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  isClearable?: boolean;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selected,
  onChange,
  placeholderText = "เลือกวันที่",
  isClearable = true,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      isClearable={isClearable}
      dateFormat="dd/MM/yyyy"
      locale={th}
      placeholderText={placeholderText}
      className="w-full px-4 h-[36px] border border-gray-300  rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500   transition-colors duration-200 bg-white  "
      popperClassName="z-50"
      popperPlacement="bottom-start"
      showPopperArrow={false}
      calendarClassName="shadow-xl border border-gray-200  rounded-lg bg-white  "
      dayClassName={(date) => {
        const today = new Date();
        if (selected && date.toDateString() === selected.toDateString()) {
          return "bg-green-500 text-white hover:bg-green-600 rounded-md";
        }
        if (date.toDateString() === today.toDateString()) {
          return "bg-green-100  text-green-700   font-semibold rounded-md";
        }
        return "hover:bg-gray-100  rounded-md";
      }}
    />
  );
};

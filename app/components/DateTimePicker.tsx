import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDate, setIsDate] = useState<boolean>(true);

  return (
    <>
      {isDate ? (
        <div className="text-center">
          <div>Select a Date</div>
          <DatePicker
            selected={selectedDate}
            onChange={(date: any) => {
              setSelectedDate(date);
              setIsDate(false);
            }}
            minDate={new Date()}
            inline
          />
        </div>
      ) : (
        <div className="text-center">
          <div onClick={() => setIsDate(true)} className="cursor-pointer">
            Back
          </div>
          Select a Time
          <div className="w-fit mx-auto flex flex-col gap-2">
            {availbleTime.map((time, i) => (
              <div
                key={i}
                className="border-blue-400 border rounded-sm px-12 py-2 cursor-pointer hover:bg-blue-100"
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
const availbleTime = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
];

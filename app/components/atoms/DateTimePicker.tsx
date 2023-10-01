import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { formatDate } from "@/utils/time";

export default function DateTimePicker({ service }: { service: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDate, setIsDate] = useState<boolean>(true);

  return (
    <>
      {isDate ? (
        <div className="text-center">
          <div className="text-xl py-4">Select a date for {service}</div>
          <DatePicker
            selected={selectedDate}
            onChange={(date: any) => setSelectedDate(date)}
            minDate={new Date()}
            inline
          />
          <div className="py-4">{formatDate(selectedDate)}</div>
          <Button text={"Accept"} onClick={() => setIsDate(false)} />
        </div>
      ) : (
        <div className="text-center">
          <div
            onClick={() => setIsDate(true)}
            className="cursor-pointer bg-blue-100 w-fit mx-auto">
            Selected date : {formatDate(selectedDate)}
          </div>
          <div className="py-4 text-xl">Select a time</div>
          <div className="w-fit mx-auto flex flex-col gap-2">
            {availbleTime.map((time, i) => (
              <div
                key={i}
                className="border-blue-400 border rounded-sm px-12 py-2 cursor-pointer hover:bg-blue-100">
                {time}
              </div>
            ))}
          </div>
          <div className="py-4">Coming Soon...</div>
          <Button
            text={"Request " + service}
            onClick={() => setIsDate(false)}
            isDisabled={true}
          />
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

import { MouseEventHandler } from "react";

export default function Field({ icon, title, value, onClick }: fieldProps) {
  return (
    <>
      <div className="flex items-center justify-between bg-[#f3f3f3] w-full p-2">
        <div className="font-bold flex items-center gap-2">
          {icon}
          {title}
        </div>
        <div className="cursor-pointer" onClick={onClick}>
          {value}
        </div>
      </div>
    </>
  );
}

type fieldProps = {
  icon: any;
  title: string;
  value: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

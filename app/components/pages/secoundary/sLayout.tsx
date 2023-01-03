import { styles } from "@/utils/styles";
import { MouseEventHandler } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Layout({ children, onClick, title }: layoutTypes) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden ">
        <div className="flex items-center gap-2 text-white px-2 h-16 bg-primary">
          <div
            className="text-xl p-2 cursor-pointer flex items-center justify-center"
            onClick={onClick}>
            <FaArrowLeft />
          </div>
          <div className="font-bold text-2xl">{title}</div>
        </div>
        <div className="relative overflow-auto p-4">{children}</div>
      </div>
    </>
  );
}
type layoutTypes = {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
  title: string;
};

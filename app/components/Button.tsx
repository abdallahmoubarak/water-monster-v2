import Image from "next/image";
import { MouseEventHandler } from "react";

export default function Button({
  text = "button",
  onClick,
  isSecondary,
  isLoading,
  disabled,
}: buttonProps) {
  return (
    <button
      onClick={onClick}
      className={` py-2 px-8 rounded-full text-lg mx-auto block w-fit min-w-[9rem] border cursor-pointer ${
        isSecondary
          ? "bg-white text-secondary border-secondary hover:bg-secondary hover:text-white"
          : "border-primary bg-primary text-white hover:bg-blue-400"
      } ${
        disabled && "text-white bg-gray-400 border-gray-400 hover:bg-gray-400"
      }`}
    >
      {isLoading ? (
        <div className="w-[1rem] h-6 mx-auto flex justify-center items-center">
          <Image src={"/svg/Loading.svg"} height={50} width={50} alt={""} />
        </div>
      ) : (
        text
      )}
    </button>
  );
}

type buttonProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isSecondary?: boolean;
  isLoading?: boolean;
};

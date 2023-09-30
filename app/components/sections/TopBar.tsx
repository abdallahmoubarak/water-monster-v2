import Logo from "@/components/atoms/Logo";
import Link from "next/link";
import { FaArrowLeft, FaUser } from "react-icons/fa";

export default function TopBar({ hasImg, link }: topBarProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 bg-primary px-4 py-2 h-16">
        {link && (
          <Link href={link}>
            <div className="text-2xl text-white">
              <FaArrowLeft />
            </div>
          </Link>
        )}
        <div className="h-full">
          <Logo />
        </div>
        {hasImg && (
          <Link href="/sign">
            <div className="flex items-center justify-center pt-2 overflow-hidden text-4xl text-white border-white border-2 w-12 h-12 cursor-pointer rounded-full">
              <FaUser />
            </div>
          </Link>
        )}
      </div>
    </>
  );
}

type topBarProps = {
  hasImg?: boolean;
  link?: string;
};

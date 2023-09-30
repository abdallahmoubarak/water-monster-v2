import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function EmailSent() {
  return (
    <>
      <div className="text-green-600 text-lg gap-3 text-center flex flex-col items-center">
        <span className="text-6xl">
          <FaCheckCircle />
        </span>{" "}
        Mail has been sent successfully,
      </div>
      <div className="underline text-gray-500 text-center flex gap-4 justify-center">
        <Link href="https://gmail.com">Gmail</Link>
        <Link href="https://outlook.com">OutLook</Link>
      </div>
    </>
  );
}

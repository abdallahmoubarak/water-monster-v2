import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function DotsDropDown() {
  const [isDropDown, setIsDropDown] = useState(false);

  return (
    <div>
      <div
        className="cursor-pointer text-xl px-2"
        onClick={() => setIsDropDown(true)}>
        <BiDotsVerticalRounded />
      </div>
      {isDropDown ? (
        <>
          <div className="bg-white z-20 right-8 absolute rounded-lg border border-gray-200">
            <div className="whitespace-nowrap cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg">
              Transfer ownership
            </div>
            <div className="whitespace-nowrap cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg">
              Delete access
            </div>
          </div>{" "}
          <div
            onMouseDown={() => setIsDropDown(false)}
            onPointerDown={() => setIsDropDown(false)}
            onScrollCapture={() => setIsDropDown(false)}
            className="w-screen h-screen top-0 left-0 absolute z-10 bg-transparent  cursor-pointer"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

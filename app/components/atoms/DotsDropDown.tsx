import { useRemoveViewer } from "@/hooks/container/useRemoveViewer";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Alert from "./Alert";
import { useTransferOwnerShip } from "@/hooks/container/useTransferOwerShip";

export default function DotsDropDown({
  currentContainer,
  viewer,
}: {
  currentContainer: any;
  viewer: any;
}) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const { mutate: removeViewer } = useRemoveViewer({ setAlertMsg });
  const { mutate: transferOwnerShip } = useTransferOwnerShip({ setAlertMsg });

  let currentUser: any = localStorage.getItem("User");

  return (
    <>
      <div
        className="cursor-pointer text-xl px-2"
        onClick={() => setIsDropDown(true)}>
        <BiDotsVerticalRounded />
      </div>
      {isDropDown && (
        <div className="relative">
          <div className="bg-white z-20 right-0 absolute rounded-lg border border-gray-200">
            <div
              className="whitespace-nowrap cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg"
              onClick={() =>
                transferOwnerShip({
                  contId: currentContainer.id,
                  ownerId: currentUser.id,
                  viewerId: viewer.id,
                })
              }>
              Transfer ownership
            </div>
            <div
              className="whitespace-nowrap cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg"
              onClick={() =>
                removeViewer({
                  contId: currentContainer.id,
                  userId: currentUser.id,
                })
              }>
              Delete access
            </div>
          </div>{" "}
        </div>
      )}
      {isDropDown && (
        <div
          onMouseDown={() => setIsDropDown(false)}
          onPointerDown={() => setIsDropDown(false)}
          onScrollCapture={() => setIsDropDown(false)}
          className="w-screen h-screen top-40 right-0 absolute z-10 bg-transparent cursor-pointer"></div>
      )}
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
    </>
  );
}

import { useEffect } from "react";

export default function Alert({ alertMsg, setAlertMsg }: alertType) {
  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setAlertMsg(false);
    }, 3000);
    () => clearTimeout(clearMessage);
  }, [alertMsg, setAlertMsg]);

  return (
    <>
      <div
        className={`relative w-full flex justify-center ${
          !alertMsg &&
          "opacity-0 z-[-1] transition-all duration-[3s] ease-in-out"
        }`}>
        <div className="w-[70vw] fixed p-2 text-center top-16 mx-auto text-white z-30 opacity-95 bg-gray-500 rounded-full text-lg transition-all duration-[3s] ease-in-out shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
          {alertMsg}
        </div>
      </div>
    </>
  );
}

type alertType = {
  alertMsg: string;
  setAlertMsg: Function;
};

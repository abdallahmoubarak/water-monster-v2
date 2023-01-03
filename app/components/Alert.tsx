import { styles } from "@/utils/styles";
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
          !alertMsg && "opacity-0 z-[-1] hidden"
        }`}>
        <div className="w-[70vw] fixed p-2 text-center top-16 mx-auto text-white z-30 opacity-95 bg-gray-500 rounded-full text-lg">
          {alertMsg}
        </div>
      </div>
      <style jsx>{`
        .alert-msg {
          ${styles.boxshadow};
          ${styles.transitionAll3s};
        }
        .hide {
          ${styles.transitionAll3s}
        }
      `}</style>
    </>
  );
}

type alertType = {
  alertMsg: string;
  setAlertMsg: Function;
};

import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

const password = "oiafdjoih2380jofisa";
export default function ToolTipButton() {
  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  const handleButtonClick = () => {
    setTooltipVisibility(true);
    setTimeout(() => {
      setTooltipVisibility(false);
    }, 2000);
  };
  return (
    <div className="flex gap-1 items-center flex-wrap">
      <div className="py-4">
        <button
          className="flex gap-1 justify-center self-center border border-black p-1 rounded cursor-pointer bg-white w-56"
          data-tooltip-target="tooltip-default"
          onClick={() => {
            navigator.clipboard.writeText(password);
            handleButtonClick();
          }}
        >
          {password} <MdOutlineContentCopy />
        </button>
      </div>

      <div
        id="tooltip-default"
        role="tooltip"
        className={`  ${
          isTooltipVisible ? "visible" : "invisible"
        }  px-2 py-1 text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip dark:bg-gray-700`}
      >
        Copied
      </div>
    </div>
  );
}

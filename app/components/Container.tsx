import ContainerSVG from "@/components/svg/ContainerSVG";
import Image from "next/image";
import settings from "@/public/svg/settings.svg";
import { BiWater } from "react-icons/bi";
import { HiOutlineClock } from "react-icons/hi";
import { humanReadableTime } from "@/utils/time";

export default function Container({
  view,
  container,
  setPage,
  setPageId,
}: {
  view: boolean;
  container: any;
  setPage: Function;
  setPageId: Function;
}) {
  const handleOnSettingsClick = () => {
    setPage("Settings");
    setPageId(container.id);
  };

  const handleOnDelete = () => {
    console.log(container.id);
  };
  return (
    <>
      <div className="border border-gray-200 max-w-[24rem] flex-[24rem] px-4 py-2 rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
        <div className="text-2xl flex items-center justify-between pt-2">
          <div>{container?.name} Container</div>
          {view ? (
            <div
              className="text-red-600 text-sm cursor-pointer font-bold"
              onClick={handleOnDelete}
            >
              Delete
            </div>
          ) : (
            <div
              className="w-8 h-8 cursor-pointer"
              onClick={handleOnSettingsClick}
            >
              <Image width={30} src={settings} alt="s" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <span>
            <BiWater />
          </span>
          <span>{(container?.size * container?.water_level) / 100} liter</span>
          <span>({container?.water_level} %)</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <span>
            <HiOutlineClock />
          </span>
          <span>{humanReadableTime(container?.updatedAt)}</span>
        </div>
        <div className="transition-all duration-[3s] ease-in-out">
          <ContainerSVG level={container?.water_level} />
        </div>
        <div className="text-xl flex items-center justify-between pt-2">
          <div>Sensor State</div>
          <div
            className={`rounded-full w-4 h-4  ${
              container?.sensor_state ? "bg-primary" : "bg-secondary"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
}

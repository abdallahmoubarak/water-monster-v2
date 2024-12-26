import ContainerSVG from "@/components/svg/ContainerSVG";
import Image from "next/image";
import settings from "@/public/svg/settings.svg";
import { BiWater } from "react-icons/bi";
import { HiOutlineClock } from "react-icons/hi";
import { humanReadableTime } from "@/utils/time";
import Loading from "../svg/Loading";
import { sensorState } from "@/utils/sensorState";
import { useMqtt } from "@/hooks/useMqtt";
import { useEffect, useState } from "react";

interface ContainerCard {
  view: boolean;
  container: any;
  setPage: any;
  setCurrentContainer: any;
  isFetching: boolean;
}

export default function Container({
  view,
  container,
  setPage,
  setCurrentContainer,
  isFetching,
}: ContainerCard) {
  const handleOnSettingsClick = () => {
    setPage && setPage("Settings");
    setCurrentContainer && setCurrentContainer(container);
  };
  const [waterLevel, setWaterLevel] = useState(0);
  const [timeStamp, setTimeStamp] = useState<any>(null);
  const { connectStatus, mqttConnect, mqttSubscribe, payload } = useMqtt();

  const connect = () => {
    mqttConnect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL!, {
      protocolId: "MQTT",
      clientId: `app_${container.serialNumber}`,
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      port: 8084,
      protocolVersion: 5,
      clean: false,
    });
  };

  useEffect(() => {
    container?.serialNumber?.includes(":") &&
      connectStatus !== "Connected" &&
      connect();
  }, []);

  useEffect(() => {
    container?.serialNumber?.includes(":") &&
      connectStatus === "Connected" &&
      mqttSubscribe({ topic: `${container.serialNumber}/distance`, qos: 0 });
  }, [connectStatus]);

  useEffect(() => {
    var calc;

    const distance = container?.serialNumber?.includes(":")
      ? Number(payload?.message?.distance)
      : container?.distance;

    let timeStamp = new Date(0);

    if (container?.serialNumber?.includes(":")) {
      timeStamp.setUTCSeconds(payload?.message?.time).toLocaleString();
    }

    calc = Math.round(
      ((container?.height - distance / 10 + 18) * 100) / container?.height
    );

    const wl = calc > 0 && calc < 100 ? calc : calc < 0 ? 1 : 100;

    setWaterLevel(wl);

    payload?.message?.distance && setTimeStamp(timeStamp);
  }, [payload?.message?.distance]);

  const handleOnDelete = () => {
    alert("not yet active");
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
              {/* Delete */}
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
          {container.water_level ? (
            <>
              <span>
                {(container?.size * container?.water_level) / 100} liter
              </span>
              <span>({container?.water_level} %)</span>
              {isFetching && (
                <span>
                  <Loading />
                </span>
              )}
            </>
          ) : (
            <>
              <span>{(container?.size * waterLevel) / 100} liter</span>
              <span>({waterLevel}%)</span>
              {isFetching && (
                <span>
                  <Loading />
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-1 text-gray-500">
          <span>
            <HiOutlineClock />
          </span>
          {container?.serialNumber?.includes(":") ? (
            <span>{humanReadableTime(timeStamp)}</span>
          ) : (
            <span>{humanReadableTime(container?.updatedAt)}</span>
          )}
          {isFetching && (
            <span>
              <Loading />
            </span>
          )}
        </div>
        <div className="transition-all duration-[3s] ease-in-out">
          {container.water_level ? (
            <ContainerSVG level={container?.water_level} />
          ) : (
            <ContainerSVG level={waterLevel} />
          )}
        </div>
        <div className="text-xl flex items-center justify-between pt-2">
          <div>Sensor State</div>
          <div
            className={`rounded-full w-4 h-4  ${
              sensorState({
                date: container?.serialNumber?.includes(":")
                  ? timeStamp
                  : container.updatedAt,
              })
                ? "bg-primary"
                : "bg-secondary"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
}

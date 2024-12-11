import Button from "@/components/atoms/Button";
import { useEffect, useState } from "react";
import Container from "@/components/atoms/Container";
import ContainerLoader from "@/components/atoms/ContainerLoader";
import Alert from "@/components/atoms/Alert";
import ServicesBar from "@/components/sections/ServicesBar";
import { useUserContainers } from "@/hooks/container/useUserContainers";
import { useUserViewingContainers } from "@/hooks/container/useUserViewingContainers";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import PullToRefresh from "react-simple-pull-to-refresh";
import { client } from "pages/_app";
import { useMqtt } from "@/hooks/useMqtt";

export default function Containers({
  setPage,
  setCurrentContainer,
}: {
  setPage: Function;
  setCurrentContainer: Function;
}) {
  const [alertMsg, setAlertMsg] = useState<string>("");
  const { data: currentUser } = useCurrentUser();
  const { connectStatus, mqttConnect } = useMqtt();

  const {
    data: containers,
    isLoading,
    isFetching,
  } = useUserContainers(currentUser.id);
  const { data: viewingContainer } = useUserViewingContainers(currentUser.id);

  const connect = () => {
    mqttConnect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL!, {
      clientId: `mqtt_${Math.random().toString(16).slice(2)}`, // Unique client ID
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
    });
  };

  useEffect(() => {
    connectStatus !== "Connected" && connect();
    console.log(connectStatus);
  }, []);

  return (
    <PullToRefresh
      pullingContent=""
      onRefresh={async () => {
        await client.refetchQueries(["Containers"]);
        await client.refetchQueries(["ViewingContainers"]);
      }}
    >
      <>
        <ServicesBar setPage={setPage} />
        <div className="p-3">
          <div className="pl-2 pb-2">{connectStatus}</div>
          {isLoading && <ContainerLoader />}
          <div className="flex items-center justify-center gap-4 pb-4 flex-wrap ">
            {containers?.map((container: any, i: number) => (
              <Container
                key={i}
                view={false}
                container={container}
                setPage={setPage}
                setCurrentContainer={setCurrentContainer}
                isFetching={isFetching}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 pb-4 flex-wrap ">
            {viewingContainer?.map((container: any, i: number) => (
              <Container
                view={true}
                key={i}
                container={container}
                setPage={undefined}
                setCurrentContainer={undefined}
                isFetching={isFetching}
              />
            ))}
          </div>

          <div className="py-8">
            <Button
              text={"New Installation"}
              isSecondary={true}
              onClick={() => setPage("Installation")}
            />
          </div>
        </div>
        <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      </>
    </PullToRefresh>
  );
}

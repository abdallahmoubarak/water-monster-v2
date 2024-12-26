import ContainerInfoSettings from "@/components/sections/ContainerSettings/ContainerInfoSettings";
import Layout from "./sLayout";
import NotificationSettings from "@/components/sections/ContainerSettings/NotificationSettings";
import QrCodeSettings from "@/components/sections/ContainerSettings/QrCodeSettings";
import ViewerSettings from "@/components/sections/ContainerSettings/ViewerSettings";
import { useEffect, useState } from "react";
import Alert from "@/components/atoms/Alert";
import { useMqtt } from "@/hooks/useMqtt";

export default function ContainerSetting({
  setPage,
  currentContainer,
}: {
  setPage: Function;
  currentContainer: any;
}) {
  const [alertMsg, setAlertMsg] = useState<string>("");
  // const [ip, setIP] = useState();
  // const [version, setVersion] = useState();

  return (
    <>
      <Layout
        title={"Container Settings"}
        onClick={() => setPage("Containers")}
      >
        <div className="flex flex-col gap-3">
          <NotificationSettings
            currentContainer={currentContainer}
            setAlertMsg={setAlertMsg}
          />
          <ContainerInfoSettings
            currentContainer={currentContainer}
            setPage={setPage}
            setAlertMsg={setAlertMsg}
          />
          <ViewerSettings
            currentContainer={currentContainer}
            setPage={setPage}
            setAlertMsg={setAlertMsg}
          />
          <QrCodeSettings
            currentContainer={currentContainer}
            setPage={setPage}
          />
        </div>

        {/* <div className="text-sm text-center p-4 text-gray-400">
          <div>
            Version: <span>{version}</span>
          </div>
          <div>
            IP: <span>{ip}</span>
          </div>
        </div> */}

        <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      </Layout>
    </>
  );
}

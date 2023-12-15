import ContainerInfoSettings from "@/components/sections/ContainerSettings/ContainerInfoSettings";
import Layout from "./sLayout";
import NotificationSettings from "@/components/sections/ContainerSettings/NotificationSettings";
import QrCodeSettings from "@/components/sections/ContainerSettings/QrCodeSettings";
import ViewerSettings from "@/components/sections/ContainerSettings/ViewerSettings";

export default function ContainerSetting({
  setPage,
  currentContainer,
}: {
  setPage: Function;
  currentContainer: any;
}) {
  return (
    <>
      <Layout
        title={"Container Settings"}
        onClick={() => setPage("Containers")}>
        <div className="flex flex-col gap-3">
          <NotificationSettings currentContainer={currentContainer} />
          <ContainerInfoSettings
            currentContainer={currentContainer}
            setPage={setPage}
          />
          <ViewerSettings currentContainer={currentContainer} />
          <QrCodeSettings
            currentContainer={currentContainer}
            setPage={setPage}
          />
        </div>
      </Layout>
    </>
  );
}

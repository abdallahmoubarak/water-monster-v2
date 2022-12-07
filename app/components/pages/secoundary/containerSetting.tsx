import SettingForm from "@/components/SettingForm";
import Layout from "./sLayout";

export default function ContainerSetting({
  setPage,
  containerId,
}: {
  setPage: Function;
  containerId: string;
}) {
  return (
    <>
      <Layout
        title={"Container Settings"}
        onClick={() => setPage("Containers")}>
        <SettingForm containerId={containerId} setPage={setPage} />
      </Layout>
    </>
  );
}

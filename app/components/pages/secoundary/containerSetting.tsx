import Button from "@/components/Button";
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
        onClick={() => setPage("Containers")}
      >
        <SettingForm containerId={containerId} setPage={setPage} />
        <div className="pt-4">
          <Button text={"Reconfigure WiFi"} />
        </div>
        {/* <Button text={"Reconfigure Container Settings"} /> */}
      </Layout>
    </>
  );
}

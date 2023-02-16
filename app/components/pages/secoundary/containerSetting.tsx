import Button from "@/components/Button";
import SettingForm from "@/components/SettingForm";
import Layout from "./sLayout";

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
        onClick={() => setPage("Containers")}
      >
        <SettingForm currentContainer={currentContainer} setPage={setPage} />
        <div className="pt-4">
          <Button
            text={"Reconfigure WiFi"}
            onClick={() => setPage("Reconfigure")}
          />
        </div>
      </Layout>
    </>
  );
}

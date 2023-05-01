import Button from "@/components/Button";
import SettingForm from "@/components/SettingForm";
import Layout from "./sLayout";
import QrCode from "@/components/QRcode";

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
        <div className="mx-auto w-fit p-4 pt-6">
          <QrCode value={"serialNumber"} width={"250px"} />
        </div>
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

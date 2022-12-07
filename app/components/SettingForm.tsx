import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { styles } from "@/utils/styles";
import { client } from "pages/_app";
import { MdPendingActions } from "react-icons/md";
import { useDeleteContainer, useUpdateContainer } from "@/hooks/useContainer";
import Box from "./Box";
import Alert from "./Alert";

export default function SettingForm({
  containerId,
  setPage,
}: settingFormTypes) {
  const [container, setContainer] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [installationState, setInstallationState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const { mutate: updateContainer } = useUpdateContainer({
    setPage,
    setIsLoading,
  });

  const { mutate: deleteContainer } = useDeleteContainer({
    setPage,
    setIsLoading,
  });

  useEffect(() => {
    const cnt = client
      ?.getQueryData(["Containers"])
      ?.filter((item: { id: string }) => item.id === containerId)[0];
    setContainer(cnt);
    setName(cnt?.name);
    setSize(cnt?.size);
    setAddress(cnt?.address);
    setInstallationState(
      cnt?.requests.filter(
        (req: { title: string }) => req.title === "Installation",
      )[0]?.state,
    );
  }, [containerId]);

  const handleUpdate = () => {
    updateContainer({ id: container.id, name, size });
    setIsLoading(true);
  };

  return (
    <>
      <div className="setting-container">
        <Box title={"Inforamation"}>
          {installationState !== "done" && (
            <div className="state">
              <MdPendingActions />
              <div>Pending for {installationState}...</div>
            </div>
          )}
          <Input name="Container name" value={name} setValue={setName} />
          <Input name={"Size"} value={size} setValue={setSize} />
          <Input name={"Address"} value={address} isDisabled={true} />
          <div className="btn-container">
            <Button
              text="Save"
              onClick={handleUpdate}
              isLoading={isLoading}
              disabled={name === container?.name}
            />
            {installationState === "approval" && (
              <Button
                text="Delete"
                isSecondary={true}
                onClick={() => deleteContainer(container.id)}
              />
            )}
          </div>
        </Box>
      </div>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />

      <style jsx>{`
        .setting-container {
          ${styles.flexColumn};
          gap: 1rem;
        }
        .state {
          ${styles.flexAligncenter};
          gap: 0.3rem;
          color: ${styles.secondaryColor};
        }
        .btn-container {
          ${styles.flexAligncenter};
        }
      `}</style>
    </>
  );
}
type settingFormTypes = {
  containerId: string;
  setPage: Function;
};

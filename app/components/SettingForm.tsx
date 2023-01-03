import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { client } from "pages/_app";
import { useUpdateContainer } from "@/hooks/useContainer";
import Box from "./Box";
import Alert from "./Alert";

export default function SettingForm({
  containerId,
  setPage,
}: settingFormTypes) {
  const [container, setContainer] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const { mutate: updateContainer } = useUpdateContainer({
    setPage,
    setIsLoading,
  });

  useEffect(() => {
    const cnt = client
      ?.getQueryData<any>(["Containers"])
      ?.filter((item: { id: string }) => item.id === containerId)[0];
    setContainer(cnt);
    setName(cnt?.name);
    setSize(cnt?.size);
    setHeight(cnt?.height);
    setAddress(cnt?.address);
  }, [containerId]);

  const handleUpdate = () => {
    if (
      name === container?.name &&
      size === container?.size &&
      height === container?.height
    ) {
      return;
    }
    updateContainer({ id: container.id, name, size, height });
    setIsLoading(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Box title={"Inforamation"}>
          <Input name="Container name" value={name} setValue={setName} />
          <Input
            name={"Size (liter)"}
            inputType={"number"}
            value={size}
            setValue={setSize}
          />
          <Input
            name={"Height (cm)"}
            inputType={"number"}
            value={height}
            setValue={setHeight}
          />

          <Input name={"Address"} value={address} isDisabled={true} />
          <div className="flex items-center">
            <Button
              text="Save"
              onClick={handleUpdate}
              isLoading={isLoading}
              disabled={
                name === container?.name &&
                size === container?.size &&
                height === container?.height
              }
            />
          </div>
        </Box>
      </div>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
    </>
  );
}
type settingFormTypes = {
  containerId: string;
  setPage: Function;
};

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { useUpdateContainer } from "@/hooks/useContainer";
import Box from "./Box";
import Alert from "./Alert";

interface settingFormTypes {
  currentContainer: any;
  setPage: Function;
}

export default function SettingForm({
  currentContainer,
  setPage,
}: settingFormTypes) {
  const [name, setName] = useState<string>(currentContainer?.name);
  const [size, setSize] = useState<string>(currentContainer?.size);
  const [height, setHeight] = useState<string>(currentContainer?.height);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const { mutate: updateContainer } = useUpdateContainer({
    setPage,
    setIsLoading,
  });

  const handleUpdate = () => {
    if (!!name && !!size && !!height) {
      updateContainer({ id: currentContainer?.id, name, size, height });
    } else {
      setAlertMsg("All fields are required");
    }
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
          <div className="flex items-center">
            <Button
              text="Save"
              onClick={handleUpdate}
              isLoading={isLoading}
              disabled={
                name === currentContainer?.name &&
                size === currentContainer?.size &&
                height === currentContainer?.height
              }
            />
          </div>
        </Box>
      </div>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
    </>
  );
}

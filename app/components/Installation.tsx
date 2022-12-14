import { useCreateContainer } from "@/hooks/useContainer";
import { useState } from "react";
import Box from "./Box";
import Button from "./Button";
import Input from "./Input";
import InputsContainer from "./InputsContainer";

export default function Installation({
  currentUser,
  close,
  setAlertMsg,
}: {
  currentUser: any;
  close: Function;
  setAlertMsg: Function;
}) {
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const { mutate: createContainer } = useCreateContainer();

  const handleInstallation = () => {
    createContainer({ id: currentUser.id, name, size, height });
    setName("");
    setSize("");
    setHeight("");
    setAlertMsg("Created successfully");
    close();
  };

  return (
    <>
      <Box title={"Install new sensor"}>
        <InputsContainer>
          <Input name={"Container name"} value={name} setValue={setName} />
          <Input
            name={"Size"}
            inputType={"number"}
            value={size}
            setValue={setSize}
          />
          <Input
            name={"Height"}
            inputType={"number"}
            value={height}
            setValue={setHeight}
          />
        </InputsContainer>
        <Button text="Start" onClick={handleInstallation} />
      </Box>
    </>
  );
}

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";
import Box from "@/components/atoms/Box";
import { useUpdateContainerInfo } from "@/hooks/container/useUpdateContainerInfo";

export default function ContainerInfoSettings({
  currentContainer,
  setPage,
  setAlertMsg,
}: {
  currentContainer: any;
  setPage: Function;
  setAlertMsg: Function;
}) {
  const [name, setName] = useState<string>(currentContainer?.name);
  const [size, setSize] = useState<string>(currentContainer?.size);
  const [height, setHeight] = useState<string>(currentContainer?.height);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: updateContainerInfo } = useUpdateContainerInfo({
    setAlertMsg,
    setIsLoading,
    setPage,
  });

  const handleUpdate = () => {
    setIsLoading(true);
    if (!!name && !!size && !!height) {
      updateContainerInfo({
        id: currentContainer?.id,
        name,
        size,
        height,
      });
    } else {
      setAlertMsg("All fields are required");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Box title={"Information"}>
          <Input placeholder="Container name" value={name} setValue={setName} />
          <Input
            placeholder={"Size (liter)"}
            inputType={"number"}
            value={size}
            setValue={setSize}
          />
          <Input
            placeholder={"Height (cm)"}
            inputType={"number"}
            value={height}
            setValue={setHeight}
          />

          <div className="flex items-center pt-6">
            <Button
              text="Update"
              onClick={handleUpdate}
              isLoading={isLoading}
              isDisabled={
                name === currentContainer?.name &&
                size === currentContainer?.size &&
                height === currentContainer?.height
              }
            />
          </div>
        </Box>
      </div>
    </>
  );
}

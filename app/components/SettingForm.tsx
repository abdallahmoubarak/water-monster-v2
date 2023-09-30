import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";
import { useUpdateContainer } from "@/hooks/useContainer";
import Box from "./atoms/Box";
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
  const [threshold, setThreshold] = useState<number>(
    currentContainer?.threshold || 15,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const { mutate: updateContainer } = useUpdateContainer({
    setPage,
    setIsLoading,
  });

  const handleUpdate = () => {
    if (!!name && !!size && !!height && !!threshold) {
      updateContainer({
        id: currentContainer?.id,
        name,
        size,
        height,
        threshold,
      });
    } else {
      setAlertMsg("All fields are required");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Box title={"Inforamation"}>
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

          <label htmlFor="steps-range">Level Alert ({threshold}%)</label>
          <input
            id="steps-range"
            type="range"
            min="0"
            max="60"
            onChange={(e) => setThreshold(parseInt(e.target.value))}
            value={threshold}
            step="5"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer select-auto text-primary"
          />
          {threshold === 0 && (
            <div className="text-sm text-gray-400">
              You will never recieve any notifications if you set it 0%
            </div>
          )}

          <div className="flex items-center pt-6">
            <Button
              text="Save"
              onClick={handleUpdate}
              isLoading={isLoading}
              isDisabled={
                name === currentContainer?.name &&
                size === currentContainer?.size &&
                height === currentContainer?.height &&
                threshold === currentContainer?.threshold
              }
            />
          </div>
        </Box>
      </div>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
    </>
  );
}

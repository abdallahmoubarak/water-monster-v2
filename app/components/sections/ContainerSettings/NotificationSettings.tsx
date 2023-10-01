import Alert from "@/components/atoms/Alert";
import Box from "@/components/atoms/Box";
import { useUpdateThreshold } from "@/hooks/useContainer";
import { useState } from "react";
import TitledSwitcher from "../TitledSwitcher";

export default function NotificationSettings({
  currentContainer,
}: {
  currentContainer: any;
}) {
  const [threshold, setThreshold] = useState<number>(
    currentContainer?.threshold || 15,
  );
  const [alertMsg, setAlertMsg] = useState<string>("");

  const { mutate: updateThreshold } = useUpdateThreshold({ setAlertMsg });

  return (
    <>
      <Box title="Notifications">
        <TitledSwitcher title="Change notification" />
        <TitledSwitcher title="Flow notification" />
        <TitledSwitcher title="Shortage notification" />

        <label htmlFor="steps-range">Level Alert ({threshold}%)</label>
        <input
          id="steps-range"
          type="range"
          min="0"
          max="60"
          onChange={(e) => setThreshold(parseInt(e.target.value))}
          onMouseUp={() =>
            updateThreshold({
              id: currentContainer?.id,
              threshold: threshold,
            })
          }
          value={threshold}
          step="5"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer select-auto text-primary"
        />

        {threshold === 0 && (
          <div className="text-sm text-gray-400">
            You will never recieve any notifications if you set it 0%
          </div>
        )}
      </Box>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
    </>
  );
}

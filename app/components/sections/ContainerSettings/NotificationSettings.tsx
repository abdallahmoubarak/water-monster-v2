import Box from "@/components/atoms/Box";
import { useState } from "react";
import TitledSwitcher from "../TitledSwitcher";
import { useUpdateThreshold } from "@/hooks/container/useUpdateThreshold";

export default function NotificationSettings({
  currentContainer,
  setAlertMsg,
}: {
  currentContainer: any;
  setAlertMsg: Function;
}) {
  const [threshold, setThreshold] = useState<number>(
    currentContainer?.threshold || 15,
  );
  const { mutate: updateThreshold } = useUpdateThreshold({ setAlertMsg });

  const handleUpdateThreshold = () => {
    updateThreshold({
      id: currentContainer?.id,
      threshold: threshold,
    });
  };
  return (
    <>
      <Box title="Notifications">
        <TitledSwitcher title="Level change notification" />
        <TitledSwitcher title="Flow notification" />
        <TitledSwitcher title="Shortage notification" />

        <label htmlFor="steps-range">Level Alert ({threshold}%)</label>
        <input
          id="steps-range"
          type="range"
          min="0"
          max="60"
          onChange={(e) => setThreshold(parseInt(e.target.value))}
          onMouseUp={handleUpdateThreshold}
          onTouchEnd={handleUpdateThreshold}
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
    </>
  );
}

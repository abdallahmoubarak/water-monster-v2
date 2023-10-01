import Alert from "@/components/atoms/Alert";
import Box from "@/components/atoms/Box";
import ToggleSwitch from "@/components/atoms/ToggleSwitch";
import { useState } from "react";

export default function NotificationSettings({
  currentContainer,
}: {
  currentContainer: any;
}) {
  const [threshold, setThreshold] = useState<number>(
    currentContainer?.threshold || 15,
  );
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const handlePush = () => {
    setToggle(!toggle);
    Notification.requestPermission().then((result) => {
      if (result !== "granted") {
        alert("Go to setting and allow notifications");
        setToggle(false);
      }
      randomNotification();
    });
  };
  function randomNotification() {
    const notifTitle = "Your Notifications are now active";
    const notifBody = `Water Monster`;
    const notifImg = `/icons/favicon.ico`;
    const options = {
      body: notifBody,
      icon: notifImg,
    };
    new Notification(notifTitle, options);
  }
  return (
    <>
      <Box title="Notification Settings">
        <label htmlFor="steps-range">Level Alert ({threshold}%)</label>
        <input
          id="steps-range"
          type="range"
          min="0"
          max="60"
          onChange={(e) => {
            setThreshold(parseInt(e.target.value));
          }}
          value={threshold}
          step="5"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer select-auto text-primary"
        />

        {threshold === 0 && (
          <div className="text-sm text-gray-400">
            You will never recieve any notifications if you set it 0%
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>Allow Notifications </div>
          <ToggleSwitch toggle={toggle} setToggle={handlePush} />
        </div>
      </Box>
      <Alert alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
    </>
  );
}

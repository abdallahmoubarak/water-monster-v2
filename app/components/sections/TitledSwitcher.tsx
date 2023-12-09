import ToggleSwitch from "@/components/atoms/ToggleSwitch";
import { useEffect, useState } from "react";

export default function TitledSwitcher({ title }: { title: string }) {
  const [toggle, setToggle] = useState(false);
  const [registration, setRegistration] = useState<any>();
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("../../public/sw.js");
          console.log("Service Worker registered with scope:", registration.scope);
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      }
    };

    registerServiceWorker();
  }, []);
  const handlePush = () => {
    setToggle(!toggle);
    
    Notification.requestPermission().then((result) => {
      alert(result);
      if (result !== "granted") {
        alert("Go to setting and allow notifications");
        setToggle(false);
      }
      showNotification();
    });
  };
  const showNotification = () => {
    const notiftitle = "Your Notifications are active now.";
    const notifbody = `Water Monster`;
    const notifImg = `/icons/favicon.ico`;

    const payload = {
      body: notifbody,
      icon: notifImg,
    };

    if (registration && "showNotification" in registration) {
      registration.showNotification(title, payload);
    } else {
      new Notification(notiftitle, payload);
    }
  };

  useEffect(() => {
  alert(JSON.stringify(navigator.serviceWorker.getRegistration()))
    
    navigator.serviceWorker.getRegistration().then((reg) => {
      setRegistration(reg);
    });
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div>{title} </div>
      <ToggleSwitch toggle={toggle} setToggle={handlePush} />
    </div>
  );
}

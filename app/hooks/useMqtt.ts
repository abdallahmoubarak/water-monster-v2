import { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";

type QoS = 0 | 1 | 2;

type Subscription = {
  topic: string;
  qos: QoS;
};

export const useMqtt = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectStatus, setConnectStatus] = useState<
    "Disconnected" | "Connecting" | "Connected" | "Reconnecting"
  >("Disconnected");
  const [payload, setPayload] = useState<{
    topic: string;
    message: any;
  } | null>(null);

  const mqttConnect = (host: string, options: mqtt.IClientOptions) => {
    setConnectStatus("Connecting");
    const mqttClient = mqtt.connect(host, options);
    setClient(mqttClient);
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => setConnectStatus("Disconnected"));
    }
  };

  const mqttSubscribe = (subscription: Subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error?: any) => {
        if (error) {
          console.error("Subscribe error:", error);
          return;
        }
      });
    }
  };

  const mqttUnsubscribe = (topic: string) => {
    if (client) {
      client.unsubscribe(topic, (error?: Error) => {
        if (error) {
          console.error("Unsubscribe error:", error);
        }
      });
    }
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => setConnectStatus("Connected"));
      client.on("reconnect", () => setConnectStatus("Reconnecting"));
      client.on("error", (err) => {
        console.error("Connection error:", err);
        setConnectStatus("Disconnected");
      });
      client.on("message", (topic, message) => {
        const msg = JSON.parse(message.toString());

        setPayload({
          topic,
          message: msg,
        });
      });
    }
  }, [client]);

  return {
    connectStatus,
    mqttConnect,
    mqttDisconnect,
    mqttSubscribe,
    mqttUnsubscribe,
    payload,
  };
};

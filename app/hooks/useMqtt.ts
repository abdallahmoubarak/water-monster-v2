import { useState, useEffect } from "react";
import mqtt, { MqttClient } from "mqtt";

type QoS = 0 | 1 | 2;

type Subscription = {
  topic: string;
  qos: QoS;
};

type PublishContext = {
  topic: string;
  qos: QoS;
  payload: string | Buffer;
};

export const useMqtt = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectStatus, setConnectStatus] = useState<
    "Disconnected" | "Connecting" | "Connected" | "Reconnecting"
  >("Disconnected");
  const [payload, setPayload] = useState<{
    topic: string;
    message: string;
    timestamp: string;
  } | null>(null);

  const mqttConnect = (host: string, options: mqtt.IClientOptions) => {
    setConnectStatus("Connecting");
    const mqttClient = mqtt.connect(host, options);
    setClient(mqttClient);
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus("Disconnected");
      });
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

  const mqttPublish = (context: PublishContext) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error?: Error) => {
        if (error) {
          console.error("Publish error:", error);
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
      client.on("message", (topic, message, packet) => {
        const publishedAt =
          packet?.properties?.userProperties?.publishTime || Date.now();
        console.log(packet?.properties?.userProperties?.publishTime);
        setPayload({
          topic,
          message: message.toString(),
          timestamp: publishedAt.toString(),
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
    mqttPublish,
    payload,
  };
};

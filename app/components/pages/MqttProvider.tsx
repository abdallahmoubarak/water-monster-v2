import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import mqtt, { MqttClient } from "mqtt";

// Define the shape of the context value
interface MqttContextType {
  client: MqttClient | null;
  subscribe: (topic: string) => void;
  unsubscribe: (topic: string) => void;
  publish: (topic: string, message: string | Buffer) => void;
  payload: Record<string, any>; // Store payloads by topic
}

// Create a context with the default value of null
const MqttContext = createContext<MqttContextType | null>(null);

interface MqttProviderProps {
  children: ReactNode;
}

export const MqttProvider: React.FC<MqttProviderProps> = ({ children }) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [payload, setPayload] = useState<Record<string, any>>({}); // State for storing payloads by topic

  useEffect(() => {
    const mqttClient = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL!, {
      protocolId: "MQTT",
      clientId: `user_${Math.random().toString(16).slice(2, 10)}`,
      username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      port: 8084,
      protocolVersion: 5,
      clean: false,
    });

    mqttClient.on("connect", () => console.log("Connected to MQTT broker"));
    mqttClient.on("message", (topic, message) => {
      setPayload((prev) => ({
        ...prev,
        [topic]: message.toString(), // Store the latest message for the topic
      }));
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end(); // Clean up connection on unmount
    };
  }, []);

  const subscribe = (topic: string) => {
    if (client && !subscriptions.includes(topic)) {
      client.subscribe(topic, (err) => {
        if (!err) {
          setSubscriptions((prev) => [...prev, topic]);
        } else {
          console.error("Subscription error:", err);
        }
      });
    }
  };

  const unsubscribe = (topic: string) => {
    if (client) {
      client.unsubscribe(topic, (err) => {
        if (!err) {
          setSubscriptions((prev) => prev.filter((t) => t !== topic));
        } else {
          console.error("Unsubscription error:", err);
        }
      });
    }
  };

  const publish = (topic: string, message: string | Buffer) => {
    if (client) {
      client.publish(topic, message, (err) => {
        if (err) {
          console.error("Publish error:", err);
        }
      });
    }
  };

  return (
    <MqttContext.Provider
      value={{ client, subscribe, unsubscribe, publish, payload }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqttContext = (): MqttContextType => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error("useMqttContext must be used within an MqttProvider");
  }
  return context;
};

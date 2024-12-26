import "@/styles/globals.css";
import "@fontsource/nunito";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MqttProvider } from "@/components/pages/MqttProvider";

export const client = new QueryClient({});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <MqttProvider>
        <Component {...pageProps} />
      </MqttProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

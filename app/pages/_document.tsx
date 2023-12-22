import Document, { Html, Head, Main, NextScript } from "next/document";

const APP_NAME = "Water Monster";
const APP_DESCRIPTION = "Control your water flow";
const APP_COLOR = "#40A3C0";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          {/* Primary Meta Tags */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="theme-color" content={APP_COLOR} />

          {/* Additional Meta Tags */}
          <meta name="keywords" content="water level control system, water level management, water level monitoring, automated water level control, water level regulation, water tank level control, real-time water monitoring, remote water monitoring, IoT water monitoring, water quality monitoring, environmental water monitoring, Arduino water level sensor, Arduino water level indicator, Arduino water level controller, Arduino water level project, Arduino water level automation, Water Monster control system, Water Monster Arduino, Water Monster water level sensor, Water Monster IoT solution, Water Monster automation, Water Monster smart water control, Arduino-based water level management, Arduino water pump control, Arduino water flow sensor, Arduino irrigation system, Arduino water level automation project, environmental water control, sustainable water management, eco-friendly water level system, green water solutions, conservation of water resources, smart environmental monitoring, smart irrigation system, Arduino-based irrigation control, automated irrigation solution, precision irrigation with Arduino, efficient water use in agriculture, industrial water level control, process water monitoring, industrial automation with water control, Arduino in industrial water systems, water usage optimization in industry, wireless water level monitoring, Arduino wireless water control, RF-based water level sensing, Bluetooth water level sensor, WiFi-enabled water level control, water control in aquaponics, Arduino aquaponics system, hydroponic water level control, smart hydroponic solutions, water optimization in soilless farming"
 />
          <meta name="author" content="Abdallah Moubarak" />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/path/to/your/image.jpg" />
          <meta property="og:url" content="https://example.com" />

          {/* Twitter Meta Tags */}
        
          <meta name="twitter:title" content={APP_NAME} />
          <meta name="twitter:description" content={APP_DESCRIPTION} />
       
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

          {/* Manifest */}
          <link rel="manifest" href="/manifest.json" />

        

         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  // fallbacks: {
  // image: "/static/images/fallback.png",
  //   document: "/offline",
  // },
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default withPWA({
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "firebasestorage.googleapis.com",
  //       pathname: "**",
  //     },
  //   ],
  // },
});

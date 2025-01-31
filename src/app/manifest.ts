import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GPS Drawing",
    short_name: "GPS Drawing",
    description: "Draw your path on the map with GPS tracking",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#00ff88",
    icons: [
      {
        src: "icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

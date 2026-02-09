"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TrackingScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Manually trigger popstate event for the tracking script to detect SPA navigation
    // This allows the script to hit the tracking API on every page change in Next.js
    if (typeof window !== "undefined") {
      const popStateEvent = new PopStateEvent('popstate', { state: null });
      window.dispatchEvent(popStateEvent);
    }
  }, [pathname]);



  return (
    <Script
      src="https://monitor.lawfinity.in/track.js"
      data-site-id="6989a124a57940eaf353783f"
      data-site-name="http://factorylicence.in/"
      data-debug="false"
      strategy="lazyOnload"
      onLoad={() => {
        console.log("✅ Tracking script loaded successfully");
      }}
      onError={() => {
        console.error("❌ Failed to load tracking script");
      }}
    />
  );
}



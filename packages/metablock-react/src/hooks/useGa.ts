import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare global {
  interface Window {
    gtag?: (
      key: string,
      trackingId: string,
      config: { page_path: string }
    ) => void;
  }
}

// Google Analytics for SPA
// https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications
const useGa = (trackingId: string) => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag || !trackingId) return;
    window.gtag("config", trackingId, { page_path: location.pathname });
  }, [trackingId, location]);
};

export default useGa;

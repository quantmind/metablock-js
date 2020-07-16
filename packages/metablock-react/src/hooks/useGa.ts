import { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
  const { listen } = useHistory();

  useEffect(() => {
    const unListen = listen((location) => {
      if (!window.gtag || !trackingId) return;
      window.gtag("config", trackingId, { page_path: location.pathname });
    });

    return unListen;
  }, [trackingId, listen]);
};

export default useGa;

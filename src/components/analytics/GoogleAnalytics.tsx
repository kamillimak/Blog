import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ConsentValue = "granted" | "denied";
type GtagConsentParams = {
  analytics_storage: ConsentValue;
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
};
type GtagCommand =
  | [command: "js", value: Date]
  | [command: "config" | "event", target: string, params?: Record<string, unknown>]
  | [command: "consent", action: "default" | "update", params: GtagConsentParams];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagCommand) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const consentKey = "blog-analytics-consent";

const isValidMeasurementId = (value: string | undefined) => Boolean(value && /^G-[A-Z0-9]+$/i.test(value));
const getStoredConsent = (): ConsentValue => {
  if (window.localStorage.getItem(consentKey) === "granted") return "granted";
  return "denied";
};

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!isValidMeasurementId(measurementId) || window.gtag) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: GtagCommand) => {
      window.dataLayer?.push(args);
    };
    window.gtag("consent", "default", {
      analytics_storage: getStoredConsent(),
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!isValidMeasurementId(measurementId) || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [location]);

  return null;
}

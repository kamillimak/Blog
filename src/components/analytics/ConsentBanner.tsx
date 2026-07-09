import { useEffect, useState } from "react";

const consentKey = "blog-analytics-consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(consentKey) === null);
  }, []);

  const setConsent = (analyticsStorage: "granted" | "denied") => {
    window.localStorage.setItem(consentKey, analyticsStorage);
    window.gtag?.("consent", "update", {
      analytics_storage: analyticsStorage,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section
      aria-label="Ustawienia prywatności i analityki"
      className="fixed inset-x-3 bottom-3 z-[80] border border-brand-border bg-brand-card p-4 text-brand-text shadow-2xl sm:left-auto sm:right-5 sm:max-w-md"
    >
      <div className="space-y-3">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-brand-muted">
          Prywatność
        </p>
        <h2 className="text-base font-extrabold uppercase tracking-tight">Analityka i zgody</h2>
        <p className="text-sm leading-relaxed text-brand-muted">
          Używam Google Analytics 4, żeby mierzyć jakość treści i techniczne działanie bloga. Możesz zaakceptować pomiar albo korzystać ze strony bez analityki.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="flex-1 bg-brand-text px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-brand-bg transition-colors hover:bg-brand-sage hover:text-white"
          >
            Akceptuję
          </button>
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="flex-1 border border-brand-border px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-brand-muted transition-colors hover:border-brand-text hover:text-brand-text"
          >
            Tylko niezbędne
          </button>
        </div>
      </div>
    </section>
  );
}

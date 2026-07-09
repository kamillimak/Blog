import { useEffect, useMemo, useState } from "react";
import { Activity, Gauge, Timer } from "lucide-react";

type VitalName = "FCP" | "LCP" | "CLS" | "INP" | "TTFB";

type VitalMetric = {
  name: VitalName;
  value: number | null;
  unit: "ms" | "score";
  good: number;
  needsWork: number;
};

type LayoutShiftEntry = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
};

type LargestContentfulPaintEntry = PerformanceEntry & {
  startTime: number;
};

type EventTimingEntry = PerformanceEntry & {
  duration: number;
  interactionId?: number;
};

type EventPerformanceObserverInit = PerformanceObserverInit & {
  durationThreshold?: number;
};

const storageKey = "blog-web-vitals-last";

const getRating = (metric: VitalMetric) => {
  if (metric.value === null) return "pending";
  if (metric.value <= metric.good) return "good";
  if (metric.value <= metric.needsWork) return "needs-work";
  return "poor";
};

const formatMetric = (metric: VitalMetric) => {
  if (metric.value === null) return "Pomiar...";
  if (metric.unit === "score") return metric.value.toFixed(3);
  return `${Math.round(metric.value)} ms`;
};

export function WebVitalsDashboard() {
  const [metrics, setMetrics] = useState<Record<VitalName, number | null>>({
    FCP: null,
    LCP: null,
    CLS: null,
    INP: null,
    TTFB: null,
  });

  useEffect(() => {
    const updateMetric = (name: VitalName, value: number) => {
      setMetrics((current) => ({ ...current, [name]: value }));
    };

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation) {
      updateMetric("TTFB", navigation.responseStart - navigation.requestStart);
    }

    const observers: PerformanceObserver[] = [];

    if ("PerformanceObserver" in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          const fcp = list.getEntries().find((entry) => entry.name === "first-contentful-paint");
          if (fcp) updateMetric("FCP", fcp.startTime);
        });
        paintObserver.observe({ type: "paint", buffered: true });
        observers.push(paintObserver);
      } catch {
        // Unsupported browser metric.
      }

      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as LargestContentfulPaintEntry[];
          const lastEntry = entries.at(-1);
          if (lastEntry) updateMetric("LCP", lastEntry.startTime);
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
        observers.push(lcpObserver);
      } catch {
        // Unsupported browser metric.
      }

      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as LayoutShiftEntry[];
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) clsValue += entry.value;
          });
          updateMetric("CLS", clsValue);
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
        observers.push(clsObserver);
      } catch {
        // Unsupported browser metric.
      }

      try {
        let longestInteraction = 0;
        const inpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as EventTimingEntry[];
          entries.forEach((entry) => {
            if (entry.interactionId && entry.duration > longestInteraction) {
              longestInteraction = entry.duration;
              updateMetric("INP", longestInteraction);
            }
          });
        });
        inpObserver.observe({ type: "event", buffered: true, durationThreshold: 40 } as EventPerformanceObserverInit);
        observers.push(inpObserver);
      } catch {
        // Unsupported browser metric.
      }
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ measuredAt: new Date().toISOString(), metrics }));
  }, [metrics]);

  const cards = useMemo<VitalMetric[]>(
    () => [
      { name: "FCP", value: metrics.FCP, unit: "ms", good: 1800, needsWork: 3000 },
      { name: "LCP", value: metrics.LCP, unit: "ms", good: 2500, needsWork: 4000 },
      { name: "CLS", value: metrics.CLS, unit: "score", good: 0.1, needsWork: 0.25 },
      { name: "INP", value: metrics.INP, unit: "ms", good: 200, needsWork: 500 },
      { name: "TTFB", value: metrics.TTFB, unit: "ms", good: 800, needsWork: 1800 },
    ],
    [metrics],
  );

  return (
    <section id="web-vitals-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="border border-brand-border bg-brand-card p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-brand-border pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-muted">
              Web Vitals Dashboard
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-brand-text">
              Techniczna jakość strony w czasie rzeczywistym
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-brand-muted">
            <Activity size={14} />
            Pomiar lokalny w przeglądarce
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((metric) => {
            const rating = getRating(metric);
            const color =
              rating === "good"
                ? "border-emerald-500 text-emerald-600"
                : rating === "needs-work"
                  ? "border-amber-500 text-amber-600"
                  : rating === "poor"
                    ? "border-rose-500 text-rose-600"
                    : "border-brand-border text-brand-muted";

            return (
              <div key={metric.name} className={`border bg-brand-featured-bg p-4 ${color}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black uppercase tracking-widest">{metric.name}</span>
                  {metric.name === "CLS" ? <Gauge size={16} /> : <Timer size={16} />}
                </div>
                <p className="mt-5 font-mono text-2xl font-black text-brand-text">{formatMetric(metric)}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                  {rating === "good" ? "Dobry wynik" : rating === "needs-work" ? "Do poprawy" : rating === "poor" ? "Słaby wynik" : "Czekam na dane"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

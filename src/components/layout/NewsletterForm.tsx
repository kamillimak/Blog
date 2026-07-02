import React, { useState } from "react";
import { Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [gmailStatus, setGmailStatus] = useState<{ sent: boolean; saved: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Wprowadź prawidłowy adres e-mail.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage(data.message);
        setGmailStatus({
          sent: data.gmailSent,
          saved: data.emailSavedLocally,
        });
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Wystąpił błąd podczas zapisu.");
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setStatus("error");
      setMessage("Brak połączenia z serwerem. Spróbuj ponownie później.");
    }
  };

  return (
    <div id="newsletter-form-container" className="flex flex-col h-full font-sans">
      <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-4 border-l-2 border-brand-sage pl-3">
        Newsletter
      </h3>
      
      <p className="text-xs text-zinc-400 mb-5 leading-relaxed max-w-sm">
        Otrzymuj zaawansowane techniczne opracowania i prompty prosto na swoją skrzynkę odbiorczą. zero spamu, czysta wiedza.
      </p>

      {status === "success" ? (
        <div className="bg-[#1e2925] border border-emerald-800 p-4 rounded-none text-zinc-300">
          <div className="flex items-start gap-2.5 mb-2.5">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Subskrypcja aktywna!</span>
          </div>
          <p className="text-xs leading-relaxed mb-3 text-zinc-400">
            {message}
          </p>
          <div className="flex flex-col gap-1 text-[9px] font-mono uppercase tracking-wider text-zinc-500 border-t border-zinc-800/80 pt-2.5">
            <div className="flex justify-between">
              <span>Baza danych (lokalna):</span>
              <span className={gmailStatus?.saved ? "text-emerald-500 font-bold" : "text-zinc-600"}>
                {gmailStatus?.saved ? "ZAPISANO" : "POMINIĘTO"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Serwer Gmail SMTP:</span>
              <span className={gmailStatus?.sent ? "text-emerald-500 font-bold" : "text-amber-500/90 font-bold"}>
                {gmailStatus?.sent ? "WYSŁANO" : "NIEAKTYWNY (BRAK CONFIGU)"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="mt-3.5 text-[9px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white underline cursor-pointer"
          >
            Zapisz kolejny adres
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 pointer-events-none">
              <Mail size={14} />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="Twój adres e-mail..."
              className="w-full pl-9 pr-4 py-3 bg-[#222222] border border-zinc-800 hover:border-zinc-700 focus:border-white focus:outline-none transition-all text-xs text-white placeholder-zinc-500 rounded-none font-sans"
              required
              aria-label="Adres e-mail do newslettera"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-white hover:bg-zinc-200 text-[#1A1A1A] font-bold text-[10px] uppercase tracking-widest rounded-none transition-colors cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-600"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Przetwarzanie...</span>
              </>
            ) : (
              <>
                <span>Zapisz się</span>
                <ArrowRight size={12} />
              </>
            )}
          </button>

          {status === "error" && (
            <div className="flex items-start gap-2 text-rose-500 text-[10px] font-mono uppercase tracking-wider bg-rose-950/20 border border-rose-900/40 p-2.5">
              <AlertCircle size={13} className="shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

import { useEffect } from "react";
import { Link } from "react-router-dom";

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Polityka prywatnoĹ›ci â€” Blog technologiczny";
  }, []);

  return (
    <main className="bg-brand-bg text-brand-text">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/" className="text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-brand-text">
          WrĂłÄ‡ na stronÄ™ gĹ‚ĂłwnÄ…
        </Link>

        <div className="mt-8 border-b border-brand-border pb-8">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-muted">
            PrywatnoĹ›Ä‡
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            Polityka prywatnoĹ›ci
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Ta strona opisuje, jakie dane mogÄ… byÄ‡ przetwarzane podczas korzystania z bloga Warsztat AI Coding.
          </p>
        </div>

        <div className="prose prose-zinc max-w-none space-y-8 py-8 text-brand-muted">
          <section>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text">Analityka</h2>
            <p className="mt-3 leading-relaxed">
              Blog moĹĽe korzystaÄ‡ z Google Analytics 4, aby mierzyÄ‡ liczbÄ™ odwiedzin, popularnoĹ›Ä‡ treĹ›ci oraz podstawowe parametry techniczne wizyt. Dane sÄ… wykorzystywane do poprawy jakoĹ›ci strony i nie sĹ‚uĹĽÄ… do sprzedaĹĽy danych osobowych.
            </p>
            <p className="mt-3 leading-relaxed">
              Analityka dziaĹ‚a z Google Consent Mode v2. DomyĹ›lnie zgoda analityczna jest wyĹ‚Ä…czona, a uĹĽytkownik moĹĽe zdecydowaÄ‡, czy akceptuje pomiar, czy wybiera tylko niezbÄ™dne ustawienia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text">Newsletter</h2>
            <p className="mt-3 leading-relaxed">
              JeĹ›li zapiszesz siÄ™ do newslettera, przetwarzany jest adres e-mail potrzebny do obsĹ‚ugi subskrypcji. MoĹĽesz poprosiÄ‡ o usuniÄ™cie adresu, piszÄ…c na mikolajczykamil@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text">Pliki cookies i skrypty zewnÄ™trzne</h2>
            <p className="mt-3 leading-relaxed">
              Strona moĹĽe Ĺ‚adowaÄ‡ skrypty Google Analytics oraz fonty Google Fonts. PrzeglÄ…darka uĹĽytkownika moĹĽe komunikowaÄ‡ siÄ™ z usĹ‚ugami Google zgodnie z ich wĹ‚asnymi zasadami prywatnoĹ›ci.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text">Kontakt</h2>
            <p className="mt-3 leading-relaxed">
              W sprawach zwiÄ…zanych z prywatnoĹ›ciÄ… skontaktuj siÄ™ przez e-mail:{" "}
              <a href="mailto:mikolajczykamil@gmail.com" className="font-bold text-brand-text underline underline-offset-4">
                mikolajczykamil@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

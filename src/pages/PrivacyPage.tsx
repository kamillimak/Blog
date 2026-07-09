import { useEffect } from "react";
import { Link } from "react-router-dom";

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Polityka prywatności — Blog technologiczny";
  }, []);

  return (
    <main className="bg-brand-bg text-brand-text">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/" className="text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-brand-text">
          Wróć na stronę główną
        </Link>

        <div className="mt-8 border-b border-brand-border pb-8">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-muted">
            Prywatność
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
            Polityka prywatności
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Ta strona opisuje, jakie dane mogą być przetwarzane podczas korzystania z bloga AI w praktyce.
          </p>
        </div>

        <div className="prose prose-zinc max-w-none space-y-8 py-8 text-brand-muted">
          <section>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text">Analityka</h2>
            <p className="mt-3 leading-relaxed">
              Blog może korzystać z Google Analytics 4, aby mierzyć liczbę odwiedzin, popularność treści oraz podstawowe parametry techniczne wizyt. Dane są wykorzystywane do poprawy jakości strony i nie służą do sprzedaży danych osobowych.
            </p>
            <p className="mt-3 leading-relaxed">
              Analityka działa z Google Consent Mode v2. Domyślnie zgoda analityczna jest wyłączona, a użytkownik może zdecydować, czy akceptuje pomiar, czy wybiera tylko niezbędne ustawienia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text">Newsletter</h2>
            <p className="mt-3 leading-relaxed">
              Jeśli zapiszesz się do newslettera, przetwarzany jest adres e-mail potrzebny do obsługi subskrypcji. Możesz poprosić o usunięcie adresu, pisząc na mikolajczykamil@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text">Pliki cookies i skrypty zewnętrzne</h2>
            <p className="mt-3 leading-relaxed">
              Strona może ładować skrypty Google Analytics oraz fonty Google Fonts. Przeglądarka użytkownika może komunikować się z usługami Google zgodnie z ich własnymi zasadami prywatności.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-brand-text">Kontakt</h2>
            <p className="mt-3 leading-relaxed">
              W sprawach związanych z prywatnością skontaktuj się przez e-mail:{" "}
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

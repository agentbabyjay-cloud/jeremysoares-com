export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr-ca";

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#0e1011" }}
        className="px-6 pt-20 pb-12 md:pt-28 md:pb-16"
      >
        <div className="mx-auto max-w-7xl">
          <p
            style={{ color: "#eceae5" }}
            className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4"
          >
            {isFr ? "Contact" : "Contact"}
          </p>
          <h1
            style={{ color: "#eceae5" }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            {isFr ? "Discutons" : "Let's Talk"}
          </h1>
        </div>
      </section>

      {/* ── CONTACT DETAILS ──────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#eceae5" }}
        className="px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact info */}
            <div style={{ color: "#0e1011" }}>
              <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-8">
                {isFr ? "Coordonnées" : "Get In Touch"}
              </p>

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs tracking-widest uppercase opacity-40 mb-1">
                    {isFr ? "Téléphone" : "Phone"}
                  </p>
                  <a
                    href="tel:5145198177"
                    className="text-2xl md:text-3xl font-bold tracking-tight hover:opacity-60 transition-opacity"
                  >
                    514 519-8177
                  </a>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase opacity-40 mb-1">
                    {isFr ? "Courriel" : "Email"}
                  </p>
                  <a
                    href="mailto:JeremySoares@icloud.com"
                    className="text-2xl md:text-3xl font-bold tracking-tight hover:opacity-60 transition-opacity break-all"
                  >
                    JeremySoares@icloud.com
                  </a>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase opacity-40 mb-1">
                    LinkedIn
                  </p>
                  <a
                    href="https://www.linkedin.com/in/jeremysoaresrealestate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold tracking-tight hover:opacity-60 transition-opacity"
                  >
                    linkedin.com/in/jeremysoaresrealestate
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div
              style={{ backgroundColor: "#0e1011", color: "#eceae5" }}
              className="p-10 md:p-14 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-6">
                  {isFr ? "Formulaire de Contact" : "Contact Form"}
                </p>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-6">
                  {isFr
                    ? "Remplissez notre formulaire pour démarrer"
                    : "Fill out our form to get started"}
                </h2>
                <p className="text-base opacity-60 leading-relaxed mb-10">
                  {isFr
                    ? "Partagez quelques détails sur votre projet ou vos besoins et nous vous répondrons dans les plus brefs délais."
                    : "Share a few details about your project or needs and we'll get back to you promptly."}
                </p>
              </div>
              <a
                href="https://form.jeremysoares.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#eceae5", color: "#0e1011" }}
                className="inline-block text-sm tracking-widest uppercase font-bold px-8 py-4 text-center hover:opacity-90 transition-opacity"
              >
                {isFr ? "Ouvrir le Formulaire" : "Open Form"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

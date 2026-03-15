export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr-ca";

  const services = [
    {
      number: "01",
      title: isFr ? "Immobilier Résidentiel" : "Residential Real Estate",
      sub: isFr ? "Achat & Vente" : "Buy & Sell",
      description: isFr
        ? "Accompagnement complet pour l'achat ou la vente d'une propriété résidentielle à Montréal et dans les environs. Stratégies personnalisées, négociation experte et suivi rigoureux à chaque étape."
        : "Full-service support for buying or selling a residential property in Montreal and surrounding areas. Personalized strategies, expert negotiation, and rigorous follow-through at every step.",
    },
    {
      number: "02",
      title: isFr ? "Recherche d'Appartement" : "Apartment Hunting",
      sub: isFr ? "Location" : "Rentals",
      description: isFr
        ? "Que vous cherchiez un appartement à louer ou que vous soyez propriétaire souhaitant louer votre unité, je facilite la mise en relation et le processus complet de location."
        : "Whether you're looking to rent an apartment or are a landlord wanting to lease your unit, I facilitate the match-making and full rental process.",
    },
    {
      number: "03",
      title: isFr ? "Immobilier Commercial" : "Commercial Real Estate",
      sub: isFr ? "Espaces Commerciaux" : "Commercial Spaces",
      description: isFr
        ? "Acquisition, location et vente d'espaces commerciaux. Grâce à mon réseau de propriétaires d'entreprises et de promoteurs, j'offre un accès privilégié aux meilleures opportunités commerciales."
        : "Acquisition, leasing, and sale of commercial spaces. Leveraging my network of business owners and developers, I provide privileged access to the best commercial opportunities.",
    },
    {
      number: "04",
      title: isFr ? "Nouveaux Projets" : "New Developments",
      sub: isFr ? "Préventes" : "Pre-sales",
      description: isFr
        ? "Spécialiste des ventes de prévente de condos neufs, avec des années d'expérience dans le développement d'affaires pour les promoteurs de Montréal et de Vancouver."
        : "Specialist in new condo pre-sale transactions, with years of experience in business development for developers in Montreal and Vancouver.",
    },
    {
      number: "05",
      title: isFr ? "Conception Web" : "Website Design",
      sub: isFr ? "Marketing Numérique" : "Digital Marketing",
      description: isFr
        ? "Fort de plus de 50 domaines immobiliers spécialisés et d'une liste de courriels de 14 000 courtiers québécois, j'offre également des services de marketing numérique et de création de site web pour les professionnels de l'immobilier."
        : "Leveraging over 50 specialized real estate domains and an email list of 14,000 Quebec brokers, I also offer digital marketing and website creation services for real estate professionals.",
    },
  ];

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
            {isFr ? "Studio" : "Studio"}
          </p>
          <h1
            style={{ color: "#eceae5" }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            {isFr ? "Services" : "Services"}
          </h1>
        </div>
      </section>

      {/* ── SERVICES LIST ────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#eceae5" }}
        className="px-6 py-0"
      >
        <div className="mx-auto max-w-7xl">
          {services.map((service, index) => (
            <div
              key={service.number}
              style={{
                borderTop: index === 0 ? "none" : "1px solid rgba(14,16,17,0.12)",
                color: "#0e1011",
              }}
              className="py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
            >
              <div className="md:col-span-1">
                <span className="text-sm tracking-widest opacity-30">{service.number}</span>
              </div>
              <div className="md:col-span-4">
                <p className="text-xs tracking-widest uppercase opacity-40 mb-2">{service.sub}</p>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                  {service.title}
                </h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-lg leading-relaxed opacity-70 max-w-xl">{service.description}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(14,16,17,0.12)" }} className="pb-4" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#132030" }}
        className="px-6 py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <h2
            style={{ color: "#eceae5" }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight"
          >
            {isFr ? "Quel service vous convient?" : "Which service fits you?"}
          </h2>
          <a
            href="https://form.jeremysoares.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#eceae5", color: "#0e1011" }}
            className="inline-block text-sm tracking-widest uppercase font-bold px-10 py-5 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {isFr ? "Discutons" : "Let's Talk"}
          </a>
        </div>
      </section>
    </>
  );
}

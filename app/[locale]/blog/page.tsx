export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr-ca";

  const posts = [
    {
      date: isFr ? "Mars 2026" : "March 2026",
      tag: isFr ? "Marché" : "Market",
      title: isFr
        ? "L'état du marché immobilier montréalais en 2026"
        : "The State of Montreal's Real Estate Market in 2026",
      excerpt: isFr
        ? "Un aperçu des tendances actuelles, des prix et des opportunités pour les acheteurs et vendeurs sur l'île de Montréal."
        : "An overview of current trends, pricing, and opportunities for buyers and sellers on the island of Montreal.",
    },
    {
      date: isFr ? "Février 2026" : "February 2026",
      tag: isFr ? "Conseils" : "Tips",
      title: isFr
        ? "5 choses à savoir avant d'acheter votre premier condo"
        : "5 Things to Know Before Buying Your First Condo",
      excerpt: isFr
        ? "De la mise de fonds aux frais de copropriété, voici ce que chaque premier acheteur devrait comprendre avant de signer."
        : "From down payments to condo fees, here's what every first-time buyer should understand before signing.",
    },
    {
      date: isFr ? "Janvier 2026" : "January 2026",
      tag: isFr ? "Investissement" : "Investment",
      title: isFr
        ? "Pourquoi Montréal reste l'une des meilleures villes pour investir en immobilier"
        : "Why Montreal Remains One of the Best Cities to Invest in Real Estate",
      excerpt: isFr
        ? "Montréal offre un équilibre unique entre accessibilité, croissance démographique et rendements locatifs solides."
        : "Montreal offers a unique balance of affordability, population growth, and strong rental yields.",
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
            {isFr ? "Journal" : "Blog"}
          </p>
          <h1
            style={{ color: "#eceae5" }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            {isFr ? "Articles" : "Articles"}
          </h1>
        </div>
      </section>

      {/* ── POSTS LIST ───────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#eceae5" }}
        className="px-6 py-0"
      >
        <div className="mx-auto max-w-7xl">
          {posts.map((post, index) => (
            <article
              key={index}
              style={{
                borderTop: index === 0 ? "none" : "1px solid rgba(14,16,17,0.12)",
                color: "#0e1011",
              }}
              className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 cursor-default group"
            >
              <div className="md:col-span-2">
                <p className="text-xs tracking-widest uppercase opacity-40">{post.date}</p>
              </div>
              <div className="md:col-span-10">
                <span
                  style={{ backgroundColor: "rgba(14,16,17,0.08)" }}
                  className="inline-block text-xs tracking-widest uppercase px-3 py-1 mb-4"
                >
                  {post.tag}
                </span>
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-4 group-hover:opacity-60 transition-opacity">
                  {post.title}
                </h2>
                <p className="text-base leading-relaxed opacity-60 max-w-2xl">{post.excerpt}</p>
              </div>
            </article>
          ))}
          <div style={{ borderTop: "1px solid rgba(14,16,17,0.12)" }} className="pb-4" />
        </div>
      </section>

      {/* ── SUBSCRIBE BAND ───────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#0e1011" }}
        className="px-6 py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <p
            style={{ color: "#eceae5" }}
            className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4"
          >
            {isFr ? "Restez informé" : "Stay informed"}
          </p>
          <h2
            style={{ color: "#eceae5" }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 max-w-xl"
          >
            {isFr
              ? "Des analyses immobilières directement dans votre boîte"
              : "Real estate insights straight to your inbox"}
          </h2>
          <a
            href="mailto:JeremySoares@icloud.com?subject=Subscribe"
            style={{ backgroundColor: "#eceae5", color: "#0e1011" }}
            className="inline-block text-sm tracking-widest uppercase font-bold px-8 py-4 hover:opacity-90 transition-opacity"
          >
            {isFr ? "S'abonner" : "Subscribe"}
          </a>
        </div>
      </section>
    </>
  );
}

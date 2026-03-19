import Link from "next/link";
import { Marquee } from "@/components/animation/Marquee";

interface FooterProps {
  locale: string;
}

const domains = [
  "buydatacenters.ca", "datacenterbroker.ca", "datacenterproperty.ca", "datacentersforsale.ca", "mtldatacenter.com",
  "commercialrealestatemtl.ca", "mtlcommercialrealestate.com", "commercialmtl.com", "officemontreal.ca",
  "retailmontreal.ca", "retailmontreal.com", "retailpropertymontreal.ca", "retailpropertymtl.ca", "retailspacemontreal.com",
  "immobilierindustriel.ca", "immobilierindustriel.com", "immobilierindustrielmontreal.com", "immeubleindustriel.com",
  "industrialrealestatemontreal.ca", "mtlindustrial.ca", "mtlindustrial.com",
  "forsalemtl.ca", "forsalemtl.com", "buyrealestatemtl.com", "montrealre.ca",
  "landforsalemontreal.ca", "landforsalemontreal.com", "residentialmtl.com", "quebecre.com",
  "loftforrent.ca", "loftplateau.ca", "loftplateau.com", "condoplateau.ca",
  "penthouseavendre.ca", "penthousemontreal.com", "penthousemtl.ca",
  "mtlpresales.ca", "presalere.ca", "presalesmontreal.ca", "presalemontreal.com", "presalemtl.com", "mtlpreconstruction.com",
];

export default function Footer({ locale }: FooterProps) {
  const isFr = locale === "fr-ca";

  const navLinks = [
    { label: isFr ? "Accueil" : "Home", href: `/${locale}` },
    { label: isFr ? "Immobilier" : "Real Estate", href: `/${locale}/real-estate` },
    { label: "Services", href: `/${locale}/services` },
    { label: isFr ? "À Propos" : "About", href: `/${locale}/about` },
  ];

  const moreLinks = [
    { label: isFr ? "Studio" : "Art", href: `/${locale}/studio` },
    { label: isFr ? "Outils" : "Tools", href: `/${locale}/tools` },
    { label: isFr ? "Blogue" : "News", href: `/${locale}/blog` },
    { label: isFr ? "Prévente" : "Pre-Sale", href: `/${locale}/presale` },
  ];

  const platformLinks = [
    { label: "ALouerMTL.com", href: "https://alouermtl.com" },
    { label: "ForSaleMTL.com", href: "https://forsalemtl.com" },
    { label: "AgentMTL.ca", href: "https://agentmtl.ca" },
    { label: "Presalepedia.com", href: "https://presalepedia.com" },
    { label: "aimmo.ca", href: "https://aimmo.ca" },
  ];

  return (
    <footer
      id="global-footer"
      style={{ backgroundColor: "#0e1011", borderTop: "1px solid rgba(236,234,229,0.06)" }}
      className="w-full"
    >
      {/* Domain marquee */}
      <Marquee
        items={domains}
        speed={40}
        separator=" · "
        className="py-4 text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-20 border-b border-[rgba(236,234,229,0.05)]"
      />

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Top: Logo + CTA */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span style={{ fontFamily: "var(--font-barlow), 'Barlow', sans-serif", fontWeight: 900, fontSize: 'clamp(3.5rem, 9vw, 8rem)', letterSpacing: '-0.01em', lineHeight: 1, color: 'var(--color-cream)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>SOARES</span>
            <p
              style={{ color: "#eceae5" }}
              className="text-sm tracking-widest uppercase opacity-40 max-w-xs"
            >
              {isFr
                ? "Services Immobiliers à Montréal"
                : "Montreal Real Estate Services"}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            style={{ backgroundColor: "#eceae5", color: "#0e1011" }}
            className="self-start md:self-auto text-xs tracking-[0.22em] uppercase font-bold px-8 py-4 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {isFr ? "Discutons" : "Let's Talk"}
          </Link>
        </div>

        {/* 4-column link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 mb-16">
          {/* Navigation */}
          <div>
            <p
              style={{ color: "#eceae5" }}
              className="text-xs tracking-[0.3em] uppercase opacity-35 mb-5"
            >
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "#eceae5" }}
                    className="text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <p
              style={{ color: "#eceae5" }}
              className="text-xs tracking-[0.3em] uppercase opacity-35 mb-5"
            >
              {isFr ? "Explorer" : "Explore"}
            </p>
            <ul className="flex flex-col gap-3">
              {moreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{ color: "#eceae5" }}
                    className="text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <p
              style={{ color: "#eceae5" }}
              className="text-xs tracking-[0.3em] uppercase opacity-35 mb-5"
            >
              {isFr ? "Plateformes" : "Platforms"}
            </p>
            <ul className="flex flex-col gap-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#eceae5" }}
                    className="text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{ color: "#eceae5" }}
              className="text-xs tracking-[0.3em] uppercase opacity-35 mb-5"
            >
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+15145198177"
                  style={{ color: "#eceae5" }}
                  className="text-sm tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                >
                  514 519-8177
                </a>
              </li>
              <li>
                <a
                  href="mailto:JeremySoares@icloud.com"
                  style={{ color: "#eceae5" }}
                  className="text-sm tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                >
                  JeremySoares@icloud.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jeremysoaresrealestate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#eceae5" }}
                  className="text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: "1px solid rgba(236,234,229,0.06)", color: "#eceae5" }}
          className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6">
            <p className="text-xs tracking-wide opacity-40">
              JeremySoares.com &middot; Courtier Immobilier &middot; Montréal, QC
            </p>
            {/* OACIQ badge */}
            <span className="text-[0.5rem] tracking-[0.22em] uppercase opacity-30 border border-[rgba(236,234,229,0.15)] px-3 py-1">
              OACIQ H2731
            </span>
          </div>
          <p className="text-xs tracking-widest uppercase opacity-25">
            &copy; {new Date().getFullYear()} Jeremy Soares.{" "}
            {isFr ? "Tous droits réservés." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}

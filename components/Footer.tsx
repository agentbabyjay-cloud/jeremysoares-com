import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const isFr = locale === "fr-ca";

  return (
    <footer
      style={{ backgroundColor: "#0e1011", borderTop: "1px solid #1e2428" }}
      className="w-full"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Top: Logo + tagline */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Image
              src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba28554a070e692e441344_logo-inverse.svg"
              alt="Jeremy Soares"
              width={160}
              height={42}
              style={{ height: "auto", marginBottom: "1.25rem" }}
            />
            <p
              style={{ color: "#eceae5" }}
              className="text-sm tracking-widest uppercase opacity-40 max-w-xs"
            >
              {isFr
                ? "Services Immobiliers à Montréal"
                : "Montreal Real Estate Services"}
            </p>
          </div>
          <a
            href="https://form.jeremysoares.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#eceae5", color: "#0e1011" }}
            className="self-start md:self-auto text-xs tracking-[0.22em] uppercase font-bold px-8 py-4 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {isFr ? "Discutons" : "Let's Talk"}
          </a>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
          {/* Navigation */}
          <div>
            <p
              style={{ color: "#eceae5" }}
              className="text-xs tracking-[0.3em] uppercase opacity-35 mb-5"
            >
              {isFr ? "Navigation" : "Navigation"}
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: isFr ? "Accueil" : "Home", href: `/${locale}` },
                { label: isFr ? "Services" : "Services", href: `/${locale}/service` },
                { label: isFr ? "À Propos" : "About", href: `/${locale}/about` },
                { label: isFr ? "Contact" : "Contact", href: `/${locale}/contact` },
              ].map((link) => (
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
              {[
                { label: "ALouerMTL.com", href: "https://alouermtl.com" },
                { label: "ForSaleMTL.com", href: "https://forsalemtl.com" },
                { label: "AgentMTL.ca", href: "https://agentmtl.ca" },
                { label: "Presalepedia.com", href: "https://presalepedia.com" },
              ].map((link) => (
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
              {isFr ? "Contact" : "Contact"}
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
          style={{ borderTop: "1px solid #1e2428", color: "#eceae5" }}
          className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <p className="text-xs tracking-wide opacity-40">
            JeremySoares.com &nbsp;&middot;&nbsp; Courtier Immobilier &nbsp;&middot;&nbsp; Montréal, QC
          </p>
          <p className="text-xs tracking-widest uppercase opacity-25">
            &copy; {new Date().getFullYear()} Jeremy Soares. {isFr ? "Tous droits réservés." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}

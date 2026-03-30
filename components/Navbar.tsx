"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrambleText } from "@/components/animation/ScrambleText";

interface NavbarProps {
  locale: string;
}

const FONT_BARLOW = "var(--font-barlow), 'Barlow', sans-serif";
const FONT_DM_SANS = "var(--font-dm-sans), 'DM Sans', sans-serif";

export default function Navbar({ locale }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFr = locale === "fr-ca";

  const enPath = pathname.replace(`/${locale}`, "/en-ca");
  const frPath = pathname.replace(`/${locale}`, "/fr-ca");

  // Per-section dropdown content
  const sections: Record<string, { label: string; cols: { heading: string; links: { label: string; href: string; external?: boolean; scramble?: boolean }[] }[] }> = {
    realestate: {
      label: isFr ? "Immobilier" : "Real Estate",
      cols: [
        {
          heading: isFr ? "Résidentiel" : "Residential",
          links: [
            { label: isFr ? "Acheter" : "Buy a Home", href: `/${locale}/buy` },
            { label: isFr ? "Vendre" : "Sell a Property", href: `/${locale}/sell` },
            { label: isFr ? "Louer" : "Rent", href: `/${locale}/rent` },
            { label: isFr ? "Préconstruction" : "Pre-Construction", href: `/${locale}/presale` },
            { label: isFr ? "Condos & Lofts" : "Condos & Lofts", href: `/${locale}/lofts-montreal` },
            { label: isFr ? "Penthouses" : "Penthouses", href: `/${locale}/penthouses-montreal` },
          ],
        },
        {
          heading: isFr ? "Commercial & Industriel" : "Commercial & Industrial",
          links: [
            { label: isFr ? "Immobilier Commercial" : "Commercial Real Estate", href: `/${locale}/commercial-real-estate-montreal` },
            { label: isFr ? "Immobilier Industriel" : "Industrial Real Estate", href: `/${locale}/industrial-real-estate-montreal` },
            { label: isFr ? "Espaces de Bureau" : "Office Space", href: `/${locale}/office-space-montreal` },
            { label: isFr ? "Espaces Commerciaux" : "Retail Space", href: `/${locale}/retail-space-montreal` },
            { label: isFr ? "Terrain à Vendre" : "Land for Sale", href: `/${locale}/land-for-sale-montreal` },
            { label: isFr ? "Centres de Données" : "Data Centers", href: `/${locale}/data-center-real-estate-canada`, scramble: true },
          ],
        },
        {
          heading: isFr ? "Explorer" : "Explore",
          links: [
            { label: isFr ? "Quartiers" : "Neighborhoods", href: `/${locale}/neighborhoods` },
            { label: "Griffintown", href: `/${locale}/neighborhoods/griffintown` },
            { label: "Plateau Mont-Royal", href: `/${locale}/neighborhoods/plateau-mont-royal` },
            { label: "Old Montreal", href: `/${locale}/neighborhoods/old-montreal` },
            { label: isFr ? "Rapports de Marché" : "Market Reports", href: `/${locale}/market-reports` },
            { label: isFr ? "Voir le Portfolio" : "View Portfolio", href: `/${locale}/real-estate` },
          ],
        },
      ],
    },
    services: {
      label: "Services",
      cols: [
        {
          heading: isFr ? "Achat & Vente" : "Buy & Sell",
          links: [
            { label: isFr ? "Conseil Préconstruction" : "Pre-Construction Advisory", href: `/${locale}/services/pre-construction` },
            { label: isFr ? "Stratégie d'Investissement" : "Investment Strategy", href: `/${locale}/services/investment-strategy` },
            { label: isFr ? "Relocalisation" : "Relocation Services", href: `/${locale}/services/relocation` },
          ],
        },
        {
          heading: isFr ? "Marketing & Commercial" : "Marketing & Commercial",
          links: [
            { label: isFr ? "Marketing Immobilier" : "Property Marketing", href: `/${locale}/services/property-marketing` },
            { label: isFr ? "Location Commerciale" : "Commercial Leasing", href: `/${locale}/services/commercial-leasing` },
            { label: isFr ? "Marketing Prévente Promoteur" : "Developer Pre-Sale Marketing", href: `/${locale}/presale` },
          ],
        },
        {
          heading: isFr ? "Agence" : "Agency",
          links: [
            { label: isFr ? "Branding & Identité" : "Branding & Identity", href: `/${locale}/agency` },
            { label: isFr ? "Sites Web IA" : "AI Website Building", href: `/${locale}/studio/web`, scramble: true },
            { label: isFr ? "Automatisation Marketing" : "Marketing Automation", href: `/${locale}/agency`, scramble: true },
            { label: isFr ? "Solutions OpenClaw" : "OpenClaw AI Agents", href: `/${locale}/studio/web#openclaw`, scramble: true },
            { label: isFr ? "Tous les services" : "All Services", href: `/${locale}/services` },
          ],
        },
      ],
    },
    tools: {
      label: isFr ? "Outils" : "Tools",
      cols: [
        {
          heading: isFr ? "Calculatrices" : "Calculators",
          links: [
            { label: isFr ? "Calculatrice Hypothécaire" : "Mortgage Calculator", href: "https://tools.jeremysoares.com/en/residential/mortgage-calculator", external: true },
            { label: isFr ? "Taxe de Bienvenue" : "Land Transfer Tax", href: "https://tools.jeremysoares.com/en/residential/land-transfer-tax", external: true },
            { label: isFr ? "Test de Résistance" : "Stress Test", href: "https://tools.jeremysoares.com/en/residential/stress-test", external: true },
            { label: isFr ? "Louer ou Acheter" : "Rent vs. Buy", href: "https://tools.jeremysoares.com/en/rent-vs-buy", external: true },
            { label: isFr ? "Tous les outils (40)" : "All Tools (40)", href: `/${locale}/tools` },
          ],
        },
        {
          heading: isFr ? "Investissement" : "Investment",
          links: [
            { label: isFr ? "Taux de Cap" : "Cap Rate", href: "https://tools.jeremysoares.com/en/residential/cap-rate", external: true },
            { label: isFr ? "Flux de Trésorerie" : "Cash Flow", href: "https://tools.jeremysoares.com/en/residential/cash-flow", external: true },
            { label: isFr ? "Rendement Locatif" : "Rental Yield", href: "https://tools.jeremysoares.com/en/residential/rental-yield", external: true },
            { label: "ROI Calculator", href: "https://tools.jeremysoares.com/en/residential/roi-calculator", external: true },
          ],
        },
        {
          heading: isFr ? "Plateformes" : "Platforms",
          links: [
            { label: "aimmo — AI Staging", href: "https://aimmo.ca", external: true, scramble: true },
            { label: isFr ? "Guides Immobiliers" : "Real Estate Guides", href: `/${locale}/guides` },
            { label: isFr ? "Rapports de Marché" : "Market Reports", href: `/${locale}/market-reports` },
          ],
        },
      ],
    },
    studio: {
      label: "Studio",
      cols: [
        {
          heading: isFr ? "Mise en Scène IA" : "AI Staging",
          links: [
            { label: isFr ? "aimmo — Mise en Scène Virtuelle" : "aimmo — Virtual Staging", href: "https://aimmo.ca", external: true, scramble: true },
            { label: isFr ? "Avant / Après" : "Before / After", href: "https://aimmo.ca", external: true },
            { label: isFr ? "Pour les Agents" : "For Agents", href: `/${locale}/services/property-marketing` },
            { label: isFr ? "Pour les Promoteurs" : "For Developers", href: `/${locale}/presale` },
          ],
        },
        {
          heading: isFr ? "Art Originel" : "Original Art",
          links: [
            { label: isFr ? "Toutes les Œuvres" : "All Artworks", href: `/${locale}/studio` },
            { label: "Alleyway Series", href: `/${locale}/studio/alleyway-1` },
            { label: "Nameless Faces", href: `/${locale}/studio/nameless-face-1` },
            { label: "Abstract Square", href: `/${locale}/studio/abstract-square` },
            { label: isFr ? "Demander une Œuvre" : "Inquire About a Piece", href: `/${locale}/contact` },
          ],
        },
        {
          heading: isFr ? "Web & Technologie" : "Web & Technology",
          links: [
            { label: isFr ? "Systèmes & Sites Web" : "Systems & Websites", href: `/${locale}/studio/web` },
            { label: isFr ? "Sites Web pour PME" : "Websites for Small Business", href: `/${locale}/services/website-building`, scramble: true },
            { label: isFr ? "OpenClaw — IA" : "OpenClaw — AI", href: `/${locale}/studio/web#openclaw`, scramble: true },
            { label: isFr ? "Démarrer un Projet" : "Start a Project", href: `/${locale}/contact` },
          ],
        },
      ],
    },
    about: {
      label: isFr ? "À Propos" : "About",
      cols: [
        {
          heading: "Jeremy Soares",
          links: [
            { label: isFr ? "Notre Histoire" : "Our Story", href: `/${locale}/about` },
            { label: isFr ? "Agence Soares" : "Soares Agency", href: `/${locale}/agency` },
            { label: "OACIQ H2731", href: "https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731", external: true },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/jeremysoaresrealestate/", external: true },
          ],
        },
        {
          heading: isFr ? "Contenu" : "Content",
          links: [
            { label: isFr ? "Blogue" : "News & Blog", href: `/${locale}/blog` },
            { label: isFr ? "Guides Immobiliers" : "Real Estate Guides", href: `/${locale}/guides` },
            { label: isFr ? "Rapports de Marché" : "Market Reports", href: `/${locale}/market-reports` },
          ],
        },
        {
          heading: "Contact",
          links: [
            { label: isFr ? "Nous Contacter" : "Get in Touch", href: `/${locale}/contact` },
            { label: "514 519-8177", href: "tel:+15145198177" },
            { label: "JeremySoares@icloud.com", href: "mailto:JeremySoares@icloud.com" },
          ],
        },
      ],
    },
  };

  const sectionOrder = ["realestate", "services", "tools", "studio", "about"];
  const isOpen = activeSection !== null;
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.to(nav, { y: 0, duration: 0.8, delay: 2.4, ease: "power3.out" });
  }, []);

  // Scroll-based hide/show
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let lastY = 0;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 200 && y > lastY) {
          gsap.to(nav, { y: "-100%", duration: 0.4, ease: "power2.in", overwrite: true });
          setActiveSection(null);
        } else {
          gsap.to(nav, { y: 0, duration: 0.5, ease: "power3.out", overwrite: true });
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate panel
  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    if (isOpen) {
      gsap.set(panel, { display: "block" });
      gsap.fromTo(panel,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power4.out" }
      );
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35 });
      gsap.fromTo(".nav-panel-link",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.03, delay: 0.12, ease: "power3.out" }
      );
    } else {
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => { gsap.set(panel, { display: "none" }); },
      });
      gsap.to(overlay, { opacity: 0, duration: 0.25 });
    }
  }, [isOpen, activeSection]);

  // Close on route change
  useEffect(() => {
    setActiveSection(null);
    setMobileSectionOpen(null);
  }, [pathname]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveSection(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen]);

  const toggleSection = useCallback((key: string) => {
    setActiveSection((prev) => (prev === key ? null : key));
  }, []);

  const currentSection = (activeSection && activeSection !== "mobile") ? sections[activeSection] : null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => setActiveSection(null)}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(14,16,17,0.5)",
          zIndex: 998, opacity: 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        aria-hidden="true"
      />

      {/* Orange dropdown panel */}
      <div
        ref={panelRef}
        style={{
          display: "none",
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 999,
          background: "#f55f00",
          clipPath: "inset(0 0 100% 0)",
          paddingTop: "clamp(4.5rem, 9vh, 6.5rem)",
          paddingBottom: "clamp(2rem, 4vh, 3.5rem)",
          paddingLeft: "clamp(1.25rem, 4vw, 4rem)",
          paddingRight: "clamp(1.25rem, 4vw, 4rem)",
          overflowY: "auto",
          maxHeight: "100dvh",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }} className="nav-panel-scroll">
          {/* Mobile: all sections stacked */}
          {activeSection === "mobile" && (
            <div className="nav-mobile-sections">
              {sectionOrder.map((key) => {
                const sec = sections[key];
                const isExpanded = mobileSectionOpen === key;
                return (
                  <div key={key} style={{ borderBottom: "1px solid rgba(14,16,17,0.15)" }}>
                    <button
                      onClick={() => setMobileSectionOpen((prev) => (prev === key ? null : key))}
                      style={{
                        width: "100%", background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "1.1rem 0", minHeight: "52px",
                        fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: "1.4rem",
                        textTransform: "uppercase", letterSpacing: "0.01em", color: "#0e1011",
                      }}
                    >
                      {sec.label}
                      <span style={{ fontSize: "1.2rem", fontWeight: 400, transition: "transform 0.25s", display: "inline-block", transform: isExpanded ? "rotate(45deg)" : "none" }}>+</span>
                    </button>
                    {isExpanded && (
                      <div style={{ paddingBottom: "1rem" }}>
                        {sec.cols.map((col) => (
                          <div key={col.heading} style={{ marginBottom: "1rem" }}>
                            <p style={{ fontFamily: FONT_DM_SANS, fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(14,16,17,0.4)", marginBottom: "0.5rem", marginTop: 0 }}>
                              {col.heading}
                            </p>
                            {col.links.map((link) =>
                              link.external ? (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                                  style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: FONT_DM_SANS, fontSize: "0.875rem", color: "#0e1011", textDecoration: "none", padding: "0.5rem 0", opacity: 0.75 }}>
                                  {link.scramble ? <ScrambleText text={link.label} trigger="hover" duration={500} style={{ color: "#0e1011" }} /> : link.label}
                                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="#0e1011" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: 0.45, flexShrink: 0 }}><path d="M1 9L9 1M9 1H3M9 1V7"/></svg>
                                </a>
                              ) : (
                                <Link key={link.label} href={link.href}
                                  style={{ display: "block", fontFamily: FONT_DM_SANS, fontSize: "0.875rem", color: "#0e1011", textDecoration: "none", padding: "0.5rem 0", opacity: 0.75 }}>
                                  {link.scramble ? <ScrambleText text={link.label} trigger="hover" duration={500} style={{ color: "#0e1011" }} /> : link.label}
                                </Link>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Desktop: per-section columns */}
          {currentSection && activeSection !== "mobile" && (
            <>
              <div className="nav-panel-grid" style={{ gap: "clamp(1.5rem, 3vw, 3rem)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                {currentSection.cols.map((col) => (
                  <div key={col.heading}>
                    <p className="nav-panel-link" style={{ fontFamily: FONT_DM_SANS, fontSize: "9px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(14,16,17,0.4)", marginBottom: "1rem" }}>
                      {col.heading}
                    </p>
                    {col.links.map((link) =>
                      link.external ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-panel-link"
                          style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: "clamp(1rem, 1.6vw, 1.35rem)", textTransform: "uppercase", letterSpacing: "0.01em", color: "#0e1011", textDecoration: "none", marginBottom: "0.5rem", opacity: 0.82, transition: "opacity 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.82"; }}
                        >
                          {link.scramble ? <ScrambleText text={link.label} trigger="hover" duration={500} style={{ color: "#0e1011" }} /> : link.label}
                          <svg width="11" height="11" viewBox="0 0 10 10" fill="none" stroke="#0e1011" strokeWidth="1.8" strokeLinecap="round" style={{ opacity: 0.35, flexShrink: 0 }}><path d="M1 9L9 1M9 1H3M9 1V7"/></svg>
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="nav-panel-link"
                          style={{ display: "block", fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: "clamp(1rem, 1.6vw, 1.35rem)", textTransform: "uppercase", letterSpacing: "0.01em", color: "#0e1011", textDecoration: "none", marginBottom: "0.5rem", opacity: 0.82, transition: "opacity 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.82"; }}
                        >
                          {link.scramble ? <ScrambleText text={link.label} trigger="hover" duration={500} style={{ color: "#0e1011" }} /> : link.label}
                        </Link>
                      )
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Bottom bar */}
          <div style={{ marginTop: "clamp(1.5rem, 3vh, 2.5rem)", paddingTop: "1rem", borderTop: "1px solid rgba(14,16,17,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <span style={{ fontFamily: FONT_DM_SANS, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(14,16,17,0.45)" }}>
              OACIQ H2731 · 514 519-8177
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[["EN", enPath, "en-ca"], ["FR", frPath, "fr-ca"]].map(([label, href, loc]) => (
                <Link key={label} href={href} style={{ fontFamily: FONT_DM_SANS, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: locale === loc ? "#0e1011" : "rgba(14,16,17,0.4)", textDecoration: "none", fontWeight: 700 }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav
        ref={navRef}
        id="mainNav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: "clamp(1.25rem, 2vh, 1.75rem) 0",
          background: isOpen ? "transparent" : "linear-gradient(to bottom, rgba(14,16,17,0.92) 0%, transparent 100%)",
          transform: "translateY(-100%)",
          transition: "background 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(2rem, 4vw, 4rem)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link
            href={`/${locale}`}
            style={{ fontFamily: FONT_BARLOW, fontWeight: 900, fontSize: "clamp(18px, 4vw, 22px)", letterSpacing: "0.14em", textTransform: "uppercase", color: isOpen ? "#0e1011" : "var(--color-cream)", textDecoration: "none", transition: "color 0.3s ease", position: "relative", zIndex: 1001, whiteSpace: "nowrap" }}
          >
            SOARES
          </Link>

          {/* Desktop nav buttons */}
          <ul style={{ alignItems: "center", gap: "clamp(1rem, 2.5vw, 2rem)", listStyle: "none", margin: 0, padding: 0 }} className="hidden lg:flex">
            {sectionOrder.map((key) => (
              <li key={key}>
                <button
                  onClick={() => toggleSection(key)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: FONT_DM_SANS, fontWeight: 700, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
                    color: isOpen ? "#0e1011" : "var(--color-cream)",
                    opacity: activeSection === key ? 1 : isOpen ? 0.5 : 0.5,
                    padding: "4px 0",
                    transition: "opacity 0.2s, color 0.3s",
                    borderBottom: activeSection === key ? `1.5px solid ${isOpen ? "#0e1011" : "var(--color-cream)"}` : "1.5px solid transparent",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = activeSection === key ? "1" : "0.5"; }}
                >
                  {sections[key].label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Lang */}
            <div style={{ gap: "0.4rem", alignItems: "center" }} className="hidden lg:flex">
              {[["EN", enPath, "en-ca"], ["FR", frPath, "fr-ca"]].map(([label, href, loc]) => (
                <Link key={label} href={href} style={{ fontFamily: FONT_DM_SANS, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: isOpen ? "#0e1011" : "var(--color-cream)", opacity: locale === loc ? 1 : 0.3, textDecoration: "none", transition: "color 0.3s, opacity 0.2s" }}>
                  {label}
                </Link>
              ))}
            </div>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jeremysoaresrealestate/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ opacity: 0.4, transition: "opacity 0.25s" }} onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.4"; }} className="hidden lg:block">
              <svg width="15" height="15" viewBox="0 0 24 24" fill={isOpen ? "#0e1011" : "var(--color-cream)"}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Menu toggle */}
            <button
              onClick={() => {
                if (isOpen) {
                  setActiveSection(null);
                  setMobileSectionOpen(null);
                } else {
                  setActiveSection(isMobile ? "mobile" : "realestate");
                }
              }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px", position: "relative", zIndex: 1001 }}
            >
              {[
                { transform: isOpen ? "translateY(6.5px) rotate(45deg)" : "none" },
                { opacity: isOpen ? 0 : 1 },
                { transform: isOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" },
              ].map((style, i) => (
                <span key={i} style={{ display: "block", width: "22px", height: "1.5px", background: isOpen ? "#0e1011" : "var(--color-cream)", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s", ...style }} />
              ))}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

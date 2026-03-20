"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface NavbarProps {
  locale: string;
}

const FONT_BARLOW = "var(--font-barlow), 'Barlow', sans-serif";
const FONT_DM_SANS = "var(--font-dm-sans), 'DM Sans', sans-serif";

export default function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFr = locale === "fr-ca";

  // Preserve path when switching locale
  const enPath = pathname.replace(`/${locale}`, "/en-ca");
  const frPath = pathname.replace(`/${locale}`, "/fr-ca");

  const navLinks = [
    {
      label: isFr ? "Immobilier" : "Real Estate",
      href: `/${locale}/real-estate`,
      sub: [
        { label: isFr ? "Propriétés actives" : "Active Listings", href: `/${locale}/real-estate` },
        { label: isFr ? "Préconstruction" : "Pre-Construction", href: `/${locale}/presale` },
        { label: isFr ? "Commercial" : "Commercial", href: `/${locale}/commercial-real-estate-montreal` },
        { label: isFr ? "Industriel" : "Industrial", href: `/${locale}/industrial-real-estate-montreal` },
        { label: isFr ? "Quartiers" : "Neighborhoods", href: `/${locale}/neighborhoods` },
      ],
    },
    {
      label: "Services",
      href: `/${locale}/services`,
      sub: [
        { label: isFr ? "Achat & Vente" : "Buy & Sell", href: `/${locale}/services` },
        { label: isFr ? "Placement Immobilier" : "Investment Strategy", href: `/${locale}/services` },
        { label: isFr ? "Marketing Immobilier" : "Property Marketing", href: `/${locale}/services` },
        { label: isFr ? "Location Commerciale" : "Commercial Leasing", href: `/${locale}/services` },
        { label: isFr ? "Relocalisation" : "Relocation", href: `/${locale}/services` },
      ],
    },
    {
      label: isFr ? "Outils" : "Tools",
      href: `/${locale}/tools`,
      sub: [
        { label: "aimmo — AI Staging", href: "https://aimmo.ca", external: true },
        { label: isFr ? "Calculateur Hypothécaire" : "Mortgage Calculator", href: `/${locale}/tools` },
        { label: isFr ? "Rapports de Marché" : "Market Reports", href: `/${locale}/market-reports` },
        { label: isFr ? "Guides" : "Guides", href: `/${locale}/guides` },
      ],
    },
    {
      label: isFr ? "À Propos" : "About",
      href: `/${locale}/about`,
      sub: [
        { label: isFr ? "Notre Histoire" : "Our Story", href: `/${locale}/about` },
        { label: isFr ? "Studio / Art" : "Studio / Art", href: `/${locale}/studio` },
        { label: isFr ? "Actualités" : "News", href: `/${locale}/blog` },
        { label: "Contact", href: `/${locale}/contact` },
      ],
    },
  ];

  // GSAP entrance after preloader
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
          if (menuOpen) setMenuOpen(false);
        } else {
          gsap.to(nav, { y: 0, duration: 0.5, ease: "power3.out", overwrite: true });
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Animate panel open/close
  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    if (menuOpen) {
      gsap.set(panel, { display: "flex" });
      gsap.fromTo(panel,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.out" }
      );
      gsap.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      // Stagger the links in
      gsap.fromTo(".nav-panel-link",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, delay: 0.15, ease: "power3.out" }
      );
    } else {
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  }, [menuOpen]);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(14,16,17,0.5)",
          zIndex: 998,
          opacity: 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden="true"
      />

      {/* Orange square dropdown panel */}
      <div
        ref={panelRef}
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "#e8762a",
          clipPath: "inset(0 0 100% 0)",
          paddingTop: "clamp(5rem, 10vh, 7rem)",
          paddingBottom: "clamp(2.5rem, 5vh, 4rem)",
          paddingLeft: "clamp(2rem, 4vw, 4rem)",
          paddingRight: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          {/* 4-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(1.5rem, 3vw, 3rem)",
            }}
          >
            {navLinks.map((section) => (
              <div key={section.label}>
                <p
                  className="nav-panel-link"
                  style={{
                    fontFamily: FONT_DM_SANS,
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(14,16,17,0.45)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {section.label}
                </p>
                {section.sub.map((link) => (
                  "external" in link && link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-panel-link"
                      style={{
                        display: "block",
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.01em",
                        color: "#0e1011",
                        textDecoration: "none",
                        marginBottom: "0.6rem",
                        opacity: 0.85,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="nav-panel-link"
                      style={{
                        display: "block",
                        fontFamily: FONT_BARLOW,
                        fontWeight: 900,
                        fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.01em",
                        color: "#0e1011",
                        textDecoration: "none",
                        marginBottom: "0.6rem",
                        opacity: 0.85,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              marginTop: "clamp(1.5rem, 3vh, 2.5rem)",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(14,16,17,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: FONT_DM_SANS,
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(14,16,17,0.5)",
              }}
            >
              OACIQ H2731 · 514 519-8177 · JeremySoares@icloud.com
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link
                href={enPath}
                style={{
                  fontFamily: FONT_DM_SANS,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: locale === "en-ca" ? "#0e1011" : "rgba(14,16,17,0.4)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >EN</Link>
              <Link
                href={frPath}
                style={{
                  fontFamily: FONT_DM_SANS,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: locale === "fr-ca" ? "#0e1011" : "rgba(14,16,17,0.4)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >FR</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav
        ref={navRef}
        id="mainNav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "clamp(1.25rem, 2vh, 1.75rem) 0",
          background: menuOpen
            ? "transparent"
            : "linear-gradient(to bottom, rgba(14,16,17,0.92) 0%, transparent 100%)",
          transform: "translateY(-100%)",
          transition: "background 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 clamp(2rem, 4vw, 4rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href={`/${locale}`}
            style={{
              fontFamily: FONT_BARLOW,
              fontWeight: 900,
              fontSize: "22px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: menuOpen ? "#0e1011" : "var(--color-cream)",
              textDecoration: "none",
              transition: "color 0.3s ease",
              position: "relative",
              zIndex: 1001,
            }}
          >
            SOARES
          </Link>

          {/* Desktop center links */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: FONT_DM_SANS,
                    fontWeight: 600,
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: menuOpen ? "#0e1011" : "var(--color-cream)",
                    opacity: menuOpen ? 0.6 : 0.5,
                    padding: 0,
                    transition: "opacity 0.2s, color 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = menuOpen ? "0.6" : "0.5"; }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Lang (desktop) */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }} className="hidden md:flex">
              <Link
                href={enPath}
                style={{
                  fontFamily: FONT_DM_SANS,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: menuOpen ? "#0e1011" : "var(--color-cream)",
                  opacity: locale === "en-ca" ? 1 : 0.3,
                  textDecoration: "none",
                  transition: "color 0.3s, opacity 0.2s",
                }}
              >EN</Link>
              <span style={{ color: menuOpen ? "rgba(14,16,17,0.2)" : "rgba(236,234,229,0.2)", transition: "color 0.3s" }}>/</span>
              <Link
                href={frPath}
                style={{
                  fontFamily: FONT_DM_SANS,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: menuOpen ? "#0e1011" : "var(--color-cream)",
                  opacity: locale === "fr-ca" ? 1 : 0.3,
                  textDecoration: "none",
                  transition: "color 0.3s, opacity 0.2s",
                }}
              >FR</Link>
            </div>

            {/* LinkedIn (desktop) */}
            <a
              href="https://www.linkedin.com/in/jeremysoaresrealestate/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ opacity: 0.4, transition: "opacity 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.4"; }}
              className="hidden md:block"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill={menuOpen ? "#0e1011" : "var(--color-cream)"}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Menu toggle — morphs to X */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                position: "relative",
                zIndex: 1001,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: menuOpen ? "#0e1011" : "var(--color-cream)",
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s",
                  transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: menuOpen ? "#0e1011" : "var(--color-cream)",
                  transition: "opacity 0.25s",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: menuOpen ? "#0e1011" : "var(--color-cream)",
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                  transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

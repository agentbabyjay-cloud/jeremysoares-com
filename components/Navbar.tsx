"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const isFr = locale === "fr-ca";

  const links = [
    { label: "Real Estate", href: `/${locale}/real-estate` },
    { label: "Services", href: `/${locale}/services` },
    { label: isFr ? "Outils" : "Tools", href: `/${locale}/tools` },
    { label: isFr ? "À Propos" : "About", href: `/${locale}/about` },
    { label: isFr ? "Blogue" : "News", href: `/${locale}/blog` },
    { label: isFr ? "Studio" : "Art", href: `/${locale}/studio` },
  ];

  const pathname = usePathname();
  // Preserve current path when switching locale
  const enPath = pathname.replace(`/${locale}`, "/en-ca");
  const frPath = pathname.replace(`/${locale}`, "/fr-ca");

  // GSAP entrance + scroll-based hide/show
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Slide in after preloader (~2.4s)
    gsap.to(nav, {
      y: 0,
      duration: 0.8,
      delay: 2.4,
      ease: "power3.out",
    });

    let lastY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 200 && y > lastY) {
          gsap.to(nav, { y: "-100%", duration: 0.4, ease: "power2.in", overwrite: true });
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

  // Close mobile menu on escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <>
      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col justify-center items-center gap-10 transition-opacity duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(14,16,17,0.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-7 right-[clamp(2rem,4vw,4rem)] text-[10px] tracking-[0.22em] uppercase font-bold opacity-35 hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
          style={{ color: "var(--color-cream)" }}
        >
          ✕ Close
        </button>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-[var(--font-barlow)] font-black text-[clamp(2.5rem,8vw,4rem)] tracking-[0.08em] uppercase opacity-70 hover:opacity-100 hover:tracking-[0.12em] transition-all duration-300"
            style={{ color: "var(--color-cream)", fontFamily: "var(--font-barlow), 'Barlow', sans-serif", textDecoration: "none" }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={`/${locale}/contact`}
          onClick={() => setMenuOpen(false)}
          className="text-[1.2rem] tracking-[0.18em] opacity-40"
          style={{ color: "var(--color-cream)", fontFamily: "var(--font-barlow), 'Barlow', sans-serif", textDecoration: "none" }}
        >
          {isFr ? "Discutons" : "Let\u2019s Talk"}
        </Link>
      </div>

      {/* Nav bar */}
      <nav
        id="mainNav"
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] py-7"
        style={{
          background: "linear-gradient(to bottom, rgba(14,16,17,0.9) 0%, transparent 100%)",
          transform: "translateY(-100%)",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between" style={{ padding: "0 clamp(2rem,4vw,4rem)" }}>
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-black text-[22px] tracking-[0.14em] uppercase no-underline"
            style={{ color: "var(--color-cream)", fontFamily: "var(--font-barlow), 'Barlow', sans-serif" }}
          >
            SOARES
          </Link>

          {/* Desktop nav items */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="relative font-semibold text-[10px] tracking-[0.22em] uppercase opacity-50 hover:opacity-100 hover:tracking-[0.28em] transition-all duration-300 no-underline group"
                  style={{ color: "var(--color-cream)" }}
                >
                  {link.label}
                  <span className="absolute bottom-[-3px] left-0 w-0 h-px group-hover:w-full transition-all duration-350" style={{ background: "var(--color-cream)", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Utility */}
          <div className="hidden md:flex items-center gap-5">
            {/* Lang toggle */}
            <div className="text-[10px] tracking-[0.22em] flex items-center gap-1.5">
              <Link
                href={enPath}
                className={`no-underline transition-opacity duration-200 ${locale === "en-ca" ? "opacity-100" : "opacity-25 hover:opacity-60"}`}
                style={{ color: "var(--color-cream)" }}
              >
                EN
              </Link>
              <span className="opacity-20" style={{ color: "var(--color-cream)" }}>/</span>
              <Link
                href={frPath}
                className={`no-underline transition-opacity duration-200 ${locale === "fr-ca" ? "opacity-100" : "opacity-25 hover:opacity-60"}`}
                style={{ color: "var(--color-cream)" }}
              >
                FR
              </Link>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jeremysoaresrealestate/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="opacity-40 hover:opacity-100 transition-opacity duration-250"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-cream)">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className="font-bold text-[10px] tracking-[0.22em] uppercase px-[22px] py-[10px] no-underline transition-all duration-300 hover:text-[var(--color-void)]"
              style={{
                color: "var(--color-cream)",
                border: "1px solid rgba(236,234,229,0.3)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-cream)";
                e.currentTarget.style.color = "var(--color-void)";
                e.currentTarget.style.borderColor = "var(--color-cream)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--color-cream)";
                e.currentTarget.style.borderColor = "rgba(236,234,229,0.3)";
              }}
            >
              {isFr ? "Discutons" : "Let\u2019s Talk"}
            </Link>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1 bg-transparent border-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-[22px] h-px transition-all duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
              style={{ background: "var(--color-cream)" }}
            />
            <span
              className={`block w-[22px] h-px transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              style={{ background: "var(--color-cream)" }}
            />
            <span
              className={`block w-[22px] h-px transition-all duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
              style={{ background: "var(--color-cream)" }}
            />
          </button>
        </div>
      </nav>
    </>
  );
}

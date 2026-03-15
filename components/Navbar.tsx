"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isFr = locale === "fr-ca";

  const links = [
    { label: isFr ? "Accueil" : "Home", href: `/${locale}` },
    { label: isFr ? "Services" : "Services", href: `/${locale}/service` },
    { label: isFr ? "À Propos" : "About", href: `/${locale}/about` },
    { label: isFr ? "Blogue" : "Blog", href: `/${locale}/blog` },
    { label: isFr ? "Contact" : "Contact", href: `/${locale}/contact` },
  ];

  const altLocale = locale === "en-ca" ? "fr-ca" : "en-ca";
  const altLabel = locale === "en-ca" ? "FR" : "EN";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.to(headerRef.current, {
      paddingTop: scrolled ? "0.5rem" : "1rem",
      paddingBottom: scrolled ? "0.5rem" : "1rem",
      duration: 0.35,
      ease: "power2.out",
    });
  }, [scrolled]);

  return (
    <header
      ref={headerRef}
      style={{
        backgroundColor: "rgba(14,16,17,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
      className="sticky top-0 z-50 w-full transition-colors"
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba28554a070e692e441344_logo-inverse.svg"
            alt="Jeremy Soares"
            width={140}
            height={36}
            priority
            style={{ height: "auto" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{ color: "#eceae5" }}
              className="text-xs tracking-[0.22em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${altLocale}`}
            style={{ color: "#eceae5" }}
            className="text-xs tracking-[0.22em] uppercase opacity-40 hover:opacity-70 transition-opacity duration-200"
          >
            {altLabel}
          </Link>
          <a
            href="https://form.jeremysoares.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#eceae5", color: "#0e1011" }}
            className="text-xs tracking-[0.22em] uppercase font-bold px-6 py-2.5 hover:opacity-90 transition-opacity duration-200"
          >
            {isFr ? "Discutons" : "Let's Talk"}
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{ backgroundColor: "#eceae5" }}
            className={`block w-6 h-0.5 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            style={{ backgroundColor: "#eceae5" }}
            className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            style={{ backgroundColor: "#eceae5" }}
            className={`block w-6 h-0.5 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          backgroundColor: "#0e1011",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          maxHeight: menuOpen ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
        className="md:hidden"
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{ color: "#eceae5" }}
              className="text-sm tracking-[0.22em] uppercase opacity-80 hover:opacity-100"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://form.jeremysoares.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#eceae5", color: "#0e1011" }}
            className="text-xs tracking-[0.22em] uppercase font-bold px-6 py-3 text-center hover:opacity-90"
          >
            {isFr ? "Discutons" : "Let's Talk"}
          </a>
          <Link
            href={`/${altLocale}`}
            style={{ color: "#eceae5" }}
            className="text-xs tracking-[0.22em] uppercase opacity-40 hover:opacity-70"
            onClick={() => setMenuOpen(false)}
          >
            {altLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isFr = locale === "fr-ca";

  const headerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLElement>(null);

  const experience = [
    {
      title: isFr ? "Courtier Immobilier Résidentiel" : "Residential Real Estate Broker",
      years: "2019 — Present",
      desc: isFr
        ? "Montréal, QC — Représentation acheteurs, vendeurs et investisseurs."
        : "Montréal, QC — Representing buyers, sellers, and investors.",
    },
    {
      title: isFr ? "Dév. d'Affaires — Condos Préventes" : "Pre-Sale Condo Business Dev.",
      years: "2017 — 2020",
      desc: isFr
        ? "Vancouver, BC — Spécialisation en préventes de condos neufs."
        : "Vancouver, BC — Specialization in pre-sale new condo developments.",
    },
    {
      title: "Soares/Saniuk Real Estate Team",
      years: "2016 — 2021",
      desc: isFr
        ? "Équipe boutique couvrant les marchés résidentiel et commercial."
        : "Boutique team covering residential and commercial markets.",
    },
    {
      title: isFr ? "Courtier Résidentiel de Luxe" : "Luxury Residential Broker",
      years: "2017 — 2019",
      desc: isFr
        ? "Vancouver, BC — Propriétés de prestige sur la côte ouest."
        : "Vancouver, BC — Prestige properties on the west coast.",
    },
    {
      title: isFr ? "Spécialiste Marketing Immobilier" : "Real Estate Marketing Specialist",
      years: "2016 — 2018",
      desc: isFr
        ? "Stratégie numérique et image de marque pour promoteurs."
        : "Digital strategy and branding for real estate developers.",
    },
    {
      title: isFr ? "Étudiant en Architecture" : "Student in Architecture",
      years: "2013 — 2016",
      desc: isFr
        ? "Formation en design et composition des espaces."
        : "Foundation in design and spatial composition.",
    },
  ];

  const platforms = [
    { label: "ALouerMTL.com", href: "https://alouermtl.com" },
    { label: "MontrealRE.ca", href: "https://montrealre.ca" },
    { label: "ForSaleMTL.com", href: "https://forsalemtl.com" },
    { label: "AgentMTL.com", href: "https://agentmtl.com" },
    { label: "Presalepedia.com", href: "https://presalepedia.com" },
  ];

  useEffect(() => {
    // Header slide-in
    if (headerRef.current) {
      const h1 = headerRef.current.querySelector("h1");
      const label = headerRef.current.querySelector(".page-label");
      gsap.fromTo(
        label,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        h1,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power4.out", delay: 0.2 }
      );
    }

    // Timeline rows stagger
    if (timelineRef.current) {
      const rows = timelineRef.current.querySelectorAll(".timeline-row");
      gsap.fromTo(
        rows,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 78%",
          },
        }
      );
    }

    // Platforms
    if (platformsRef.current) {
      const tags = platformsRef.current.querySelectorAll(".platform-tag");
      gsap.fromTo(
        tags,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: platformsRef.current,
            start: "top 82%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section
        ref={headerRef}
        style={{ backgroundColor: "#0e1011" }}
        className="px-6 pt-20 pb-0 md:pt-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-end">
            <div className="pb-16 md:pb-24">
              <p
                className="page-label section-label mb-6"
                style={{ color: "#eceae5", opacity: 0 }}
              >
                {isFr ? "À Propos" : "About"}
              </p>
              <h1
                style={{
                  color: "#eceae5",
                  fontSize: "clamp(4rem, 10vw, 12rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.88,
                  opacity: 0,
                }}
              >
                Jeremy<br />Soares
              </h1>
            </div>
            {/* Headshot */}
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                overflow: "hidden",
                alignSelf: "flex-end",
              }}
              className="hidden lg:block"
            >
              <Image
                src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba5e4e80122c482c8397a9_Jeremy-Soares-Montreal-Realtor.webp"
                alt="Jeremy Soares — Montreal Realtor"
                fill
                priority
                sizes="50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Headshot — mobile only */}
      <div
        className="lg:hidden"
        style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}
      >
        <Image
          src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba5e4e80122c482c8397a9_Jeremy-Soares-Montreal-Realtor.webp"
          alt="Jeremy Soares — Montreal Realtor"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      {/* ── BIO ──────────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#eceae5" }}
        className="px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div style={{ color: "#0e1011" }}>
              <p className="text-xl md:text-2xl font-semibold leading-relaxed mb-6">
                {isFr
                  ? "Courtier immobilier basé à Montréal avec plus d'une décennie d'expérience sur les marchés de Vancouver et de Montréal."
                  : "A Montreal-based real estate broker with over a decade of experience across the Vancouver and Montreal markets."}
              </p>
              <p className="text-base leading-relaxed opacity-65">
                {isFr
                  ? "Mon parcours en marketing et en image de marque, combiné à des relations solides avec des promoteurs et des propriétaires d'entreprises, me permet d'offrir un service exceptionnel à chaque client."
                  : "My background in marketing and branding, combined with strong relationships with developers and business owners, allows me to deliver exceptional service to every client."}
              </p>
            </div>
            <div style={{ color: "#0e1011" }} className="flex flex-col gap-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-1">
                  {isFr ? "Téléphone" : "Phone"}
                </p>
                <a
                  href="tel:+15145198177"
                  className="text-lg font-semibold hover:opacity-70 transition-opacity"
                >
                  514 519-8177
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-1">
                  {isFr ? "Courriel" : "Email"}
                </p>
                <a
                  href="mailto:JeremySoares@icloud.com"
                  className="text-lg font-semibold hover:opacity-70 transition-opacity break-all"
                >
                  JeremySoares@icloud.com
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-1">
                  {isFr ? "Basé à" : "Based in"}
                </p>
                <p className="text-lg font-semibold">Montréal, QC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#0e1011" }}
        className="px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <p className="section-label mb-12" style={{ color: "#eceae5" }}>
            {isFr ? "Expérience" : "Experience"}
          </p>

          <div ref={timelineRef} className="flex flex-col">
            {experience.map((item, index) => (
              <div
                key={index}
                className="timeline-row"
                style={{
                  borderTop: "1px solid #1e2428",
                  color: "#eceae5",
                  padding: "2rem 0",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-50">{item.desc}</p>
                  </div>
                  <span className="text-sm tracking-widest uppercase opacity-35 shrink-0 font-mono">
                    {item.years}
                  </span>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #1e2428" }} />
          </div>
        </div>
      </section>

      {/* ── OLD PORT / CITY IMAGE ─────────────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", overflow: "hidden" }}>
        <Image
          src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba5ef5db548016dd9a1ed9_old%20port.jpg"
          alt="Old Port Montreal"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(14,16,17,0.7) 100%)",
          }}
        />
      </div>

      {/* ── PLATFORMS ────────────────────────────────────────────────────── */}
      <section
        ref={platformsRef}
        style={{ backgroundColor: "#132030" }}
        className="px-6 py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <p className="section-label mb-8" style={{ color: "#eceae5" }}>
            {isFr ? "Plateformes" : "Platforms"}
          </p>
          <h2
            style={{ color: "#eceae5" }}
            className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-10"
          >
            {isFr ? "50+ Domaines Immobiliers" : "50+ Real Estate Domains"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-tag text-sm tracking-widest uppercase px-5 py-3 hover:opacity-80 transition-all"
                style={{
                  color: "#eceae5",
                  border: "1px solid rgba(236,234,229,0.25)",
                }}
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#eceae5" }}
        className="px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div style={{ color: "#0e1011" }}>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
              {isFr ? "Travaillons Ensemble" : "Work Together"}
            </h2>
            <p className="text-lg opacity-55 mt-2">
              514 519-8177 &middot; JeremySoares@icloud.com
            </p>
          </div>
          <a
            href="https://form.jeremysoares.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#0e1011", color: "#eceae5" }}
            className="inline-block text-xs tracking-[0.25em] uppercase font-bold px-10 py-5 hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            {isFr ? "Discutons" : "Let's Talk"}
          </a>
        </div>
      </section>
    </>
  );
}

'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useAnimations, useMobileMenu } from '@/hooks/useAnimations'

const SOLD_IMAGES = [
  '68bb145e2a0cb00a93b87ea4_sold template 2025-13.png',
  '68bb145e55f3e2770f820520_sold template 2025-08.png',
  '68bb145e776d050d93a364c8_sold template 2025-02.png',
  '68bb145e7778d884a103ce78_sold template 2025-12.png',
  '68bb145e7f790635cac62e1d_sold template 2025-15.png',
  '68bb145eb12f941c4fda1c25_sold template 2025-04.png',
  '68bb145ec0d42c717de5d522_sold template 2025-06.png',
  '68bb145ecffbc57c718a99bc_sold template 2025-10.png',
  '68bc7b3aa8714105bb1b64ae_SOLDS TEMPLATE-14.png',
  '68ba2bf227d34e40571de5e2_SOLDS-13 2.jpg',
  '68ba2bf39335b05e6d614165_SOLDS-04 2.jpg',
  '68fae94629b92afc8b3f85b6_454 de la gauchetiere 808-01.png',
]

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  const router = useRouter()
  useAnimations()
  useMobileMenu()

  const toggleLocale = () => {
    const next = locale === 'en-ca' ? 'fr-ca' : 'en-ca'
    router.push(`/${next}`)
  }

  return (
    <div className="page-wrapper">
      {/* NAVBAR (desktop) */}
      <div className="show-tablet">
        <header className="header">
          <header className="navbar">
            <div
              id="w-node-eb0427c1-bb1c-e076-5734-e12e7079058a-70790586"
              className="navbar-left"
            >
              <a href="/" className="navbar-logo w-inline-block">
                <div className="light-mode">
                  <div className="w-layout-blockcontainer w-container">
                    <img
                      loading="eager"
                      height="Auto"
                      alt=""
                      src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68bcc66da9e299f0ce791b88_REDE-01.png"
                      className="navbar-logo-image"
                    />
                  </div>
                </div>
                <div className="dark-mode">
                  <img
                    src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68ba28554a070e692e441344_logo-inverse.svg"
                    loading="eager"
                    alt="Logo"
                    height="Auto"
                    className="navbar-logo-image"
                  />
                </div>
              </a>
            </div>
            <nav className="navbar-menu">
              <a href={`/${locale}`} className="navbar-menu-item w-inline-block">
                <div className="navbar-menu-item-text">Home</div>
                <div className="navbar-item-line"></div>
              </a>
              <a href={`/${locale}/service`} className="navbar-menu-item w-inline-block">
                <div className="navbar-menu-item-text">Real Estate</div>
                <div className="navbar-item-line"></div>
              </a>
              <a
                href="https://studio.jeremysoares.com"
                className="navbar-menu-item w-inline-block"
              >
                <div className="navbar-menu-item-text">Art</div>
                <div className="navbar-item-line"></div>
              </a>
              <a href={`/${locale}/about`} className="navbar-menu-item w-inline-block">
                <div className="navbar-menu-item-text">About</div>
                <div className="navbar-item-line"></div>
              </a>
              <a href={`/${locale}/blog`} className="navbar-menu-item w-inline-block">
                <div className="navbar-menu-item-text">Blog</div>
                <div className="navbar-item-line"></div>
              </a>
            </nav>
            <div className="navbar-right">
              <a href={`/${locale}/contact`} className="button-text w-inline-block">
                <div className="button-text-inner">
                  <div className="button-text-text">Let&apos;s Talk</div>
                  <div className="button-text-line"></div>
                </div>
              </a>
              <a
                href="#"
                className="mobile-menu-toggle w-inline-block"
                id="menu-toggle"
              >
                <div className="mobile-menu-toggle-inner">
                  <div className="menu-toggle-line top"></div>
                  <div className="menu-toggle-line bottom"></div>
                </div>
              </a>
            </div>
          </header>
        </header>
      </div>

      {/* NAVBAR (small/scroll) */}
      <header className="header-small">
        <header className="navbar-small">
          <div className="navbar-small-left">
            <a href="/" className="navbar-logo w-inline-block">
              <img
                loading="eager"
                height="Auto"
                alt=""
                src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68bcc66da9e299f0ce791b88_REDE-01.png"
                className="navbar-logo-image"
              />
            </a>
          </div>
          <div className="navbar-small-right">
            <nav className="navbar-small-menu">
              <a href={`/${locale}/service`} className="navbar-menu-item w-inline-block">
                <div className="navbar-menu-item-text">Real Estate</div>
                <div className="navbar-item-line"></div>
              </a>
              <a
                href="https://studio.jeremysoares.com"
                className="navbar-menu-item w-inline-block"
              >
                <div className="navbar-menu-item-text">Art</div>
                <div className="navbar-item-line"></div>
              </a>
              <a href={`/${locale}/about`} className="navbar-menu-item w-inline-block">
                <div className="navbar-menu-item-text">About</div>
                <div className="navbar-item-line"></div>
              </a>
              <a href={`/${locale}/blog`} className="navbar-menu-item w-inline-block">
                <div className="navbar-menu-item-text">Blog</div>
                <div className="navbar-item-line"></div>
              </a>
            </nav>
            <a href={`/${locale}/contact`} className="button-text w-inline-block">
              <div className="button-text-inner">
                <div className="button-text-text">Let&apos;s Talk</div>
                <div className="button-text-line"></div>
              </div>
            </a>
          </div>
        </header>
      </header>

      {/* MOBILE MENU */}
      <div className="mobile-menu" id="mobile-menu">
        <div className="mobile-menu-wrapper">
          <nav className="mobile-menu-nav">
            <a href={`/${locale}`} className="mobile-menu-nav-item w-inline-block">
              <div className="menu-nav-item-text">Home</div>
            </a>
            <a href={`/${locale}/service`} className="mobile-menu-nav-item w-inline-block">
              <div className="menu-nav-item-text">Real Estate</div>
            </a>
            <a href={`/${locale}/about`} className="mobile-menu-nav-item w-inline-block">
              <div className="menu-nav-item-text">About</div>
            </a>
            <a href={`/${locale}/blog`} className="mobile-menu-nav-item w-inline-block">
              <div className="menu-nav-item-text">Blog</div>
            </a>
            <a href={`/${locale}/contact`} className="mobile-menu-nav-item w-inline-block">
              <div className="menu-nav-item-text">Contact</div>
            </a>
          </nav>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="main-wrapper">
        {/* HERO SECTION */}
        <section className="section-home-hero">
          <div className="home-hero-grid">
            <img
              src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg"
              loading="eager"
              sizes="(max-width: 1218px) 100vw, 1218px"
              srcSet="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610-p-500.jpg 500w, https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610-p-800.jpg 800w, https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610-p-1080.jpg 1080w, https://cdn.prod.website-files.com/68ba28534a070e692e441089/68baf35dc28553a17f2d6d78_8-IMG_6610.jpg 1218w"
              alt=""
              className="home-hero-image"
            />
            <div className="home-hero-right">
              <div className="home-hero-right-top">
                <div className="margin-bottom margin-large">
                  <div className="overflow-hidden">
                    <h1 className="heading-style-large js-animate-up">JEREMY</h1>
                  </div>
                  <div className="overflow-hidden">
                    <h1 className="heading-style-large titlle-jeremy-soares js-animate-up">
                      SOARES
                    </h1>
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="heading-style-large under-heading js-animate-up">
                      Montreal Real Estate Services.
                    </h2>
                  </div>
                </div>
                <div>
                  <div className="margin-bottom margin-medium">
                    <div className="text-meta text-color-muted js-fade-up">
                      (Based in Montreal)
                    </div>
                  </div>
                  <div className="max-width-large">
                    <p className="heading-alt-h2 js-fade-up">
                      Personalized strategies for buyers, sellers, and investors, backed by
                      local expertise and proven results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="section-home-services">
          <div className="section-top">
            <div className="section-top-heading">
              <div className="text-meta text-color-muted">(What we do)</div>
              <div className="text-meta text-color-muted">(02)</div>
            </div>
            <div>
              <div className="margin-bottom margin-xsmall">
                <div className="overflow-hidden">
                  <h2 className="heading-style-large js-animate-up">Services</h2>
                </div>
              </div>
              <div className="max-width-huge">
                <p className="heading-alt-small js-fade-up">
                  With a decade of experience in the real estate markets of Vancouver and
                  Montreal.
                </p>
              </div>
              <div className="max-width-huge">
                <div className="label primary">
                  <div className="label-text">Commercial</div>
                </div>
                <div className="label primary">
                  <div className="label-text">LEASE</div>
                </div>
                <div className="label primary">
                  <div className="label-text">MARKETING</div>
                </div>
                <div className="label primary">
                  <div className="label-text">BRANDING</div>
                </div>
                <div className="label primary">
                  <div className="label-text">INVEST</div>
                </div>
                <div className="label primary">
                  <div className="label-text">RENT</div>
                </div>
                <div className="label primary">
                  <div className="label-text">SELL</div>
                </div>
                <div className="label primary">
                  <div className="label-text">BUY</div>
                </div>
              </div>
            </div>
            <div className="home-hero-right-bottom">
              <div className="margin-bottom margin-medium">
                <div className="text-meta text-color-muted js-fade-up">(About ME)</div>
              </div>
              <div className="margin-bottom margin-medium">
                <div className="margin-bottom margin-tiny">
                  <div className="overflow-hidden">
                    <h2 className="heading-style-h2 js-animate-up">
                      <strong>TRUSTED</strong>
                    </h2>
                  </div>
                </div>
                <div className="margin-bottom margin-tiny">
                  <div className="overflow-hidden">
                    <h2 className="heading-style-h2 js-animate-up">MONTREAL</h2>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <h2 className="heading-style-h2 js-animate-up">Realtor&reg;.</h2>
                </div>
              </div>
              <div className="margin-bottom margin-xhuge">
                <div className="max-width-large">
                  <p className="text-color-muted js-fade-up">
                    Buying, selling, or investing in Montreal real estate requires more than
                    listings—it requires insight, negotiation, and tailored marketing. From
                    condos and family homes to commercial spaces and industrial assets, I
                    guide clients with solutions designed to maximize value at every step.
                  </p>
                </div>
              </div>
              <div className="dark-mode">
                <div className="home-hero-logos js-fade-up">
                  <img
                    src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68fb0b5996c96da9204a4884_logo-full-9tBRxfnZ.png"
                    loading="lazy"
                    width="Auto"
                    height="Auto"
                    alt=""
                    className="image-7"
                  />
                  <img
                    src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68fb10925d0e263d8e4fcb1f_Untitled-3%20[Recovered]-04.png"
                    loading="lazy"
                    width="Auto"
                    height="Auto"
                    alt=""
                    className="image-7"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service item 1: Video + Unmatched Marketing */}
          <div className="home-services-item">
            <div className="home-services-item-image">
              <div className="background-video w-background-video w-background-video-atom">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source
                    src="https://cdn.prod.website-files.com/68ba28534a070e692e441089%2F68ee0bb154e19c16d10779cb_HOMEFORSALE_JEREMYAD-transcode.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://cdn.prod.website-files.com/68ba28534a070e692e441089%2F68ee0bb154e19c16d10779cb_HOMEFORSALE_JEREMYAD-transcode.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>
            <div className="home-services-item-content">
              <div className="margin-bottom margin-large">
                <div className="margin-bottom margin-tiny">
                  <div className="overflow-hidden">
                    <h3 className="heading-style-small js-animate-up">Unmatched</h3>
                  </div>
                </div>
                <div className="margin-bottom margin-xsmall">
                  <div className="overflow-hidden">
                    <h3 className="heading-style-small js-animate-up">
                      <span className="text-span-7">Marketing</span> Power
                    </h3>
                  </div>
                </div>
                <div className="max-width-large">
                  <p className="heading-alt-h3 js-fade-up">
                    With over 50 specialized real estate domains and direct access to an
                    email list of 14,000 Quebec brokers, I ensure properties receive
                    unmatched visibility.
                  </p>
                </div>
              </div>
              <div className="js-fade-up">
                <div className="margin-bottom margin-medium">
                  <div className="text-meta text-color-muted">(Branding Services)</div>
                </div>
                <div className="home-services-list">
                  <p className="heading-alt-h5">Residential Real Estate</p>
                  <p className="heading-alt-h5">Appartement Hunting</p>
                  <p className="heading-alt-h5">Commercial Real Estate</p>
                  <p className="heading-alt-h5">New Developments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service item 2: Proven Track Record (ODD = image right) */}
          <div className="home-services-item odd">
            <div className="home-services-item-content">
              <div className="margin-bottom margin-large">
                <div className="margin-bottom margin-tiny">
                  <div className="overflow-hidden">
                    <h3 className="heading-style-small js-animate-up">
                      <strong>Proven </strong>
                    </h3>
                  </div>
                </div>
                <div className="margin-bottom margin-xsmall">
                  <div className="overflow-hidden">
                    <h3 className="heading-style-small js-animate-up">
                      <strong>Track Record</strong>
                    </h3>
                  </div>
                </div>
                <div className="max-width-large">
                  <p className="heading-alt-h3 js-fade-up">
                    My background in marketing and branding, combined with relationships
                    with developers and small business owners, allows me to create
                    opportunities and position each property for success.
                  </p>
                </div>
              </div>
              <div className="js-fade-up">
                <div className="margin-bottom margin-medium">
                  <div className="text-meta text-color-muted">(MARKETING)</div>
                </div>
                <div className="home-services-list">
                  <p className="heading-alt-h5">Website Design</p>
                  <p className="heading-alt-h5">Website Support</p>
                  <p className="heading-alt-h5">Framer</p>
                  <p className="heading-alt-h5">Webflow</p>
                </div>
              </div>
            </div>
            <div className="home-services-item-image">
              <img
                src="/images/headshots/Jeremy-Soares-Montreal-Realtor.webp"
                loading="lazy"
                alt="Jeremy Soares Montreal Realtor"
                className="image-cover-parallax"
              />
            </div>
          </div>

          {/* Service item 3: Strong Local Connections */}
          <div className="home-services-item">
            <div className="home-services-item-image">
              <img
                src="https://cdn.prod.website-files.com/68ba28534a070e692e441089/68bb1433116d7d6929d3342a_1-48912126-F1AA-4FAE-8511-3BF6A11A8D99-3483-00000108D3E4BAC8.jpg"
                loading="lazy"
                alt=""
                className="image-cover-parallax"
              />
            </div>
            <div className="home-services-item-content">
              <div className="margin-bottom margin-large">
                <div className="margin-bottom margin-tiny">
                  <div className="overflow-hidden">
                    <h3 className="heading-style-small js-animate-up">Strong </h3>
                  </div>
                </div>
                <div className="margin-bottom margin-xsmall">
                  <div className="overflow-hidden">
                    <h3 className="heading-style-small js-animate-up">
                      <span className="text-span-4">Local</span>
                    </h3>
                    <h3 className="heading-style-small js-animate-up">Connections</h3>
                  </div>
                </div>
                <div className="max-width-large">
                  <p className="heading-alt-h3 js-fade-up">
                    My background in marketing and branding, combined with relationships
                    with developers and small business owners, allows me to create
                    opportunities and position each property for success.
                  </p>
                </div>
              </div>
              <div className="js-fade-up">
                <div className="margin-bottom margin-medium">
                  <div className="text-meta text-color-muted">(Territory)</div>
                </div>
                <div className="home-services-list">
                  <p className="heading-alt-h5">Downtown</p>
                  <p className="heading-alt-h5">Old Port</p>
                  <p className="heading-alt-h5">Plateau</p>
                  <p className="heading-alt-h5">Montreal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLD & RENTED SECTION */}
        <section className="section-home-sold">
          <div className="section-top-heading">
            <div className="text-meta text-color-muted">(Sold &amp; Rented)</div>
            <div className="text-meta text-color-muted">(03)</div>
          </div>
          <div>
            <div className="margin-bottom margin-xsmall">
              <div className="overflow-hidden">
                <h2 className="heading-style-large js-animate-up">Recent</h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="heading-style-large js-animate-up">Results.</h2>
              </div>
            </div>
            <div className="max-width-huge">
              <p className="heading-alt-small js-fade-up">
                Properties sold and rented across Montreal — from condos to commercial spaces.
              </p>
            </div>
          </div>
          <div className="sold-grid">
            {SOLD_IMAGES.map((img, i) => (
              <div key={i} className="sold-grid-item js-fade-up">
                <img
                  src={`/images/sold/${img}`}
                  alt={`Sold property ${i + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FR/EN LANGUAGE TOGGLE */}
      <div
        className="toggle-color"
        data-locale={locale}
        onClick={toggleLocale}
        role="button"
        aria-label="Switch language"
      >
        <div className="toggle-color-dot" />
        <span>{locale === 'en-ca' ? 'FR' : 'EN'}</span>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="overflow-hidden">
            <h2 className="heading-style-xxlarge jeremy js-animate-up">JEREMY</h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="heading-style-xxlarge soares">SOARES</h2>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-nav">
            <div className="footer-column">
              <div className="text-meta text-color-muted-inverse">(Navigation)</div>
              <div className="nav center-phone-landscape">
                <a href={`/${locale}`} className="nav-item inverse w-inline-block">
                  <div className="nav-item-text">Home</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href={`/${locale}/work`}
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">Real Estate</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href="https://studio.jeremysoares.com/"
                  target="_blank"
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">Art</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href={`/${locale}/about`}
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">About</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href={`/${locale}/contact`}
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">Contact</div>
                  <div className="nav-item-line inverse"></div>
                </a>
              </div>
            </div>
            <div className="footer-column">
              <div className="text-meta text-color-muted-inverse">(Tools)</div>
              <div className="nav center-phone-landscape">
                <a
                  href="https://form.Jeremysoares.com"
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">Formulaire</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href={`/${locale}/blog`}
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">Blog</div>
                  <div className="nav-item-line inverse"></div>
                </a>
              </div>
            </div>
            <div className="footer-column">
              <div className="text-meta text-color-muted-inverse">(Platforms)</div>
              <div className="nav center-phone-landscape">
                <a
                  href="https://alouermtl.com"
                  target="_blank"
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">ALouerMTL.com</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href="https://forsalemtl.com"
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">ForSaleMTL.com</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href="https://agentmtl.ca/agents/jeremysoares"
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">AgentMTL.ca</div>
                  <div className="nav-item-line inverse"></div>
                </a>
              </div>
            </div>
            <div className="footer-column">
              <div className="text-meta text-color-muted-inverse">(Socials)</div>
              <div className="nav center-phone-landscape">
                <a
                  href="https://www.linkedin.com/in/jeremysoaresrealestate/"
                  target="_blank"
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">Linkedin</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href="https://www.centris.ca/fr/courtier-immobilier~jeremy-soares~jeremy-soares/h2731"
                  target="_blank"
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">Centris</div>
                  <div className="nav-item-line inverse"></div>
                </a>
                <a
                  href="https://www.realtor.ca/agent/2079722/jeremy-soares-106-220-av-des-pins-o-montreal-quebec-h2w1r9"
                  target="_blank"
                  className="nav-item inverse w-inline-block"
                >
                  <div className="nav-item-text">Realtor.ca</div>
                  <div className="nav-item-line inverse"></div>
                </a>
              </div>
              <a
                href="https://form.jeremysoares.com"
                target="_blank"
                className="button primary-inverse w-inline-block"
              >
                <div className="button-inner-text">INQUIRE</div>
              </a>
            </div>
          </div>
          <div className="footer-bottom-grid">
            <div className="text-meta">
              JeremySoares.com | 514 519-8177 | JeremySoares@icloud.com
            </div>
          </div>
        </div>
      </footer>

      {/* PAGE LOADER */}
      <div className="pageloader" id="pageloader">
        <div className="overflow-hidden">
          <div className="pageloader-heading">SOARES</div>
        </div>
      </div>
    </div>
  )
}

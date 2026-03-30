/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jeremysoares.com',
  generateRobotsTxt: false, // robots.txt is manually maintained at public/robots.txt
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  // Static top-level routes get default changefreq/priority from next-sitemap
  // alternateRefs are injected per-path below for hreflang
  additionalPaths: async () => {
    const fs = require('fs')
    const path = require('path')
    const paths = []

    const locales = ['en-ca', 'fr-ca']

    // ── Core pages ──────────────────────────────────────────────────────────
    const corePages = [
      { path: '', priority: 1.0, changefreq: 'daily' },
      { path: '/real-estate', priority: 0.9, changefreq: 'weekly' },
      { path: '/presale', priority: 0.9, changefreq: 'weekly' },
      { path: '/services', priority: 0.8, changefreq: 'monthly' },
      { path: '/about', priority: 0.8, changefreq: 'monthly' },
      { path: '/studio', priority: 0.7, changefreq: 'monthly' },
      { path: '/studio/web', priority: 0.8, changefreq: 'monthly' },
      { path: '/services/website-building', priority: 0.8, changefreq: 'monthly' },
      { path: '/blog', priority: 0.8, changefreq: 'weekly' },
      { path: '/tools', priority: 0.7, changefreq: 'monthly' },
      { path: '/contact', priority: 0.8, changefreq: 'monthly' },
      // Niche SEO landing pages
      { path: '/data-center-real-estate-canada', priority: 0.9, changefreq: 'monthly' },
      { path: '/commercial-real-estate-montreal', priority: 0.9, changefreq: 'monthly' },
      { path: '/industrial-real-estate-montreal', priority: 0.9, changefreq: 'monthly' },
      { path: '/pre-construction-condos-montreal', priority: 0.9, changefreq: 'weekly' },
      { path: '/penthouses-montreal', priority: 0.8, changefreq: 'monthly' },
      { path: '/lofts-montreal', priority: 0.8, changefreq: 'monthly' },
      { path: '/land-for-sale-montreal', priority: 0.8, changefreq: 'monthly' },
      { path: '/retail-space-montreal', priority: 0.8, changefreq: 'monthly' },
      { path: '/office-space-montreal', priority: 0.8, changefreq: 'monthly' },
      { path: '/plex-montreal', priority: 0.8, changefreq: 'monthly' },
      { path: '/luxury-real-estate-montreal', priority: 0.8, changefreq: 'monthly' },
      { path: '/new-construction-montreal', priority: 0.8, changefreq: 'weekly' },
      { path: '/metro', priority: 0.7, changefreq: 'monthly' },
      // Hubs
      { path: '/neighborhoods', priority: 0.8, changefreq: 'monthly' },
      { path: '/guides', priority: 0.7, changefreq: 'monthly' },
      { path: '/market-reports', priority: 0.8, changefreq: 'weekly' },
    ]

    for (const page of corePages) {
      for (const locale of locales) {
        const loc = `/${locale}${page.path}`
        paths.push({
          loc,
          changefreq: page.changefreq,
          priority: page.priority,
          alternateRefs: locales.map((l) => ({
            href: `https://jeremysoares.com/${l}${page.path}`,
            hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
          })),
        })
      }
    }

    // ── Metro stations ──────────────────────────────────────────────────────
    const metroSlugs = [
      'mont-royal', 'berri-uqam', 'square-victoria', 'jean-talon', 'snowdon',
      'cote-des-neiges', 'vendome', 'villa-maria', 'lionel-groulx', 'atwater',
      'laurier', 'rosemont', 'fabre', 'papineau', 'outremont',
    ]
    for (const slug of metroSlugs) {
      for (const locale of locales) {
        paths.push({
          loc: `/${locale}/metro/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          alternateRefs: locales.map((l) => ({
            href: `https://jeremysoares.com/${l}/metro/${slug}`,
            hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
          })),
        })
      }
    }

    // ── Neighborhoods ───────────────────────────────────────────────────────
    const neighborhoodSlugs = [
      'plateau-mont-royal', 'griffintown', 'old-montreal', 'downtown', 'mile-end',
      'saint-laurent', 'westmount', 'outremont', 'verdun', 'rosemont',
      'villeray', 'ndg', 'lachine', 'anjou', 'laval', 'south-shore',
    ]
    for (const slug of neighborhoodSlugs) {
      for (const locale of locales) {
        paths.push({
          loc: `/${locale}/neighborhoods/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          alternateRefs: locales.map((l) => ({
            href: `https://jeremysoares.com/${l}/neighborhoods/${slug}`,
            hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
          })),
        })
      }
    }

    // ── Guides ────────────────────────────────────────────────────────────
    const guideSlugs = [
      'how-to-buy-commercial-property-montreal', 'how-to-buy-data-center-canada',
      'pre-construction-condo-guide-montreal', 'investing-industrial-real-estate-quebec',
      'buying-vs-leasing-commercial-space', 'montreal-vs-toronto-real-estate-investment',
      'quebec-real-estate-buying-process',
    ]
    for (const slug of guideSlugs) {
      for (const locale of locales) {
        paths.push({
          loc: `/${locale}/guides/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          alternateRefs: locales.map((l) => ({
            href: `https://jeremysoares.com/${l}/guides/${slug}`,
            hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
          })),
        })
      }
    }

    // ── Market Reports ────────────────────────────────────────────────────
    const reportSlugs = [
      'commercial-q1-2026', 'industrial-q1-2026', 'residential-q1-2026',
      'pre-construction-q1-2026', 'data-center-market-canada-2026',
    ]
    for (const slug of reportSlugs) {
      for (const locale of locales) {
        paths.push({
          loc: `/${locale}/market-reports/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          alternateRefs: locales.map((l) => ({
            href: `https://jeremysoares.com/${l}/market-reports/${slug}`,
            hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
          })),
        })
      }
    }

    // ── Blog posts ──────────────────────────────────────────────────────────
    const postsDir = path.join(process.cwd(), 'content/posts/en')
    if (fs.existsSync(postsDir)) {
      const slugs = fs
        .readdirSync(postsDir)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => f.replace('.mdx', ''))
      for (const slug of slugs) {
        for (const locale of locales) {
          paths.push({
            loc: `/${locale}/blog/${slug}`,
            changefreq: 'monthly',
            priority: 0.6,
            alternateRefs: locales.map((l) => ({
              href: `https://jeremysoares.com/${l}/blog/${slug}`,
              hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
            })),
          })
        }
      }
    }

    // ── Listings ─────────────────────────────────────────────────────────────
    const listingDirs = ['active', 'sold', 'rented']
    for (const sub of listingDirs) {
      const dir = path.join(process.cwd(), 'content/listings', sub)
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
        for (const file of files) {
          const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8'))
          const changefreq = sub === 'active' ? 'weekly' : 'yearly'
          const priority = sub === 'active' ? 0.8 : 0.4
          for (const locale of locales) {
            paths.push({
              loc: `/${locale}/real-estate/${data.id}`,
              changefreq,
              priority,
              alternateRefs: locales.map((l) => ({
                href: `https://jeremysoares.com/${l}/real-estate/${data.id}`,
                hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
              })),
            })
          }
        }
      }
    }

    // ── Studio / Art ─────────────────────────────────────────────────────────
    const artDir = path.join(process.cwd(), 'content/art')
    if (fs.existsSync(artDir)) {
      const files = fs.readdirSync(artDir).filter((f) => f.endsWith('.json'))
      for (const file of files) {
        const data = JSON.parse(fs.readFileSync(path.join(artDir, file), 'utf-8'))
        for (const locale of locales) {
          paths.push({
            loc: `/${locale}/studio/${data.slug}`,
            changefreq: 'monthly',
            priority: 0.5,
            alternateRefs: locales.map((l) => ({
              href: `https://jeremysoares.com/${l}/studio/${data.slug}`,
              hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
            })),
          })
        }
      }
    }

    // ── Pre-sale ──────────────────────────────────────────────────────────────
    const presaleDir = path.join(process.cwd(), 'content/presale/en')
    if (fs.existsSync(presaleDir)) {
      const slugs = fs
        .readdirSync(presaleDir)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => f.replace('.mdx', ''))
      for (const slug of slugs) {
        for (const locale of locales) {
          paths.push({
            loc: `/${locale}/presale/${slug}`,
            changefreq: 'weekly',
            priority: 0.7,
            alternateRefs: locales.map((l) => ({
              href: `https://jeremysoares.com/${l}/presale/${slug}`,
              hreflang: l === 'en-ca' ? 'en-CA' : 'fr-CA',
            })),
          })
        }
      }
    }

    return paths
  },
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jeremysoares.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  alternateRefs: [
    { href: 'https://jeremysoares.com/en-ca', hreflang: 'en-CA' },
    { href: 'https://jeremysoares.com/fr-ca', hreflang: 'fr-CA' },
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    additionalSitemaps: ['https://jeremysoares.com/sitemap.xml'],
  },
}

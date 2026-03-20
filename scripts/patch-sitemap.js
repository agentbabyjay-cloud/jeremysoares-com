/**
 * Patch sitemap.xml after next-sitemap generates it.
 * Adds correct hreflang alternates for en-CA and fr-CA locale pairs.
 */
const fs = require('fs')
const path = require('path')

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
let xml = fs.readFileSync(sitemapPath, 'utf8')

const base = 'https://jeremysoares.com'

xml = xml.replace(/<url>([\s\S]*?)<\/url>/g, (match, inner) => {
  // Extract loc
  const locMatch = inner.match(/<loc>(.*?)<\/loc>/)
  if (!locMatch) return match
  const loc = locMatch[1]
  const urlPath = loc.replace(base, '')

  // Remove any existing xhtml:link alternates (use [^>]* to match across slashes in URLs)
  const cleanInner = inner.replace(/<xhtml:link[^>]*\/>/g, '')

  // Derive alternates
  let enUrl = loc
  let frUrl = loc
  let xDefault = null

  if (urlPath.startsWith('/en-ca')) {
    const slug = urlPath.slice(6)
    enUrl = base + '/en-ca' + slug
    frUrl = base + '/fr-ca' + slug
  } else if (urlPath.startsWith('/fr-ca')) {
    const slug = urlPath.slice(6)
    enUrl = base + '/en-ca' + slug
    frUrl = base + '/fr-ca' + slug
  } else if (urlPath === '' || urlPath === '/') {
    enUrl = base + '/en-ca'
    frUrl = base + '/fr-ca'
    xDefault = base
  }

  const alts = [
    `<xhtml:link rel="alternate" hreflang="en-CA" href="${enUrl}"/>`,
    `<xhtml:link rel="alternate" hreflang="fr-CA" href="${frUrl}"/>`,
    ...(xDefault ? [`<xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>`] : []),
  ].join('')

  return `<url>${cleanInner}${alts}</url>`
})

fs.writeFileSync(sitemapPath, xml, 'utf8')
console.log('[sitemap-patch] Hreflang alternates patched successfully.')

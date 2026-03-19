import { getAllPosts } from '@/lib/content/posts'

export async function GET() {
  const posts = getAllPosts('en')
  const baseUrl = 'https://jeremysoares.com'

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/en-ca/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.tag}</category>
      <guid>${baseUrl}/en-ca/blog/${post.slug}</guid>
    </item>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Soares — Montreal Real Estate</title>
    <link>${baseUrl}</link>
    <description>Market insights, buying tips, and investment analysis for Montreal real estate by Jeremy Soares.</description>
    <language>en-CA</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

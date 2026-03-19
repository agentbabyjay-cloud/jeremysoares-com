import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()
let errors = 0

function error(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}

function info(msg: string) {
  console.log(`  ✓ ${msg}`)
}

function validateJson(dir: string, requiredKeys: string[]) {
  const fullDir = path.join(ROOT, dir)
  if (!fs.existsSync(fullDir)) {
    info(`${dir} — no files (skipped)`)
    return
  }
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.json'))
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(fullDir, file), 'utf-8'))
      for (const key of requiredKeys) {
        if (!(key in data) || data[key] === undefined || data[key] === null) {
          error(`${dir}/${file}: missing required key "${key}"`)
        }
      }
    } catch (e) {
      error(`${dir}/${file}: invalid JSON — ${e}`)
    }
  }
  info(`${dir} — ${files.length} files valid`)
}

function validateMdx(dir: string, requiredFrontmatter: string[]) {
  const fullDir = path.join(ROOT, dir)
  if (!fs.existsSync(fullDir)) {
    info(`${dir} — no files (skipped)`)
    return
  }
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.mdx'))
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(fullDir, file), 'utf-8')
      const { data } = matter(raw)
      for (const key of requiredFrontmatter) {
        if (!(key in data) || !data[key]) {
          error(`${dir}/${file}: missing frontmatter "${key}"`)
        }
      }
    } catch (e) {
      error(`${dir}/${file}: parse error — ${e}`)
    }
  }
  info(`${dir} — ${files.length} files valid`)
}

console.log('\nValidating content...\n')

// Art
validateJson('content/art', ['id', 'title', 'slug', 'medium', 'year', 'coverImage', 'description'])

// Tools
validateJson('content/tools', ['id', 'name', 'description', 'url', 'category'])

// Listings
for (const sub of ['active', 'sold', 'rented']) {
  validateJson(`content/listings/${sub}`, ['id', 'status', 'address', 'neighbourhood', 'city', 'type', 'images'])
}

// Timeline
const timelineFile = path.join(ROOT, 'content/timeline.json')
if (fs.existsSync(timelineFile)) {
  try {
    const data = JSON.parse(fs.readFileSync(timelineFile, 'utf-8'))
    if (!Array.isArray(data)) error('content/timeline.json: must be an array')
    else info(`content/timeline.json — ${data.length} entries`)
  } catch (e) {
    error(`content/timeline.json: invalid JSON — ${e}`)
  }
}

// Blog posts
validateMdx('content/posts/en', ['title', 'date', 'tag'])
validateMdx('content/posts/fr', ['title', 'date', 'tag'])

// Pre-sale
validateMdx('content/presale/en', ['projectName', 'developer', 'status'])
validateMdx('content/presale/fr', ['projectName', 'developer', 'status'])

console.log('')
if (errors > 0) {
  console.error(`Found ${errors} error(s)`)
  process.exit(1)
} else {
  console.log('All content valid!\n')
}

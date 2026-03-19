import fs from 'fs'
import path from 'path'
import type { ToolLink } from './types'

const TOOLS_DIR = path.join(process.cwd(), 'content/tools')

export function getAllTools(): ToolLink[] {
  if (!fs.existsSync(TOOLS_DIR)) return []
  return fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(TOOLS_DIR, f), 'utf-8')) as ToolLink)
}

export function getToolsByCategory(category: string): ToolLink[] {
  return getAllTools().filter((t) => t.category === category)
}

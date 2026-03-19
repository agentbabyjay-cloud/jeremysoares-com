import Link from 'next/link'
import type { BlogPost } from '@/lib/content/types'

interface BlogPostRowProps {
  post: BlogPost
  locale: string
}

export function BlogPostRow({ post, locale }: BlogPostRowProps) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group flex items-center justify-between py-6 border-b border-[rgba(236,234,229,0.1)] hover:border-[rgba(236,234,229,0.3)] transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-40">
            {post.date}
          </span>
          <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-30">
            {post.tag}
          </span>
          <span className="text-[0.625rem] tracking-[0.22em] uppercase text-[#eceae5] opacity-30">
            {post.readTime} min
          </span>
        </div>
        <h3 className="text-[1.25rem] font-bold tracking-tight text-[#eceae5] group-hover:opacity-80 transition-opacity font-['avenir-next-lt-pro-condensed','Avenir_Next_Condensed',sans-serif]">
          {post.title}
        </h3>
        <p className="text-[0.75rem] text-[#eceae5] opacity-40 mt-1 truncate max-w-2xl">
          {post.excerpt}
        </p>
      </div>
      <span className="text-[#eceae5] opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all duration-300 ml-6 text-lg">
        &rarr;
      </span>
    </Link>
  )
}

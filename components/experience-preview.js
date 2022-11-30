import Link from 'next/link'
import Avatar from './avatar'
import DateComponent from './date'

export default function ExperiencePreview({
  title,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt} <a href={`/posts/${slug}`} className="underline hover:text-success duration-200 transition-colors">Read More.</a></p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  )
}

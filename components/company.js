import CompanyImage from './contentful-image'

export default function Company({ name, picture, slug }) {
  return (
    <div className="flex items-center">
      <div className="relative w-12 h-12 mr-4">
        <CompanyImage
          slug={slug}
          src={picture.url}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      <a href={`/experience/${slug}`} className="hover:text-success duration-200 transition-colors text-xl font-bold">{name}</a>
    </div>
  )
}

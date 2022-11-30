import CompanyImage from './contentful-image'

export default function Company({ name, picture, link }) {
  return (
    <div className="flex items-center">
      <div className="relative w-12 h-12 mr-4">
        <CompanyImage
          src={picture.url}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      {link ? (<a href={`${link}`} className="hover:text-success duration-200 transition-colors text-xl font-bold">{name}</a>) : (<p className="text-xl font-bold">{name}</p>)}
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const CompanyImage = (props) => {
  return <Link href={`/posts/${props.slug}`}>
    <Image loader={contentfulLoader} {...props} />
  </Link>
}

export default CompanyImage

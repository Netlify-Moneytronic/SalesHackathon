import Image from 'next/image'
import Link from 'next/link'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const CompanyImage = (props) => {

  return <Image loader={contentfulLoader} {...props} />
}

export default CompanyImage

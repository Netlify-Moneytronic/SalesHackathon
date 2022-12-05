import Image from 'next/image'

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const ImageHandler = (props) => {

  return <Image loader={contentfulLoader} {...props} />
}

export default ImageHandler

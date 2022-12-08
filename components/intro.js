import ImageHandler from './contentful-image'

export default function Intro({ profile }) {
  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <ImageHandler
          src={profile.personal.image.url}
          // layout="fill"
          className="rounded-full"
          width={200}
          height={200}
          alt={"Profile Picture"}
        />
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          {profile.personal.name}
        </h1>
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          See more of my work {' '}
          <a
            href={profile.url}
            className="underline hover:text-success duration-200 transition-colors"
          >
            here
          </a>{' '}
          .
        </h4>
      </section>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <p>{profile.bio}</p>
      </section>
    </>
  )
}

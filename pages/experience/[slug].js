import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import ExperienceBody from '../../components/experience-body'
import Header from '../../components/header'
import ExperienceHeader from '../../components/experience-header'
import Layout from '../../components/layout'
import { getAllExperiencesWithSlug, getExperience } from '../../lib/api'
import ExperienceTitle from '../../components/experience-title'

export default function Experience({ experience }) {
  const router = useRouter()

  if (!router.isFallback && !experience) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <ExperienceTitle>Loading…</ExperienceTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {experience.jobTitle}
                </title>
              </Head>
              <ExperienceHeader
                title={experience.jobTitle}
                startDate={experience.startDate}
                endDate={experience.endDate}
                company={experience.company}
              />
              <ExperienceBody description={experience.description} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getExperience(params.slug)

  return {
    props: {
      experience: data?.experience ?? null
    },
  }
}

export async function getStaticPaths() {
  const allExperiences = await getAllExperiencesWithSlug()
  return {
    paths: allExperiences?.map(({ slug }) => `/experience/${slug}`) ?? [],
    fallback: true,
  }
}

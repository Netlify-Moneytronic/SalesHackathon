import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import ExperienceBody from '../../components/experience-body'
import Header from '../../components/header'
import ExperienceHeader from '../../components/experience-header'
import Layout from '../../components/layout'
import { getAllExperiencesWithSlug, getExperienceAndMoreExperiencess } from '../../lib/api'
import ExperienceTitle from '../../components/experience-title'

export default function Experience({ experience, preview }) {
  const router = useRouter()

  if (!router.isFallback && !experience) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
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

export async function getStaticProps({ params, preview = false }) {
  const data = await getExperienceAndMoreExperiencess(params.slug, preview)

  return {
    props: {
      preview,
      experience: data?.experience ?? null,
      moreExperiences: data?.moreExperiences ?? null,
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

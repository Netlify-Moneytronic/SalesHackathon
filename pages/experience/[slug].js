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

export default function Post({ post, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post) {
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
                  {post.jobtitle}
                </title>
              </Head>
              <ExperienceHeader
                title={post.jobtitle}
                date={post.date}
                company={post.company}
              />
              <ExperienceBody description={post.description} />
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
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllExperiencesWithSlug()
  return {
    paths: allPosts?.map(({ slug }) => `/experience/${slug}`) ?? [],
    fallback: true,
  }
}

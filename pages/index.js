import Container from '../components/container'
import ExperienceList from '../components/experience-list'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import Head from 'next/head'
import { YOUR_NAME } from '../lib/constants'

export default function Index({ preview, allExperience }) {
  const moreExperience = allExperience.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{YOUR_NAME}'s Portfolio</title>
        </Head>
        <Container>
          <Intro />
          {moreExperience.length > 0 && <ExperienceList experience={moreExperience} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allExperience = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allExperience },
  }
}

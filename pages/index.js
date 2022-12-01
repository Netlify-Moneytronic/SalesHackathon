import Container from '../components/container'
import ExperienceList from '../components/experience-list'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllExperiencessForHome } from '../lib/api'
import Head from 'next/head'
import { YOUR_NAME } from '../lib/constants'

export default function Index({ preview, allExperience }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{YOUR_NAME}'s Portfolio</title>
        </Head>
        <Container>
          <Intro />
          <ExperienceList experiences={allExperience} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allExperience = (await getAllExperiencessForHome(preview)) ?? []
  return {
    props: { preview, allExperience },
  }
}

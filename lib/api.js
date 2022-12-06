const EXPERIENCE_GRAPHQL_FIELDS = `
jobTitle
slug
description
excerpt
startDate
endDate
company {
  name
  logo {
    url
  }
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractExperience(fetchResponse) {
  return fetchResponse?.data?.experienceCollection?.items?.[0]
}

function extractExperienceEntries(fetchResponse) {
  return fetchResponse?.data?.experienceCollection?.items
}

export async function getPreviewExperienceBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      experienceCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractExperience(entry)
}

export async function getAllExperiencesWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      experienceCollection(where: { slug_exists: true }, order: startDate_DESC) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractExperienceEntries(entries)
}

export async function getAllExperiencessForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      experienceCollection(order: startDate_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractExperienceEntries(entries)
}

export async function getExperienceAndMoreExperiencess(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      experienceCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      experienceCollection(where: { slug_not_in: "${slug}" }, order: startDate_DESC, preview: ${preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    experience: extractExperience(entry),
    moreExperiences: extractExperienceEntries(entries),
  }
}

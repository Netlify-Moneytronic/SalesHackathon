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

const PROFILE_GRAPHQL_FIELDS = `
bio
url
personal {
  name
  image {
    url
  }
}
`

async function fetchGraphQL(query) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractEntry(fetchResponse, collectionName) {
  if (collectionName === 'profile') {
    return fetchResponse?.data?.profileCollection?.items?.[0]
  }
  return fetchResponse?.data?.experienceCollection?.items?.[0]
}

function extractEntries(fetchResponse) {
  return fetchResponse?.data?.experienceCollection?.items
}

// export async function getPreviewExperienceBySlug(slug) {
//   const entry = await fetchGraphQL(
//     `query {
//       experienceCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
//         items {
//           ${EXPERIENCE_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     true
//   )
//   return extractEntry(entry)
// }

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
  return extractEntries(entries)
}

export async function getAllExperiencessForHome() {
  const entries = await fetchGraphQL(
    `query {
      experienceCollection(order: startDate_DESC) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`,
  )
  return extractEntries(entries)
}

export async function getExperience(slug) {
  const entry = await fetchGraphQL(
    `query {
      experienceCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return {
    experience: extractEntry(entry, 'experience')
  }
}


export async function getProfileForHome() {
  const entry = await fetchGraphQL(
    `query {
      profileCollection(limit: 1) {
        items {
          ${PROFILE_GRAPHQL_FIELDS}
        }
      }
    }`,
  )
  return extractEntry(entry, 'profile')
}

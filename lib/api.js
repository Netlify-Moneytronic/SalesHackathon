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

function extractExperience(fetchResponse) {
  return fetchResponse?.data?.experienceCollection?.items?.[0]
}

function extractExperienceEntries(fetchResponse) {
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
//   return extractExperience(entry)
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
  return extractExperienceEntries(entries)
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
  return extractExperienceEntries(entries)
}

export async function getExperienceAndMoreExperiencess(slug) {
  const entry = await fetchGraphQL(
    `query {
      experienceCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  const entries = await fetchGraphQL(
    `query {
      experienceCollection(where: { slug_not_in: "${slug}" }, order: startDate_DESC, limit: 2) {
        items {
          ${EXPERIENCE_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return {
    experience: extractExperience(entry),
    moreExperiences: extractExperienceEntries(entries),
  }
}


export async function getProfilePic() {
  const entry = await fetchGraphQL(
    `query {
      profilePicCollection(limit: 1) {
        items {
          image {
            url
          }
        }
      }
    }`,
    true
  )
  return entry?.data?.profilePicCollection?.items?.[0]
}

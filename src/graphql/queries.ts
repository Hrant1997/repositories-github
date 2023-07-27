export const GET_REPOSITORIES = `
query($query: String!, $count: Int!) {
  search(query: $query, type: REPOSITORY, first: $count) {
    nodes {
      ... on Repository {
        id
        name
        url
        stargazerCount
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 1) {
                nodes {
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
}`;

// edges {
// }

export const GET_MY_REPOSITORIES = `
query ($count: Int!) {
  viewer {
    repositories(first: $count, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
      nodes {
        id
        name
        url
        stargazerCount
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 1) {
                nodes {
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
}`;


export const GET_REPOSITORY_BY_ID = `
  query ($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        description
        url
        stargazerCount
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 1) {
                nodes {
                  committedDate
                }
              }
            }
          }
        }
        languages(first: 100) {
          nodes {
            name
          }
        }
        owner {
          login
          avatarUrl
          url
        }
      }
    }
}`;
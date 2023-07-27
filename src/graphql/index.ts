import axios from "axios";

export const axiosGithubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});
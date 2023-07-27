import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Language, Node, QueryParams, Repository, RepositoryDetailed } from '../../types'
import { axiosGithubGraphQL } from "../../graphql";
import { GET_MY_REPOSITORIES, GET_REPOSITORIES, GET_REPOSITORY_BY_ID } from "../../graphql/queries";
import axios from "axios";
import { useDispatch } from "react-redux";
import store from "../store";
import { RootState } from './../../types'


export type RepoistoryToShow = {
  isLoading: boolean;
  error: boolean;
  data: RepositoryDetailed;
};

export type RepositoriesState = {
  data: Repository[];
  isLoading: boolean;
  error: boolean;
  query?: string;
  repoToShow: RepoistoryToShow;
};

export const REPOSITORIES_COUNT = 100


export const searchRepositories = createAsyncThunk(
  'repositories/search',
  async ({ query }: QueryParams, {rejectWithValue, getState}) => {
    const { repositories: { query: prevQuery } } = getState() as RootState;
    
    if (prevQuery === query) return { useOld: true };

    try {
      const gqlQuery = query ? GET_REPOSITORIES : GET_MY_REPOSITORIES
      const variables = {
        ...(query ? { query } : {}),
        count: REPOSITORIES_COUNT
      }

      const {data} =  await axiosGithubGraphQL.post('', {
        query: gqlQuery,
        variables
      })

      return {...data, query, hasQuery: !!query};

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data)      
      }
    }
  }
)

export const searchRepositoryById = createAsyncThunk(
  'repositories/{repository}/search',
  async(id: string, { rejectWithValue }) => {
    try {
      
      const variables = { id };

      const { data } =  await axiosGithubGraphQL.post('', {
        query: GET_REPOSITORY_BY_ID,
        variables
      })

      return data
      

      // return {...data, query, hasQuery: !!query};

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data)      
      }
    }
  }
)


const repositorySlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: false,
    repoToShow: {
      data: {} as RepositoryDetailed,
      isLoading: false,
      error: false,
    },
  } as RepositoriesState,
  reducers: {
    startFetching: state => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchRepositoriesSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchRepositories.pending, (state) => {
      state.error = false;
      state.isLoading = true
    })

    builder.addCase(searchRepositories.fulfilled, (state, action) => {
      if (action.payload.useOld) {
        return {
          ...state,
          isLoading: false,
          error: false,
        }
      }

      const gqlRepositories = !action.payload.hasQuery
        ? action.payload.data.viewer.repositories.nodes
        : action.payload.data.search.nodes

      const repositories: Repository[] = gqlRepositories.map((node: Node) => ({
        id: node.id,
        name: node.name,
        stargazerCount: node.stargazerCount,
        lastCommitDate: new Date(node.defaultBranchRef?.target.history.nodes[0]?.committedDate).toDateString(),
        url: node.url
      }))
      

      state.data = repositories;
      state.error = false;
      state.isLoading = false
      state.query = action.payload.query
    })

    builder.addCase(searchRepositories.rejected, (state) => {
      state.data = [];
      state.error = true;
      state.isLoading = false
    })

    builder.addCase(searchRepositoryById.pending, (state) => {
      state.repoToShow.data = {} as RepositoryDetailed;
      state.repoToShow.error = true;
      state.repoToShow.isLoading = false
    })

    builder.addCase(searchRepositoryById.fulfilled, (state, action) => {
      console.log(action);
      
      state.repoToShow.data = {
        description: action.payload.data.node.description,
        languages: action.payload.data.node.languages.nodes.map((node: Language) => node),
        name: action.payload.data.node.name,
        stargazerCount: action.payload.data.node.stargazerCount,
        lastCommitDate: new Date(action.payload.data.node.defaultBranchRef?.target.history.nodes[0]?.committedDate).toDateString(),
        url: action.payload.data.node.url,
        owner: action.payload.data.node.owner
      }
      state.repoToShow.error = true;
      state.repoToShow.isLoading = false
    })

    builder.addCase(searchRepositoryById.rejected, (state) => {
      state.repoToShow.data = {} as RepositoryDetailed;
      state.repoToShow.error = true;
      state.repoToShow.isLoading = false
    })

  }
});

export const { startFetching, hasError, fetchRepositoriesSuccess } = repositorySlice.actions

export default repositorySlice.reducer

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RepositoriesState } from "./redux/repositories"

export type Repository = {
  id: string
  name: string,
  stargazerCount: number,
  lastCommitDate: string | null,
  url: string
}

export type Language = {
  name: string
} 

export type Owner = {
  avatarUrl: string
  login: string
  url: string
}

export type RepositoryDetailed = {
  name: string
  stargazerCount: number
  lastCommitDate: string | null
  url: string
  description: string
  languages: Language[],
  owner: Owner
}

export type Node = {
  id: string
  name: string
  stargazerCount: number
  url: string
  description: string
  defaultBranchRef: {
    target: {
      history: {
        nodes: [
          {
            committedDate: string
          }
        ]
      }
    }
  }
  languages?: {
    nodes: Language[]
  }
  owner: {
    avatarUrl?: string
    login: string
    url?: string
  }
}

export type SearchResult = {
  data: {
    data: {
      search: {
        nodes: Node[]
      }
    }
  }
}

export type GetParams = {
  query?: string
  page?: string
}

export interface RootState {
  repositories: RepositoriesState;
  // Add other slices' states here if you have more than one slice
}

export type QueryParams = {
  query?: string | null
  page?: string | null
}


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

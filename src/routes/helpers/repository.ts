import { Dispatch } from "react";
import { LoaderFunctionArgs } from "react-router-dom";
import { AppThunk } from "@/types";
import { searchRepositoryById } from "@/redux/repositories";


export async function loader(dispatch: Dispatch<AppThunk>, args: LoaderFunctionArgs) {
  const repository = dispatch(searchRepositoryById(args.params.repositoryId || ''))

  return { repository };
}
import { AppThunk } from "../../types";
import { LoaderFunctionArgs } from "react-router-dom";
import { Dispatch } from "react";
import { searchRepositoryById } from "../../redux/repositories";


export async function loader(dispatch: Dispatch<AppThunk>, args: LoaderFunctionArgs) {
  const repository = dispatch(searchRepositoryById(args.params.repositoryId || ''))

  return { repository };
}
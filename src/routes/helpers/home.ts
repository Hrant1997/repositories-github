import { LoaderFunctionArgs } from "react-router-dom";
import { searchRepositories } from "../../redux/repositories";
import { AppThunk} from "../../types";
import { Dispatch } from "react";


export async function loader(dispatch: Dispatch<AppThunk>, args: LoaderFunctionArgs) {

  const { searchParams } = new URL(args.request.url);
  const search = searchParams.get('q');

  
  const repositories = dispatch(searchRepositories({ query: search || '' }))

  return { repositories };
}
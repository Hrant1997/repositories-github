
import { RootState } from "@/types";
import { useSelector } from "react-redux";
import RepositoryDetailed from "@/components/Repositories/RepositoryDetailed";
import Loader from "@/components/Loader";

export default function Repository() {
  const {data, isLoading} = useSelector((state: RootState) => state.repositories.repoToShow)

  if (isLoading) {
    return <Loader />
  }
  
  return <RepositoryDetailed repository={data} />
}
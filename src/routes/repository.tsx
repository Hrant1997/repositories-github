
import { RootState } from "../types";
import RepositoryDetailed from "../components/Repositories/RepositoryDetailed";
import { useSelector } from "react-redux";

export default function Repository() {
  const {data} = useSelector((state: RootState) => state.repositories.repoToShow)
  console.log(data);
  
  return <RepositoryDetailed repository={data} />
}
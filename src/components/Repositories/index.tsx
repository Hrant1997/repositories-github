import { Repository as RepositoryType } from "../../types";
import Repository from "./Repository";
import classes from './styles.module.scss';

type RepositoriesProps = {
  repositories: RepositoryType[];
};

const Repositories: React.FC<RepositoriesProps> = ({ repositories }) => {
  return (
    <ul className={classes.list}>
      {repositories.map((repository) => <Repository key={repository.url} repository={repository} />)}
    </ul>
  )
}

export default Repositories
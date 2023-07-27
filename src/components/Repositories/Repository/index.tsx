import { useNavigate } from "react-router-dom";
import { Repository as ReposytoryType } from "../../../types";
import classes from './styles.module.scss';
import classNames from "classnames";

type RepositoriyProps = {
  repository: ReposytoryType;
};

const Repository: React.FC<RepositoriyProps> = ({ repository }) => {
  const navigate = useNavigate();

  const handeleClickItem: React.MouseEventHandler<HTMLLIElement> = () => {
    
    if (repository.id) {
      navigate(`/repositories/${repository.id}`  )
    }
  }

  return (
    <li className={classes.item} onClick={handeleClickItem}>
      <p className={classes.name}>{repository.name}</p>
      <hr className={classes.divider} />
      <div className={classes.body}>
        <div className={classes.descriptionContainer}>
          <div className={classes.description}>
            <p>Stars count:</p>
            <p>{repository.stargazerCount}</p>
          </div>
          <div className={classNames(classes.description, classes.commitDate)}>
            <p>Last commit date:</p>
            <p>{repository.lastCommitDate}</p>
          </div>
        </div>
        <a onClick={e => e.stopPropagation()} target="_blank" href={repository.url} className={classes.link}>See repo on GitHub</a>
      </div>
    </li>
  )
}

export default Repository;
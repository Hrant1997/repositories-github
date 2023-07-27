import { RepositoryDetailed as ReposytoryType } from "../../../types";
import classes from './styles.module.scss';
import classNames from "classnames";

type RepositoriyProps = {
  repository: ReposytoryType;
};

const RepositoryDetailed: React.FC<RepositoriyProps> = ({ repository }) => {

  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
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
            <img src={repository.owner?.avatarUrl} alt={repository.owner?.login} />
            <a href={repository.owner?.url}> {repository.owner?.login}</a>
            <p className={classes.description}>Languages:</p>
            {
              repository.languages?.map(language => (
                <li key={language.name}>{language.name}</li>
              ))
            }
            <p className={classes.description}>Description: {repository.description}</p>

          </div>
          <a onClick={e => e.stopPropagation()} target="_blank" href={repository.url} className={classes.link}>See repo on GitHub</a>
        </div>
      </div>

    </div>
  )
}

export default RepositoryDetailed;
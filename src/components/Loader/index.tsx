import classes from './styles.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.ldsRing}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader
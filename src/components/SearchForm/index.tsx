
import classes from './styles.module.scss'

type SearchFormProps = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  placeholder: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  label: string
  buttonText?: string
}
const SearchForm: React.FC<SearchFormProps> = ({handleSubmit, value , onChange, placeholder, label, buttonText = 'Search'}) => {
  
  return (
    <form className={classes.searchForm} action="#" onSubmit={handleSubmit} >
      <label htmlFor="search">{label}</label>
      <input id="search" type="search" autoFocus placeholder={placeholder} value={value} onChange={onChange} />
      <button type='submit'>{buttonText}</button>
    </form>
  )
}

export default SearchForm
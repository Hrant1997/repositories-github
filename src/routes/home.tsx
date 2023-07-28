import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '@/types.ts';
import Repositories from '@/components/Repositories';
import SearchForm from '@/components/SearchForm/index.tsx';
import Pagination from '@/components/Pagination';
import Loader from '@/components/Loader/index.tsx';
import classes from './styles.module.scss';

const PAGE_SIZE = 10;

export default function Home() {
  const repositories = useSelector((state: RootState) => state.repositories)
  const [queryParams, setQueryParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState(queryParams.get('q') || '');

  useEffect(() => {
    const queryPage = queryParams.get('page');
    setCurrentPage(queryPage ? parseInt(queryPage || '', 10) : 1)
  }, [queryParams])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQueryParams((prev) => {
      const newParams: { page: string, q?: string } = { page: String(page) }
      const query = prev.get('q')

      if (query) {
        newParams.q = query
      }

      return newParams;
    })
  }

  const pageStartIndex = (currentPage - 1) * 10;
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    
    setQueryParams({ 
      page: '1',
      ...(searchText ? {q: searchText} : {})
    })
  }

  const handleChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e) =>{ 
    setSearchText(e.target.value)
  }

  
  return (
    <div>
      <SearchForm 
        handleSubmit={handleSubmit} 
        onChange={handleChangeSearchInput} 
        placeholder='Search repositories' 
        value={searchText}
        label='Search for reopsitories'
      />
      {
        repositories.isLoading
          ? <Loader /> 
          : <div className={classes.listContainer}>
              <Repositories repositories={repositories.data.slice(pageStartIndex, pageStartIndex + 10)} />
              <Pagination
                currentPage={currentPage}
                totalCount={repositories.data.length}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
              />
            </div>
      }
      
    </div>
  )
}
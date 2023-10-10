'use client'

import LoadingPosts from '@/components/LoadingPosts';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import SinglePostList from '@/components/SinglePostList';
import Error from '@/components/Error';
import { getAllPosts } from '@/utils/calls';
import { useEffect, useState } from 'react';
import Paginate from '@/components/Paginate';
import { Post } from '@/utils/interfaces';


export default function Home() {
  // page and limit for pagination
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)

  // search input
  const [search, setSearch] = useState<string>('')

  // post data 
  const [data, setData] = useState<Post[]>([])

  // fetch all data with pagination
  const { isLoading, isError, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ['POSTS'],
    queryFn: () => getAllPosts(page, limit),
    onSuccess: (allData) => {
      setData(allData)
    }
  })

  // refresh whenever page or limit changes
  useEffect(() => { refetch() }, [page, limit])

  // search 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search) {
      const filteredData = data.filter((i) => {
        return i.text.toLowerCase().includes(search.toLowerCase());
      });
      setData(filteredData)
    } else {
      refetch()
    }
  }

  return (
    <div className='home'>
      <section className="search">
        <div className="search-head">Search for blog posts by title...</div>
        <form className="search-input-container" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="eg 'jack and jill'"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn search-btn">
            <span>search</span>{' '} <SearchIcon />
          </button>
        </form>
      </section>

      <div className="posts-container">

        <div className="posts">
          {
            (isLoading || isFetching) && !isError ?
              (
                <div className="loading">
                  <LoadingPosts />
                </div>
              )
              :
              isSuccess ?
                (
                  <div className='posts-list'>
                    {data?.map((singlePost) => {
                      return (
                        <SinglePostList key={singlePost.id} data={singlePost} />
                      )
                    })}
                  </div>
                )
                :
                (
                  <Error message='Something  Happened!!' code={500} />
                )
          }

        </div>
        {
          !isError && (
            <Paginate page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
          )
        }
      </div>
    </div>
  )
}

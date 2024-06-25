import React from 'react'
import useSWR from 'swr'
import Link from "next/link";
import Loading from '../loading'

const fetcher = (url:string) => fetch(url).then(res => res.json())

interface Props {
    query: string
}

export default function SectionResult({query}:Props) {

  const {data, error} = useSWR(`https://api.github.com/search/users?q=${query}`,fetcher)
  let Loadings = !data && !error
  return (
    <div>
      <p>Sedang Mencari : {query}</p>
      <div>
        {Loadings && <Loading/>}
        {data && data.items.map((user:any,index:number) => {
          return (
            <ul key={index}>
              <li><Link href={`/search/${query}`}>{user.login}</Link></li>
              <li><Link href={user.repos_url}>{user.repos_url}</Link></li>
            </ul>
          )
        })}
      </div>
      </div>
  )
}

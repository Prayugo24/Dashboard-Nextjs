import React from 'react'

async function getData (params:string) {
    const getApi = await fetch(`https://api.github.com/users/${params}`)
    return getApi.json()
}

export default async function DetailSearxh({params}:{params:{slug:string}}) {
    const data = await getData(params.slug)
  return (
    <div>
       <p>Detail User {params.slug}</p> 
       <div>
        {JSON.stringify(data)}
       </div>
    </div>
  )
}

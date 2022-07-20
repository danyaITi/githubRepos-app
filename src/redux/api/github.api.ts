import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { nameRepo, serverResp, Users } from '../../models/models'

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://api.github.com/'
    }),
    refetchOnFocus:true,
    endpoints: build => ({
        searchUsers:  build.query<Users[], string>({
            query: (search: string) => ({
                url:`search/users`,
                params : {
                    q: search,
                }
            }),
            transformResponse: (resp:serverResp) => resp.items
        }),
        clickUsers: build.query<nameRepo[],string>({
            query: (userName:string) => ({
                url: `users/${userName}/repos`
            })
        })
    })
})

export const { useSearchUsersQuery, useLazyClickUsersQuery } = githubApi
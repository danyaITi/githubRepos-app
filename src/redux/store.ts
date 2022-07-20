import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { githubApi } from './api/github.api'
import repo from "./slice/repoSlice"

export const store = configureStore({
    reducer:{
        [githubApi.reducerPath]:githubApi.reducer,
        repo
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
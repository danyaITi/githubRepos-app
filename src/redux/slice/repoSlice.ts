import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RepoCard } from '../../components/repCard'

interface favoriteState {
  favorites: RepoCard[]
}

const initialState: favoriteState = {
  favorites: JSON.parse(localStorage.getItem('key') ?? '[]')
}

const repoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addRepo: (state,action: PayloadAction<RepoCard>) => {
      state.favorites.push(action.payload)
      localStorage.setItem('key', JSON.stringify(state.favorites))
    },

    deleteRepo: (state,action) => {
      state.favorites = state.favorites.filter((rep) => rep.id !== action.payload)
      localStorage.setItem('key', JSON.stringify(state.favorites))
    }
   
  }
})

export const { addRepo, deleteRepo } = repoSlice.actions

export default repoSlice.reducer
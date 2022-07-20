import React, { MouseEvent } from "react"
import { useDispatch } from "react-redux"
import { nameRepo } from "../models/models"
import { addRepo } from "../redux/slice/repoSlice"

type CardProps ={
    repo: nameRepo
}

export type RepoCard = {
    name: string,
    forks: number,
    watchers: number,
    desc: string,
    url: string,
    id: number
}

const RepCard: React.FC<CardProps> = ({repo} )=> {
    const dispatch = useDispatch()
    const addToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

         const repoCard = {
            name: repo.full_name,
            forks: repo.forks,
            watchers: repo.watchers,
            desc: repo?.description,
            url: repo.html_url,
            id: repo.id,
        }
        dispatch(addRepo(repoCard))
    }


    return (
        <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <h2 className="text-lg font-bold">{repo.full_name}</h2>
            <p className="text-sm">
                 Forks: <span className="font-bold mr-2">{repo.forks}</span>
                Watchers: <span className="font-bold">{repo.watchers}</span>
            </p>
            <p className="text-sm font-thin">{repo?.description}</p>
            <button className="mt-3 py-2 px-4 bg-green-600 mr-2 rounded hover:shadow-md transition-all"  onClick={addToFavourite} >
                Add
            </button>
      </div>
    )
}

export default RepCard
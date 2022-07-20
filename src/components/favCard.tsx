import React, { MouseEvent } from "react"
import { useDispatch } from "react-redux"
import { deleteRepo } from "../redux/slice/repoSlice"

type FavCardProps = {
    name: string,
    forks: number,
    watchers: number,
    desc: string,
    url: string,
    id: number
}

const FavCard: React.FC<FavCardProps> = ({name, forks, watchers, desc, url , id}) => {
    const dispatch = useDispatch()

    const removeFromFavourite = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteRepo(id))
    }

    return (
        <a href={url} target="_blank">
            <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm">
                    Forks: <span className="font-bold mr-2">{forks}</span>
                    Watchers: <span className="font-bold">{watchers}</span>
                </p>
                <p className="text-sm font-thin">{desc}</p>
                <button className="mt-3 py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all" onClick={removeFromFavourite}>Remove</button>
            </div>
        </a>
    )
}

export default FavCard
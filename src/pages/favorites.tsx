import React  from "react";
import { useSelector } from "react-redux";
import EmptyFav from "../components/emptyFav";
import FavCard from "../components/favCard";
import { RepoCard } from "../components/repCard";
import { RootState } from "../redux/store";

const Favorites: React.FC = () => {
    const repSelect = useSelector((state:RootState)=> state.repo.favorites)

    if(!repSelect.length){
        return <EmptyFav/>
    }

    return(
    <div className="flex justify-center pt-10 mx-auto h-screen">
        <div className="relative w-[560px]">
            {repSelect.map((obj:RepoCard)=> <FavCard {...obj} key={obj.id}/>) }
        </div>
    </div>
    )
}

export default Favorites


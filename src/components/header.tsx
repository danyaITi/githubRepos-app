import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div className="flex justify-between mr-5 h-16 items-center ">
            <h1 className="ml-12 text-xl">GitHub Repositories</h1>
            <div className="flex">
                <Link to="/">
                    <div className= "mr-4 hover:shadow-md hover:bg-blue-100 py-1 px-3">
                        Home
                    </div>
                </Link>
                <Link to="/fav">
                    <div className= "mr-4 hover:shadow-md hover:bg-blue-100 py-1 px-3">
                        Favorites
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Header
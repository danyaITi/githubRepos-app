import React, { useEffect, useRef, useState } from "react";
import RepCard from "../components/repCard";
import useDebounce from "../hooks/debounce";
import { useLazyClickUsersQuery, useSearchUsersQuery } from "../redux/api/github.api";

type OutsideCkick = MouseEvent & {
    path: Node[];
  };

const Home: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value,setValue] = useState('')
    const [debounce,setDebounce] = useState(false)
    const debounced = useDebounce(value, 300)

    const {isError, data} = useSearchUsersQuery(debounced, {
        skip:debounced.length<2,
        refetchOnFocus: true
    }) 
    const [getRepos, {data: repos}] = useLazyClickUsersQuery()
    

    useEffect(()=>{
        setDebounce(true)
    },[debounced])

    useEffect(()=>{
        const clickOutside = (event: MouseEvent) =>{
            const ev = event as OutsideCkick
            if(inputRef.current && !ev.path.includes(inputRef.current)){
                setDebounce(false)
            }
        }
        document.body.addEventListener('click', clickOutside)

        return () => {
            document.body.removeEventListener('click', clickOutside)
        }

    },[])

    const clickUser = (userName:string) => {
        getRepos(userName)
        setDebounce(false)
    }
    
    return (
        <div className="flex justify-center pt-10 mx-auto h-screen relative">
            <div className="relative w-[560px] ">
                <input ref={inputRef} type="text" className="border py-2 px-2 w-full h-[35px] mb-1" value={value} onChange={(e)=>setValue(e.target.value)} />

                {isError && <h1 className="text-center text-red-800 text-2xl">Error 400</h1> }
                {!repos && <h2 className="mt-4 text-xl text-center animate-bounce h-10">Введите username</h2>}

                {debounce && <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-auto shadow-md bg-white">
                    {data?.map((user)=> <li onClick={()=>clickUser(user.login)} key={user.id} className="py-2 px-4 hover:bg-yellow-200 transition-colors cursor-pointer">{user.login}</li>)}
                </ul>}
                <div className="container">
                    { repos?.map(repo => <RepCard repo={repo} key={repo.id}/>) }
                </div>
            </div>
        </div>
    )
}

export default Home
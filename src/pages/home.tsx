import React, { useEffect, useRef, useState } from "react";
import RepCard from "../components/repCard";
import useDebounce from "../hooks/debounce";
import { useLazyClickUsersQuery, useSearchUsersQuery } from "../redux/api/github.api";
import './home.css'
import z from "../assets/img/z.png"

type OutsideCkick = MouseEvent & {
    path: Node[];
  };

const Home: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value,setValue] = useState('')
    const [debounce,setDebounce] = useState(false)
    const debounced = useDebounce(value, 300)

    const {isError, data, isLoading: loading} = useSearchUsersQuery(debounced, {
        skip:debounced.length<2,
        refetchOnFocus: true
    }) 
    const [getRepos, {data: repos, isLoading, isError:err}] = useLazyClickUsersQuery()

    

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
        <div className="flex justify-center pt-10 mx-auto bg-slate-300 h-screen relative">
            <div className="repos-box relative w-[560px] bg-slate-100 border h-[90vh] overflow-y-auto ">
                <div className="flex justify-center mt-5">
                    <input ref={inputRef} type="text" className="border py-2 px-2 w-full h-[35px] w-[60%] mb-1" value={value} onChange={(e)=>setValue(e.target.value)} />
                </div>

                {isError && <h1 className="text-center text-red-800 text-2xl">Error 400</h1> }
                {!isLoading && <h2 className="mt-4 text-xl text-center animate-bounce h-10">Введите username</h2>}

                {debounce && <ul className="list-none absolute top-[55px] z-10 mx-5 left-0 right-0 max-h-[200px] overflow-y-auto shadow-md bg-white">
                 {loading ? (<h1 className="input-box-loading text-center">Loading...</h1>) 
                    : <>{data?.map((user)=> <li onClick={()=>clickUser(user.login)} key={user.id} className="py-2 px-4 hover:bg-yellow-200 transition-colors cursor-pointer">{user.login}</li>)}</>
                }</ul>}
                
                {isLoading 
                ? (<div className="repos-box-loading__abs"><div className="repos-box-loading"><div></div><div></div><div></div><div></div></div></div>) 
                : <>{repos 
                ?  <div className="container">
                    { repos?.map((repo) => <RepCard repo={repo} key={repo.id}/>) }
                </div> 
                : <img src={z} alt="" className="repos-box__empty h-[350px]" />}</> }
            </div>
        </div>
    )
}

export default Home
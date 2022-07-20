import React, { useState, useEffect } from 'react';

export default function useDebounce(value:string, delay:number){
const [debounce,setDebounce] = useState(value)

useEffect(()=>{
    const handler = setTimeout(()=>{
        setDebounce(value)
    },delay)

    return () => clearTimeout(handler)
},[value])

return debounce

}

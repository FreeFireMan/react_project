import React, {useEffect} from 'react';
import useFetch from "../hooks/useFetch";

const CurrentUserChecker = ({children}) => {
    const [{response},doFetch] = useFetch('/user')

    useEffect(() =>{
        doFetch()
        console.log('test');
    },[])

    return children
}

export default CurrentUserChecker

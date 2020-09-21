import React, {useEffect} from 'react'
import useFetch from "../hooks/useFetch";

const PopularTags = () => {
    const [{response, isLoading, error}, doFetch] = useFetch('/tags');

    useEffect(() => {
        doFetch()

    },[doFetch])
    return <div> popular tags</div>
}

export default PopularTags

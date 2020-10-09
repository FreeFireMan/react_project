import React from 'react'
import { BsHeart,BsHeartFill } from 'react-icons/bs'
import useFetch from "../hooks/useFetch";

const AddToFavorites = ({isFavorited, favoritedCount, articleSlug}) =>{
    const apiUrl = `/articles/${articleSlug}`
    const [{response},doFetch] = useFetch(apiUrl);
    function handleLike(event) {

    }

    return(
        <button className='btn badge-light' onClick={handleLike}>
            {!isFavorited ? <BsHeart/> : <BsHeartFill color='green'/>}
                &nbsp;{favoritedCount}
        </button>
    )
}

export default AddToFavorites

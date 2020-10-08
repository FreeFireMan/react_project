import {stringify} from "query-string";
import React, {useEffect, Fragment} from 'react'

import useFetch from "../../hooks/useFetch";
import Feed from "../../components/feed";
import Pagination from "../../components/pagination";
import {getPaginatior, limit} from "../../utils";
import PopularTags from "../../components/popularTags";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/loading";
import FeedToggler from "../../components/feedToggler";

const GlobalFeed = ({location,match:{url}}) => {

    const {offset,currentPage} = getPaginatior(location.search);
    const stringifiedParams = stringify({
        limit,
        offset
    })

    const apiUrl = `/articles?${stringifiedParams}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

    useEffect(( )=> {
        doFetch()
    },[doFetch,currentPage])
    console.log('globalfeed');


    return (
        <div className='home-page'>
            <div className='banner'>
                <div className='container'>

                </div>
            </div>
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-9'>
                        <FeedToggler />
                        {isLoading && <Loading/>}
                        {error && <ErrorMessage/>}
                        {!isLoading && response && (
                            <Fragment>
                                <Feed articles={response.articles} />
                                <Pagination currentPage={currentPage} limit={limit} total={500} url={url}/>
                            </Fragment>
                        )}

                    </div>
                    <div className='col-md-3'>
                        <PopularTags />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GlobalFeed


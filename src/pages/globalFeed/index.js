import React, {useEffect, Fragment} from 'react'

import useFetch from "../../hooks/useFetch";
import Feed from "../../components/feed";
import Pagination from "../../components/pagination";

const GlobalFeed = (props) => {
    const apiUrl = '/articles?limit=10&offset=0'
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

    useEffect(( )=> {
        doFetch()
    },[doFetch])


    return (
        <div className='home-page'>
            <div className='banner'>
                <div className='container'>

                </div>
            </div>
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-9'>
                        {isLoading && <div>Loading....</div>}
                        {error && <div>Some error happened</div>}
                        {!isLoading && response && (
                            <Fragment>
                                <Feed articles={response.articles} />
                                <Pagination currentPage={1} limit={10} total={500} url='/'/>
                            </Fragment>
                        )}

                    </div>
                    <div className='col-md-3'>
                        popupalr tags
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GlobalFeed


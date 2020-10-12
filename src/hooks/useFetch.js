import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";
// import  './../intercept'

export default (url) => {
    const baseUrl = 'http://127.0.0.1:8000'
    const [isLoading, setIsLoading] =  useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [token] = useLocalStorage('token')


    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    },[])


    useEffect(() => {
        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : '',
                    'Content-Type': 'application/json'
                }
            }
        }
         // console.log('requestOptions',requestOptions);

        if (!isLoading) {
            return
        }

        // axios(baseUrl + url, requestOptions)
        //     .then(res => {
        //          console.log('success', res);
        //         setResponse(res.data)
        //         setIsLoading(false)
        //     })
        //     .catch(({response}) => {
        //         setIsLoading(false)
        //          console.log('ERROR', response);
        //         setError(
        //             response.data
        //             ? response.data
        //                 :response
        //         )
        //     })
        console.log("requestOptions");
        console.log(requestOptions);

        fetch(baseUrl + url, requestOptions)
            .then(response => {
                if( ![400, 415].includes(response.status)){
                    return response.json()
                }else{

                    setIsLoading(false)
                    response.json().then( res=>{
                        console.log('ERROR', res);
                        setError(res)
                        }
                    )
                }
            })
            .then(res => {
                 console.log('success', res);
                setResponse(res)
                setIsLoading(false)
            })
            .catch((response) => {
                setIsLoading(false)
                 console.log('fetch_ERROR', response);
                setError(response)
            })

    },[isLoading,url,options,token])

    return [{isLoading, response, error}, doFetch]
}

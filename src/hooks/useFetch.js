import {useEffect, useState} from "react";
import axios from "axios";

export default (url) => {
    const baseUrl = 'https://conduit.productionready.io/api'
    const [isLoading, setIsLoading] =  useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})

    const doFetch = (options = {}) => {
        setOptions(options)
    }
    useEffect(() => {
        if (!isLoading) {
            return
        }
        axios(baseUrl + url, options)
            .then(res => {
                console.log('success', res);
                setResponse(res.data)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                console.log('ERROR', error);
                setError(error.response.data)
            })
    })

    return [{isLoading, response, error}, doFetch]
}

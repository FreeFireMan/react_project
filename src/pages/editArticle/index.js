import React, {useContext, useEffect, useState} from 'react'
import ArticleForm from "../../components/articleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";

const EditArticle = ({match}) => {
    const {slug} = match.params
    const [currentUserState] = useContext(CurrentUserContext)
    const apiUrl = `/articles/${slug}`
    const [{response: doGetResponse, error: doGeterror}, doGetFetch] = useFetch(apiUrl)
    const [{response: doPutResponse, error: doPuterror}, doPutFetch] = useFetch(apiUrl)
    const [initialValue, setInitialValue] = useState(null)


    const handleSubmit = (article) => {
        doFetch({
            method: 'PUT',
            data: {
                article
            }
        })
    }

    useEffect(() => {


    }, )



    return (
        <ArticleForm
            errors={(error && error.errors) || {}}
            initialValue={initialValue}
            onSubmit={handleSubmit}
        />
    )
}

export default EditArticle

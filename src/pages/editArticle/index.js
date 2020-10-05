import React, {useContext, useEffect, useState} from 'react'
import ArticleForm from "../../components/articleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";

const EditArticle = ({match}) => {
    const {slug} = match.params
    const [currentUserState] = useContext(CurrentUserContext)
    const apiUrl = "/articles"
    const [{response, error}, doFetch] = useFetch(apiUrl)
    const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
    const initialValue = {
        title: '',
        description: '',
        body: '',
        tagList: []
    }

    const handleSubmit = (article) => {
        doFetch({
            method: 'POST',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        if (!response) {
            return
        }
        setIsSuccessSubmit(true)

    }, [response])

    if (isSuccessSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`}/>
    }
    if (currentUserState.isLoggedIn === false) {
        return <Redirect to='/'/>
    }

    return (
        <ArticleForm
            // errors={(error && error.errors) || {}}
            // initialValue={initialValue}
            // onSubmit={handleSubmit}
        />
    )
}

export default EditArticle

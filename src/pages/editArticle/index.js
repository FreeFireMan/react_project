import React, {useContext, useEffect, useState} from 'react'
import ArticleForm from "../../components/articleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";

const EditArticle = ({match}) => {
    const {slug} = match.params
    const [currentUserState] = useContext(CurrentUserContext)
    const apiUrl = `/articles/${slug}`
    const [{response: doGetResponse, error: doGetError}, doGetFetch] = useFetch(apiUrl)
    const [{response: doPutResponse, error: doPutError}, doPutFetch] = useFetch(apiUrl)
    const [initialValue, setInitialValue] = useState(null)
    const [isSuccessSubmit,setIsSuccessSubmit] = useState(false)


    const handleSubmit = (article) => {
        doPutFetch({
            method: 'PUT',
            data: {
                article
            }
        })
    }

    useEffect(doGetFetch,[doGetFetch] )
    useEffect(()=>{
        if(!doGetResponse){
            return
        }
        setInitialValue({
            title: doGetResponse.article.title,
            description: doGetResponse.article.description,
            body: doGetResponse.article.body,
            tagList: doGetResponse.article.tagList,
        })

    },[doGetResponse])
    useEffect(() =>{
        if(!doPutResponse){
           return
        }
        setIsSuccessSubmit(true)
    },[doPutResponse])

    if(isSuccessSubmit){
        return  <Redirect to={`/articles/${slug}`} />
    }

    if(currentUserState.isLoggedIn === false){
        return <Redirect to='/'/>
    }


    return (
        <ArticleForm
            errors={(doPutError && doPutError.errors) || {}}
            initialValue={initialValue}
            onSubmit={handleSubmit}
        />
    )
}

export default EditArticle

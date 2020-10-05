import React, {useContext, useEffect, useState} from 'react'
import ArticleForm from "../../components/articleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/currentUser";

const EditArticle = ({match}) => {
    const {slug} = match.params
    const [currentUserState] = useContext(CurrentUserContext)
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse,error: fetchError},doFetchArticle] = useFetch(apiUrl)
    const [{response: updateArticleResponse,updateError},doUpdateArticle] = useFetch(apiUrl)
    const [initialValue, setInitialValue] = useState(null)

    const handleSubmit = (article) => {
        doUpdateArticle({
            method: "PUT",
            data: {
                article
            }
        })
    }

    useEffect( doFetchArticle, [doFetchArticle])
    useEffect(() =>{
        if(!fetchArticleResponse){
            return
        }
        const {article} = fetchArticleResponse
        setInitialValue({
            title: article.title,
            body: article.body,
            tagList: article.tagList,
            description : article.description,
        })
    },[fetchArticleResponse] )

    console.log(updateError);

    return (
        <ArticleForm
            errors={(updateError && updateError.errors) || {}}
            initialValue={initialValue}
            onSubmit={handleSubmit}
        />
    )
}

export default EditArticle

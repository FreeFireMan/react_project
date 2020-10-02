import React, {useEffect, useState} from 'react'
import ArticleForm from "../../components/articleForm";
import useFetch from "../../hooks/useFetch";
import {Redirect} from "react-router-dom";

const CreateArticle = () => {
    const apiUrl = "/articles"
    const [{response, error}, doFetch] = useFetch(apiUrl)
    const [isSuccessSubmit,setIsSuccessSubmit] = useState(false)
    const initialValue = {
        title:'',
        description:'',
        body:'',
        tagList:[]
     }

    const handleSubmit = (article) => {
        console.log('handleSubmit', article);
        doFetch({
            method: 'POST',
            data: {
                article
            }
        })
    }

    useEffect(() =>{
        if(!response){
            return
        }
        setIsSuccessSubmit(true)

    },[response])

    if(isSuccessSubmit){
        return  <Redirect to={`/articles/${response.article.slug}`} />
    }

    return (
        <ArticleForm
            errors={(error && error.errors) || {}}
            initialValue={initialValue}
            onSubmit={handleSubmit}
        />
    )
}

export default CreateArticle

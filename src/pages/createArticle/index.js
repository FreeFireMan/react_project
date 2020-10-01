import React from 'react'
import ArticleForm from "../../components/articleForm";

const CreateArticle = () => {
    const errors = {}
    const initialValue = {}
    const handleSubmit = (data) => {
        console.log('handleSubmit',data);
    }
    return(
        <ArticleForm errors={errors} initialValue={initialValue} onSubmit={handleSubmit}/>
    )
}

export default CreateArticle

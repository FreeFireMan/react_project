import React, {useContext, useEffect, useState} from 'react'
import useFetch from "../../hooks/useFetch";
import {Link,Redirect} from "react-router-dom";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";
import TagList from "../../components/tagList";
import {CurrentUserContext} from "../../contexts/currentUser";

const Article = ({match: {params}}) => {
    const apiUrl = `/articles/${params.slug}`;

    const [{error, response, isLoading}, doFetch] = useFetch(apiUrl)
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContext)
    const [isSuccessDelete, setIsSuccessDelete] = useState(false)

    const isAuthor = () => {
        if (!response || !currentUserState.isLoggedIn) {
            return false
        }
        return (response.article.author.username === currentUserState.currentUser.username)
    }

    useEffect(() => {
        doFetch()
    }, [doFetch])

    const deleteArticle = ()=>{
        doDeleteArticle({
            method: 'DELETE'
        })

    }
    useEffect(()=>{
        if(!deleteArticleResponse){
            return
        }
        setIsSuccessDelete(true)
    },[deleteArticleResponse])

    if(isSuccessDelete){
        return <Redirect to={'/'}/>
    }

    return (
        <div className="article-page">
            <div className='banner'>
                {response && (
                    <div className='article-container'>
                        <h1>{response.article.title}</h1>
                        <div className='article-meta'>
                            <Link to={`/profiles/${response.article.author.username}`}>
                                <img src={response.article.author.image} alt=""/>
                            </Link>
                            <div className='info'>
                                <Link to={`/profiles/${response.article.author.username}`}>
                                    {response.article.author.username}
                                </Link>
                                <span className='data'>{response.article.createdAt}</span>
                            </div>
                            {
                                isAuthor() && (
                                    <span>
                                        <Link className='btn btn-outline-secondary btn-sm'
                                              to={`/articles/${response.article.slug}/edit`}>
                                            EDIT
                                        </Link>
                                        <button
                                            className='btn btn-outline-danger btn-sm'
                                            onClick={deleteArticle}
                                        >
                                            DELETE
                                        </button>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
            <div className='container page'>
                {isLoading && <Loading/>}
                {error && <ErrorMessage/>}
                {!isLoading && response && (
                    <div className='row article-content'>
                        <div className='col-xs-12'>
                            <div>
                                <p>
                                    {response.article.body}
                                </p>
                            </div>
                            <TagList tags={response.article.tagList}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Article

import React, {useEffect, useState} from 'react'
import BackendErrorMessage from "./backendErrorMessage";

const ArticleForm = ({onSubmit, errors, initialValue}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [description, setDescription] = useState('')
    const [tagList, setTagList] = useState('')
    const article = {
        title,
        body,
        description,
        tagList: tagList.split(' ')
    }
    useEffect(() =>{
        if(!initialValue){
            return
        }
        setTitle(initialValue.title)
        setBody(initialValue.body)
        setDescription(initialValue.description)
        setTagList(initialValue.tagList.join(' '))
    },[initialValue] )

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(article)
    }


    return (
        <div className="editor-page">
            <div className="container-page">
                <div className='row'>
                    <div className='col-md-10 offset-md-1 col-xs-12'>
                        {errors && <BackendErrorMessage backendError={errors}/>}
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder='Article title'
                                        value={title}
                                        onChange={e=>setTitle(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder='What this article about?'
                                        value={description}
                                        onChange={e=>setDescription(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <textarea
                                        className="form-control"
                                        rows="10"
                                        placeholder='Write your article (in markdown)'
                                        value={body}
                                        onChange={e=>setBody(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder='Enter tags'
                                        value={tagList}
                                        onChange={e=>setTagList(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <button
                                        type='submit'
                                        className="btn btn-lg badge-pill btn-primary"
                                    >Publish Article</button>
                                </fieldset>
                            </fieldset>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ArticleForm

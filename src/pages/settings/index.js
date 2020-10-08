import React, {useContext, useEffect, useState} from 'react'

import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import BackendErrorMessage from "../../components/backendErrorMessage";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Redirect} from "react-router-dom";

const Settings = ()=>{
    const [,setToken] = useLocalStorage('token');
    const [currentUserState,dispatch] = useContext(CurrentUserContext)
    const apiUrl = '/user'
    const [{response,error}, doFetch] = useFetch(apiUrl)
    const [image,setImage] = useState('');
    const [username,setUserName] = useState('');
    const [isSuccessFullLogout,setIsSuccessFullLogout] = useState(false);
    const [bio,setBio] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    console.log(currentUserState);

    function handleSubmit(event) {
        event.preventDefault()
        doFetch({
            method: 'PUT',
            data:{
               user:{
                   ...currentUserState.currentUser,
                   image,
                   username,
                   bio,
                   email,
                   password,
               }
            }
        })
    }

    function logout(event) {
        event.preventDefault()
        setToken('')
        dispatch({type:'LOGOUT'})
        setIsSuccessFullLogout(true)

    }
    useEffect(()=>{
        if(!currentUserState.currentUser){
            return
        }
        const {currentUser:{image,username,bio,email}} = currentUserState;
        setImage(image)
        setUserName(username)
        setBio(bio)
        setEmail(email)

    },[currentUserState.currentUser])

    useEffect(()=>{
        if(!response){
            return
        }
        dispatch({type:'SET_AUTHORIZED',payload:response.user})
    },[response, dispatch])

    if(isSuccessFullLogout){
        return <Redirect to="/"/>
    }

    return(
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-center">Your settings</h1>
                        {error && <BackendErrorMessage backendError={error.errors}/>}
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className='form-control form-control-lg'
                                        placeholder='URL of profile picture'
                                        value={image}
                                        onChange={e => setImage(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className='form-control form-control-lg'
                                        placeholder='Username'
                                        value={username}
                                        onChange={e => setUserName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className='form-control form-control-lg'
                                        rows='8'
                                        placeholder='Short bio'
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="email"
                                        className='form-control form-control-lg'
                                        placeholder='Email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        className='form-control form-control-lg'
                                        placeholder='NEW Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button type="submit" className="btn btn-lg btn-primary badge-pill" >Update settings</button>
                            </fieldset>
                        </form>
                        <hr/>
                        <button className='btn btn-outline-danger' onClick={logout}>Or click here for logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings

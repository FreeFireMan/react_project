import React, {useState, useEffect, useContext} from 'react'
import {Link, Redirect } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {CurrentUserContext} from '../../contexts/currentUser'
import BackendErrorMessage from "./components/backendErrorMessage";


const Authentication = (props) => {
    const isLogin = props.match.path === '/login'
    const pageTitle = isLogin ? 'Sing In' : 'Sing Up'
    const descriptionLink = isLogin ? '/register' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLogin ? '/users/login' : '/users'
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
    const [{isLoading, response,error},doFetch] = useFetch(apiUrl)
    const [,setToken] = useLocalStorage('token')
    const [,setCurrentUserState] = useContext(CurrentUserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = isLogin ? {email, password} : {email, password, username};
        // console.log(user);
        doFetch({
            method: 'post',
            data: {
                user
            }
        })
    }
    useEffect(()=>{
        if(!response){
            return;
        }
        setToken(response.user.token);
        setIsSuccessfullSubmit(true)
        setCurrentUserState(state => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response.user
        }));
    },[response,setToken,setCurrentUserState])
    if(isSuccessfullSubmit){
        return <Redirect to='/'/>
    }
    return (
        <div className="auth-page">
            <div className='container'>
                <div className="row ">
                    <div className="col-md-6 offset-sm-3 col-xs-12">
                        <h1 className="text-center">{pageTitle}</h1>
                        <p className="text-xs-center">
                            <Link to={descriptionLink}>{descriptionText}</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            {error && <BackendErrorMessage backendError={error.errors} />}
                            <fieldset>
                                {!isLogin && (
                                        <fieldset className="form-group">
                                            <input

                                                type='text'
                                                className="form-control form-control-lg"
                                                placeholder="Username"
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}

                                            />
                                        </fieldset>
                                        )}
                                <fieldset className="form-group">
                                    <input
                                        name='email'
                                        type='email'
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}

                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type='password'
                                        className="form-control form-control-lg"
                                        placeholder="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}

                                    />
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-right"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {pageTitle}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Authentication


import React, {useState, useEffect, useContext} from 'react'
import {Link, Redirect } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {CurrentUserContext} from '../../contexts/currentUser'
import BackendErrorMessage from "../../components/backendErrorMessage";

const Authentication = (props) => {

    const isLogin = props.match.path === '/login'
    const pageTitle = isLogin ? 'Sing In' : 'Sing Up'
    const descriptionLink = isLogin ? '/signup' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const apiUrl = !isLogin ? '/signup' : '/token/'
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
    const [{isLoading, response,error},doFetch] = useFetch(apiUrl)
    const [,setToken] = useLocalStorage('token')
    const [currentUser,dispatch] = useContext(CurrentUserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = isLogin ? {username, password} : {email, password, username, profile: {phone: "+380978065905"}};
        const body = JSON.stringify(user)
        console.log('user');
        console.log(body);
        doFetch({
            method: 'post',
            body
        })
    }

    useEffect(()=>{
        if(!response){
            return;
        }
        if(response.hasOwnProperty('refresh')){
            setToken(JSON.stringify(response));
            setIsSuccessfullSubmit(true)
            // dispatch({
            //     type: 'SET_AUTHORIZED',
            //     payload: response.user
            // })
        }
    },[response,setToken,dispatch])

    if(isSuccessfullSubmit){
        return <Redirect to='/'/>
    }

    console.log('error authentication');
    console.log(error);

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
                            {error && <BackendErrorMessage backendError={error} />}
                            <fieldset>
                                {!isLogin && (
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

                                        )}
                                <fieldset className="form-group">
                                    <input

                                        type='text'
                                        className="form-control form-control-lg"
                                        placeholder="Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}

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

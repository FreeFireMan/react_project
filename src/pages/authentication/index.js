import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import useFetch from "../../hooks/useFetch";


const Authentication = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [{isLoading, response, error},doFetch] = useFetch('/user/login')

    // console.log('email',email,pass);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('')
        setPass('')
        doFetch({
            method: 'post',
            data: {
                user: {
                    email: 'email',
                    password: 'password'
                }
            }
        })
    }



    return (
        <div className="auth-page">
            <div className='container'>
                <div className="row ">
                    <div className="col-md-6 offset-sm-3 col-xs-12">
                        <h1 className="text-center">Login</h1>
                        <p className="text-xs-center">
                            <Link to='register'> Need an account?</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
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
                                        value={pass}
                                        onChange={e => setPass(e.target.value)}

                                    />
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-right"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    Sing in
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

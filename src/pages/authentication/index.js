import React from 'react'
import {Link} from "react-router-dom";

const Authentication = () => {
    return (
        <div className="auth-page">
            <div className='container'>
                <div className="row ">
                    <div className="col-md-6 offset-sm-3 col-xs-12">
                        <h1 className="text-center">Login</h1>
                        <p className="text-xs-center">
                            <Link to='register'> Need an account?</Link>
                        </p>
                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type='email'
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type='password'
                                        className="form-control form-control-lg"
                                        placeholder="password"
                                    />
                                </fieldset>
                                <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
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

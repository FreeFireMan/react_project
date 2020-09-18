import React, {useContext,Fragment} from 'react'
import {Link, NavLink} from "react-router-dom";
import {CurrentUserContext} from "../contexts/currentUser";

const TopBar = () =>{
    const [currentUserState] = useContext(CurrentUserContext)
    console.log(currentUserState);
    return (
        <nav className='navbar navbar-expand-lg  navbar-dark bg-dark'>
            <div className='container'>
                <Link to='/' className='navbar-brand lemon'>
                    MyReactProject
                </Link>
                <ul className='nav navbar-nav pull-xs-right'>
                    <li className='nav-item'  >
                        <NavLink to='/' className='nav-link' exact>
                            Home
                        </NavLink>
                    </li>
                    {!currentUserState.isLoggedIn && (
                        <Fragment>
                            <li className='nav-item'  >
                                <NavLink to='/login' className='nav-link'>
                                    Sing in
                                </NavLink>
                            </li>
                            <li className='nav-item'  >
                                <NavLink to='/register' className='nav-link'>
                                    Sing up
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                    {currentUserState.isLoggedIn && (
                        <Fragment>
                            <li className='nav-item'>

                                <NavLink to='/articles/new' className='nav-link'>
                                     New Post &nbsp;
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-receipt"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                                        <path fillRule="evenodd"
                                              d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </NavLink>

                            </li>
                            <li className='nav-item'>
                                <NavLink
                                    to={`/profiles/${currentUserState.currentUser.username}`}
                                    className='nav-link'>
                                    <img
                                        style={ {
                                            verticalAlign: 'middle',
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%'
                                        }}
                                        src={currentUserState.currentUser.image}
                                        alt=""
                                    />
                                    &nbsp;
                                    {currentUserState.currentUser.username}
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default TopBar

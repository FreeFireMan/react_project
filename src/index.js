import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {HashRouter as Router} from 'react-router-dom'
import App from './App';
import {CurrentUserProvider} from "./contexts/currentUser";
import CurrentUserChecker from "./components/currentUserChecker";



ReactDOM.render(
    <CurrentUserProvider>
        <CurrentUserChecker>
        <Router>
            <App/>
        </Router>
        </CurrentUserChecker>
    </CurrentUserProvider>
 ,
  document.getElementById('root')
);


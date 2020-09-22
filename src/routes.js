import {Switch, Route} from 'react-router-dom'
import React from 'react'

import GlobalFeed from "./pages/globalFeed";
import Article from "./pages/article";
import Authentication from "./pages/authentication";
import TagFeed from "./pages/tagFeed";
import YourFeed from "./pages/yourFeed";

export default ()=>{
    return (
        <Switch>
            <Route path="/" component={GlobalFeed} exact />
            <Route path="/feed" component={YourFeed} />
            <Route path="/tags/:slug" component={TagFeed} />
            <Route path="/article/:slug" component={Article}/>
            <Route path="/login" component={Authentication}/>
            <Route path="/register" component={Authentication}/>
        </Switch>
    )
}

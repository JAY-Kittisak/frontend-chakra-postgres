import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from '../pages/Index'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import PageNotFound from '../pages/PageNotFound'
import CreatePost from '../pages/Create-post'
import Factories from '../pages/Factories'

interface Props { }

const Routes: React.FC<Props> = () => {
    return (
            <Switch>
                <Route exact path="/create-post">
                    <CreatePost />
                </Route>
                <Route exact path="/factories">
                    <Factories />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
        </Switch>
    )
}

export default Routes


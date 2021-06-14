import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from '../pages/Index'
import Register from '../pages/Register'
import Login from '../pages/Login'
import PagePost from '../pages/PagePost'
import Dashboard from '../pages/Dashboard'
import PageNotFound from '../pages/PageNotFound'

interface Props { }

const Routes: React.FC<Props> = () => {
    return (
        <Switch>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route exact path="/post">
                <PagePost />
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


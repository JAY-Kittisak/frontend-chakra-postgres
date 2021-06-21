import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from '../pages/Index'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import PageNotFound from '../pages/PageNotFound'
import CreatePost from '../pages/Create-post'
import TierRoute from './TierRoute'

interface Props { }

const Routes: React.FC<Props> = () => {
    return (
        <Switch>
            <Route path="/tiers">
                <TierRoute />
            </Route>
            <Route path="/create-post">
                <CreatePost />
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/">
                <Index />
            </Route>
            <Route path="*">
                <PageNotFound />
            </Route>
        </Switch>
    )
}

export default Routes


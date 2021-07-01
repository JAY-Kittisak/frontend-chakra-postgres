import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from '../pages/Index'
import Register from '../pages/Register'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import PagePost from '../pages/PagePost'
import CreatePost from '../pages/Create-post'
import TierRoute from './TierRoute'

interface Props { }

const Routes: React.FC<Props> = () => {
    return (
        <Switch>
            <Route path="/tiers">
                <TierRoute />
            </Route>
            <Route path="/post">
                <PagePost />
            </Route>
            <Route path="/create-post">
                <CreatePost />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            {/* FIXME: exact แปลว่า แน่นอน ใช้กำหนดหน้าให้เป็น path นี้ path เดียว */}
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


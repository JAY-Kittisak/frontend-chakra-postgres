import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from '../pages/Index'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import PageNotFound from '../pages/PageNotFound'
import TierRoute from './TierRoute'
import GiveRoute from './GiveRoute'
import OrderGiveRoute from './OrderGiveRoute'
import AdminRoutes from './AdminRoutes'
import SideMenu from "../components/SideMenu"

import "../styles/TestSidebar.css"

interface Props { }

const Routes: React.FC<Props> = () => {
    const [inactive, setInactive] = useState(false)

    return (
        <>
            <SideMenu onCollapse={(inactive) => {
                console.log(inactive)
                setInactive(inactive)
            }} />

            {/* <div className="container inactive"> */}
            <div className={`container ${inactive ? "inactive" : ""}`}>
                <Switch>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/tiers">
                        <TierRoute />
                    </Route>
                    <Route path="/gives">
                        <GiveRoute />
                    </Route>
                    <Route path="/order-give">
                        <OrderGiveRoute />
                    </Route>
                    <Route path="/admin">
                        <AdminRoutes />
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
            </div>
        </>
    )
}

export default Routes


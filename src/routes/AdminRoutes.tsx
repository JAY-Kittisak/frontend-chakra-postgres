import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useIsAuth } from '../utils/uselsAuth'
import { useIsAdminAuth } from '../utils/useIsAdminAuth'
import Administrator from '../pages/Administrator'
import ManageGives from '../pages/ManageGives'
import ManageGiveOrders from '../pages/ManageGiveOrders'
import ManageGiveOrderDetail from '../pages/ManageGiveOrderDetail'
import ManageJobITDetail from '../pages/ManageJobITDetail'
import ManageJobIT from '../pages/ManageJobIT'
import PageNotFound from '../pages/PageNotFound'

interface Props { }

const AdminRoutes: React.FC<Props> = () => {
    useIsAuth()
    useIsAdminAuth()

    return (
            <Switch>
            <Route path="/admin/manage-job-it/:id">
                <ManageJobITDetail />
            </Route>
            <Route path="/admin/manage-job-it">
                <ManageJobIT />
            </Route>
                <Route path="/admin/manage-gives">
                    <ManageGives />
                </Route>
            <Route path="/admin/manage-give-orders/:id">
                <ManageGiveOrderDetail />
            </Route>
                <Route path="/admin/manage-give-orders">
                    <ManageGiveOrders />
                </Route>
            <Route path="/admin">
                <Administrator />
            </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
        </Switch>
    )
}

export default AdminRoutes
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useIsAuth } from '../utils/uselsAuth'
import { useIsAdminAuth } from '../utils/useIsAdminAuth'
import Administrator from '../pages/Administrator'
import ManageGives from '../pages/ManageGives'
import ManageStockIt from '../pages/ManageStockIt'
import ManageGiveCategory from '../pages/ManageGiveCategory'
import ManageGiveOrders from '../pages/ManageGiveOrders'
import ManageGiveOrderDetail from '../pages/ManageGiveOrderDetail'
import ManageGiveOrderDetailCdc from '../pages/ManageGiveOrderDetailCdc'
import ManageJobITDetail from '../pages/ManageJobITDetail'
import ManageJobIT from '../pages/ManageJobIT'
import ManageStockItOrders from '../pages/ManageStockItOrders'
import ManageStockItOrderDetail from '../pages/ManageStockItOrderDetail'
import ManageUsers from '../pages/ManageUsers'
import PageNotFound from '../pages/PageNotFound'

interface Props { }

const AdminRoutes: React.FC<Props> = () => {
    useIsAuth()
    useIsAdminAuth()

    return (
            <Switch>
            <Route path="/admin/manage-users">
                <ManageUsers />
            </Route>
            <Route path="/admin/stock-it-orders/:id">
                <ManageStockItOrderDetail />
            </Route>
            <Route path="/admin/stock-it-orders">
                <ManageStockItOrders />
            </Route>
            <Route path="/admin/manage-stock-it">
                <ManageStockIt />
            </Route>
            <Route path="/admin/manage-job-it/:id">
                <ManageJobITDetail />
            </Route>
            <Route path="/admin/manage-job-it">
                <ManageJobIT />
            </Route>
            <Route path="/admin/manage-give-category">
                <ManageGiveCategory />
            </Route>
                <Route path="/admin/manage-gives">
                    <ManageGives />
                </Route>
            <Route path="/admin/manage-give-orders-cdc/:id">
                <ManageGiveOrderDetailCdc />
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
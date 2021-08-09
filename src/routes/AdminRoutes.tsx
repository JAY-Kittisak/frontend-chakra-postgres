import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useIsAuth } from '../utils/uselsAuth'
import Layout from "../components/Layout";
import ManageGives from '../pages/ManageGives'
import ManageGiveOrders from '../pages/ManageGiveOrders'
import PageNotFound from '../pages/PageNotFound'

interface Props { }

const AdminRoutes: React.FC<Props> = () => {
    useIsAuth()

    return (
        <Layout variant="regular">
            <Switch>
                <Route path="/admin/manage-gives">
                    <ManageGives />
                </Route>
                {/* <Route path="/admin/manage-give-orders/:id">
            
        </Route> */}
                <Route path="/admin/manage-give-orders">
                    <ManageGiveOrders />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        </Layout>
    )
}

export default AdminRoutes
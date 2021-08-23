import React from 'react'
import { Switch, Route } from 'react-router-dom'

import OrderGive from '../pages/OrderGive'
import OrderGiveDetail from '../pages/OrderGiveDetail'
import PageNotFound from '../pages/PageNotFound'
import { useIsAuth } from '../utils/uselsAuth'

interface Props { }

const OrderGiveRoute: React.FC<Props> = () => {
    useIsAuth()
    return (
            <Switch>
                <Route path="/order-give/my-orders/:orderId">
                    <OrderGiveDetail />
                </Route>
                <Route path="/order-give/my-orders">
                    <OrderGive />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
        </Switch>
    )
}

export default OrderGiveRoute
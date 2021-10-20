import React from 'react'
import { Switch, Route } from 'react-router-dom'

import StockIt from '../pages/StockIt'
import StockItDetail from '../pages/StockItDetail'
import OrderStockIt from '../pages/OrderStockIt'
import PageNotFound from '../pages/PageNotFound'
import { useIsAuth } from '../utils/uselsAuth'
import ManageStockItOrderDetail from '../pages/ManageStockItOrderDetail'

interface Props { }

const StockItRoute: React.FC<Props> = () => {
    useIsAuth()
    return (
        <Switch>
            <Route path="/stock-it/my-order/:id">
                <ManageStockItOrderDetail />
            </Route>
            <Route path="/stock-it/my-order">
                <OrderStockIt />
            </Route>
            <Route path="/stock-it/stock-all/:id">
                <StockItDetail />
            </Route>
            <Route path="/stock-it/stock-all">
                <StockIt />
            </Route>
            <Route path="*">
                <PageNotFound />
            </Route>
        </Switch>
    )
}

export default StockItRoute
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import StockIt from '../pages/StockIt'
import StockItDetail from '../pages/StockItDetail'
import PageNotFound from '../pages/PageNotFound'
import { useIsAuth } from '../utils/uselsAuth'

interface Props { }

const StockItRoute: React.FC<Props> = () => {
    useIsAuth()
    return (
        <Switch>
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
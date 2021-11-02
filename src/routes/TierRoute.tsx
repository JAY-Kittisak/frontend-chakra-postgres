import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useIsAuth } from '../utils/uselsAuth'
import Factories from '../pages/Factories'
import FactoryDetail from '../pages/FactoryDetail'
import ProductTier from '../pages/ProductTier'
import PageNotFound from '../pages/PageNotFound'

interface Props { }

const TierRoute: React.FC<Props> = () => {
    useIsAuth()
    return (
        <Switch>
            <Route path="/tiers/product-tier/:category">
                <ProductTier />
            </Route>
            {/* FIXME: Dynamic page ต้องอยู่ข้างบนเพจหลัก */}
            <Route path="/tiers/factories/:id">
                <FactoryDetail />
            </Route>
            <Route path="/tiers/factories">
                <Factories />
            </Route>
            <Route path="*">
                <PageNotFound />
            </Route>
        </Switch>
    )
}

export default TierRoute
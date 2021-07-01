import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Factories from '../pages/Factories'
import FactoryDetail from '../pages/FactoryDetail'
import ManageTierProduct from '../pages/ManageTierProduct'
import PageNotFound from '../pages/PageNotFound'

interface Props { }

const TierRoute: React.FC<Props> = () => {
    return (
        <Switch>
            <Route path="/tiers/manage-tier-product">
                <ManageTierProduct />
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
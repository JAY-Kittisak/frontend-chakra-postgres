import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Factories from '../pages/Factories'
import FactoryDetail from '../pages/FactoryDetail'

interface Props { }

const TierRoute: React.FC<Props> = () => {
    return (
        <Switch>
            <Route path="/tiers/factories/:id">
                <FactoryDetail />
            </Route>
            <Route path="/tiers/factories">
                <Factories />
            </Route>
        </Switch>
    )
}

export default TierRoute
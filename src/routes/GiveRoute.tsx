import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Gives from '../pages/Gives'
import GiveDetail from '../pages/GiveDetail'
import PageNotFound from '../pages/PageNotFound'
import GiveDetailCdc from '../pages/GiveDetailCdc'
import { useIsAuth } from '../utils/uselsAuth'

interface Props { }

const GiveRoute: React.FC<Props> = () => {
    useIsAuth()
    return (
            <Switch>
            <Route path="/gives/gives-all-cdc/:giveId">
                <GiveDetailCdc />
            </Route>
                <Route path="/gives/gives-all/:giveId">
                    <GiveDetail />
                </Route>
                <Route path="/gives/gives-all">
                    <Gives />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
        </Switch>
    )
}

export default GiveRoute
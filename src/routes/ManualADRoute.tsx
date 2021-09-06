import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useIsAuth } from '../utils/uselsAuth'
import ManualAD from '../pages/ManualAD'
import ManualADDetail from '../pages/ManualADDetail'
import PageNotFound from '../pages/PageNotFound'

interface Props { }

const ManualADRoute: React.FC<Props> = () => {
    useIsAuth()
    return (
        <Switch>
            <Route path="/manual-ad/factories/:id">
                <ManualADDetail />
            </Route>
            <Route path="/manual-ad/factories">
                <ManualAD />
            </Route>
            <Route path="*">
                <PageNotFound />
            </Route>
        </Switch>
    )
}

export default ManualADRoute
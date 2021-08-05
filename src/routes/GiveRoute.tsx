import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Gives from '../pages/Gives'
import GiveDetail from '../pages/GiveDetail'
import PageNotFound from '../pages/PageNotFound'
import Layout from "../components/Layout";

interface Props { }

const GiveRoute: React.FC<Props> = () => {
    return (
        <Layout variant="regular">
            <Switch>
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
        </Layout>
    )
}

export default GiveRoute
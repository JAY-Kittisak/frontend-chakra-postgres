import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Index from '../pages/Index'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import PageNotFound from '../pages/PageNotFound'
import Factories from '../pages/Factories'
import NavigationBar from '../components/NavigationBar'
import { Box, Flex } from '@chakra-ui/react'
import NavBar from '../components/NavBar'

interface Props { }

const Routes: React.FC<Props> = () => {
    return (
        <Flex w="100%">
            <NavigationBar />
            <Switch>
                <Route exact path="/factories">
                    <Factories />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        </Flex>
    )
}

export default Routes


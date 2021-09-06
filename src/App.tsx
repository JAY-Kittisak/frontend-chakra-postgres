import * as React from "react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "urql"

import "./App.css"
import Routes from "./routes/Routes"
import { client } from "./apollo/client"
import Layout from "./components/Layout";


export const App = () => (
    <Provider value={client}>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Layout variant="regular">
                    <Routes />
                </Layout>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
)
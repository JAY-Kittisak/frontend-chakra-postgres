import * as React from "react"
import {
    ChakraProvider, theme,
} from "@chakra-ui/react"
import { BrowserRouter } from 'react-router-dom'
import { Provider, createClient, fetchExchange, dedupExchange } from 'urql'
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';

import './App.css'
import Routes from './routes/Routes'
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, UploadImageMeMutation } from "./generated/graphql";
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';

function betterUpdateQuery<Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query
) {
    return cache.updateQuery(qi, data => fn(result, data as any) as any)
}


const client = createClient({
    url: "http://200.1.1.99:4000/graphql",
    fetchOptions: {
        credentials: "include"
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
                    logout: (_result, args, cache, info) => {
                        betterUpdateQuery<LogoutMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            () => ({ me: null })
                        )
                    },
                    login: (_result, args, cache, info) => {
                        betterUpdateQuery<LoginMutation, MeQuery>(cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.login.errors) {
                                    return query
                                } else {
                                    return {
                                        me: result.login.user,
                                    }
                                }
                            }
                        )
                    },

                    register: (_result, args, cache, info) => {
                        betterUpdateQuery<RegisterMutation, MeQuery>(cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.register.errors) {
                                    return query
                                } else {
                                    return {
                                        me: result.register.user,
                                    }
                                }
                            }
                        )
                    },

                    uploadImageMe: (_result, args, cache, info) => {
                        betterUpdateQuery<UploadImageMeMutation, MeQuery>(cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.uploadImageMe?.errors) {
                                    return query
                                } else {
                                    return {
                                        me: result.uploadImageMe?.user,
                                    }
                                }
                            }
                        )
                    }
                }
            }
        }),
        multipartFetchExchange,
        fetchExchange
    ],
})


export const App = () => (
    <Provider value={client}>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
)
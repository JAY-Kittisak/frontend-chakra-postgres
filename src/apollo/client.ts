import { createClient, dedupExchange } from 'urql'
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';

import {
    LoginMutation,
    LogoutMutation,
    MeDocument,
    MeQuery,
    RegisterMutation,
    UploadImageMeMutation,
    CreateGiveMutation,
    DeleteGiveMutationVariables,
    GivesQuery,
    GivesDocument,
    CreateJobItMutation,
    JobITsQuery,
    JobITsDocument,
} from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query
) {
    return cache.updateQuery(qi, data => fn(result, data as any) as any)
}

export const client = createClient({
    url: "http://183.88.226.202:8504/graphql",
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
                                if (result.uploadImageMe.errors) {
                                    return query
                                } else {
                                    return {
                                        me: result.uploadImageMe.user,
                                    }
                                }
                            }
                        )
                    },

                    createGive: (_result, args, cache, info) => {
                        betterUpdateQuery<CreateGiveMutation, GivesQuery>(cache,
                            { query: GivesDocument },
                            _result,
                            (result, query) => {
                                if (result.createGive.errors) {
                                    return query
                                } else {
                                    return {
                                        gives: result.createGive.give
                                    }
                                }
                            }
                        )
                    },

                    deleteGive: (_result, args, cache, info) => {
                        cache.invalidate({
                            __typename: "Give",
                            id: (args as DeleteGiveMutationVariables).id,
                        });
                    },

                    createJobIT: (_result, args, cache, info) => {
                        betterUpdateQuery<CreateJobItMutation, JobITsQuery>(cache,
                            { query: JobITsDocument },
                            _result,
                            (result, query) => {
                                if (result.createJobIT.errors) {
                                    return query
                                } else {
                                    return {
                                        jobITs: result.createJobIT.jobIT
                                    }
                                }
                            }
                        )
                    },

                }
            }
        }),
        multipartFetchExchange,
    ],
})
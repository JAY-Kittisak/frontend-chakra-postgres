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
    DeleteGiveOrderMutationVariables,
    CreateGiveCdcMutation,
    GivesCdcQuery,
    GivesCdcDocument,
    DeleteGiveCdcMutationVariables,
    DeleteGiveOrderCdcMutationVariables,
    CreateGiveCatMutation,
    GiveCategoriesQuery,
    GiveCategoriesDocument,
    CreateGiveOrderMutation,
    GiveOrderByCreatorIdQuery,
    GiveOrderByCreatorIdDocument,
    CreateGiveOrderCdcMutation,
    GiveOrderByCreatorIdCdcQuery,
    GiveOrderByCreatorIdCdcDocument
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
    // url: "http://localhost:4000/graphql",
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

                    deleteGiveOrder: (_result, args, cache, info) => {
                        cache.invalidate({
                            __typename: "GiveOrder",
                            id: (args as DeleteGiveOrderMutationVariables).id,
                        });
                    },

                    createGiveCdc: (_result, args, cache, info) => {
                        betterUpdateQuery<CreateGiveCdcMutation, GivesCdcQuery>(cache,
                            { query: GivesCdcDocument },
                            _result,
                            (result, query) => {
                                if (result.createGiveCdc.errors) {
                                    return query
                                } else {
                                    return {
                                        givesCdc: result.createGiveCdc.give
                                    }
                                }
                            }
                        )
                    },

                    deleteGiveCdc: (_result, args, cache, info) => {
                        cache.invalidate({
                            __typename: "GiveCdc",
                            id: (args as DeleteGiveCdcMutationVariables).id,
                        });
                    },

                    deleteGiveOrderCdc: (_result, args, cache, info) => {
                        cache.invalidate({
                            __typename: "GiveOrderCdc",
                            id: (args as DeleteGiveOrderCdcMutationVariables).id,
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

                    createGiveCat: (_result, args, cache, info) => {
                        betterUpdateQuery<CreateGiveCatMutation, GiveCategoriesQuery>(cache,
                            { query: GiveCategoriesDocument },
                            _result,
                            (result, query) => {
                                if (result.createGiveCat.errors) {
                                    return query
                                } else {
                                    return {
                                        giveCategories: result.createGiveCat.giveCat
                                    }
                                }
                            }
                        )
                    },

                    createGiveOrder: (_result, args, cache, info) => {
                        betterUpdateQuery<CreateGiveOrderMutation, GiveOrderByCreatorIdQuery>(cache,
                            { query: GiveOrderByCreatorIdDocument },
                            _result,
                            (result, query) => {
                                if (result.createGiveOrder.errors) {
                                    return query
                                } else {
                                    return {
                                        giveOrderByCreatorId: result.createGiveOrder.giveOrder
                                    }
                                }
                            }
                        )
                    },

                    createGiveOrderCdc: (_result, args, cache, info) => {
                        betterUpdateQuery<CreateGiveOrderCdcMutation, GiveOrderByCreatorIdCdcQuery>(cache,
                            { query: GiveOrderByCreatorIdCdcDocument },
                            _result,
                            (result, query) => {
                                if (result.createGiveOrderCdc.errors) {
                                    return query
                                } else {
                                    return {
                                        giveOrderByCreatorIdCdc: result.createGiveOrderCdc.giveOrder
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
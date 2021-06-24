import { useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useMeQuery } from "../generated/graphql"

export const useIsAuth = () => {
    const [{ data, fetching }] = useMeQuery()
    const history = useHistory()
    const { pathname } = useLocation()


    useEffect(() => {
        const locations = {
            pathname: '/login',
            state: pathname
        }
        if (!fetching && !data?.me) {
            history.replace(locations)
        }
    }, [fetching, data, history, pathname])
}
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useMeQuery } from "../generated/graphql"

export const useIsSupperAuth = () => {
    const [{ data, fetching }] = useMeQuery()
    const history = useHistory()


    useEffect(() => {
        const locations = { pathname: '/' }
        if (!fetching && (data?.me?.roles !== "superAdmin")) {
            history.replace(locations)
        }
    }, [fetching, data, history])
}
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const useIsResellAuth = () => {
    const [{ data, fetching }] = useMeQuery();
    const history = useHistory();

    useEffect(() => {
        const locations = { pathname: "/" };
        if (
            !(
                ((data?.me?.departments === "Sales" ||
                    data?.me?.departments === "SaleCo") &&
                    data?.me?.position === "หัวหน้างาน") ||
                data?.me?.position === "GM"
            ) &&
            !fetching
        ) {
            history.replace(locations);
        }
    }, [fetching, data, history]);
};

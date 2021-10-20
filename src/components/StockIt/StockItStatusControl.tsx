import React, { useState } from "react";
import { Stack, Button, Select } from "@chakra-ui/react";

import { catStatus, holdItem } from "../../utils/helpers";
import { useUpdateStockItOrMutation } from "../../generated/graphql";

interface Props {
    id: number;
    prevHold: string;
    prevStatus: string;
    roles: string;
}

const StockItStatusControl: React.FC<Props> = ({
    id,
    prevHold,
    prevStatus,
    roles,
}) => {
    const [newStatus, setNewStatus] = useState(prevStatus);
    const [holdStatus, setHoldStatus] = useState(prevHold);
    const [loading, setLoading] = useState(false);

    const [, updateStockItOr] = useUpdateStockItOrMutation();

    return (
        <Stack isInline mt={3}>
            <Select
                fontWeight="semibold"
                bg="#DD6B20"
                borderColor="#DD6B20"
                value={holdStatus}
                onChange={(e) => setHoldStatus(e.target.value)}
            >
                {holdItem.map((val, i) => (
                    <option key={i} value={val}>
                        {val}
                    </option>
                ))}
            </Select>
            {(roles === "admin" || roles === "superAdmin") && (
                <Select
                    fontWeight="semibold"
                    bg="#20B2AA"
                    borderColor="#20B2AA"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                >
                    {catStatus.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </Select>
            )}
            <Button
                w="40vh"
                color="white"
                isLoading={loading}
                loadingText="Loading..."
                colorScheme="orange"
                disabled={newStatus === prevStatus && holdStatus === prevHold}
                onClick={async () => {
                    setLoading(true);
                    // console.log(id, holdStatus, newStatus)
                    // setLoading(false);
                    const response = await updateStockItOr({
                        id,
                        holdStatus,
                        newStatus:
                            (roles === "admin" || roles === "superAdmin") ? newStatus : "",
                    });
                    if (response.data?.updateStockItOr.errors) {
                        alert(
                            response.data.updateStockItOr.errors.map((val) => val.message)
                        );
                        setLoading(false);
                    } else if (response.data?.updateStockItOr.stockItOrder) {
                        setLoading(false);
                    }
                }}
            >
                Update
            </Button>
        </Stack>
    );
};

export default StockItStatusControl;

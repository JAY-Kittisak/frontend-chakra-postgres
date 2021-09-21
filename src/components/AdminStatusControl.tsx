import React, { useState } from "react";
import { Stack, Button, Select, useColorModeValue } from "@chakra-ui/react";

import { catStatus, jobStatus } from "../utils/helpers";
import { useUpdateGiveOrderMutation, useUpdateJobItMutation } from "../generated/graphql";
interface Props {
    functionName: "GiveOrder" | "JobIT";
    id: number;
    prevStatus: string;
}

const AdminStatusControl: React.FC<Props> = ({
    id,
    prevStatus,
    functionName,
}) => {
    const [orderStatus, setOrderStatus] = useState(prevStatus);
    const [loading, setLoading] = useState(false);

    const bgSelect = useColorModeValue("#DD6B20", "#20B2AA");
    const bgButton = useColorModeValue("orange", "teal");

    const [, updateGiveOrder] = useUpdateGiveOrderMutation();
    const [, updateJobIt] = useUpdateJobItMutation()

    return (
        <Stack isInline mt={3}>
            {functionName === "GiveOrder" ? (
                <Select
                    fontWeight="semibold"
                    bg={bgSelect}
                    borderColor={bgSelect}
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                >
                    {catStatus.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </Select>
            ) : functionName === "JobIT" ? (
                <Select
                    fontWeight="semibold"
                    bg={bgSelect}
                    borderColor={bgSelect}
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                >
                    {jobStatus.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </Select>
            ) : undefined}
            <Button
                w="40vh"
                color="white"
                isLoading={loading}
                loadingText="Loading..."
                colorScheme={bgButton}
                disabled={orderStatus === prevStatus}
                onClick={async () => {
                  setLoading(true);

                  if (functionName === "GiveOrder") {
                const response = await updateGiveOrder({
                    id,
                    newStatus: orderStatus,
                });
                if (response.error?.message) {
                  alert(response.error.message);
              } else if (response.data?.updateGiveOrder.giveOrder) {
                  alert("ทำการบันทึกเรียบร้อย");
              }
                setLoading(false);
            }

                  if (functionName === "JobIT") {
                        const response = await updateJobIt({
                            id,
                            newStatus: orderStatus,
                        });
                        if (response.error?.message) {
                            alert(response.error.message);
                        } else if (response.data?.updateJobIT) {
                            alert("ทำการบันทึกเรียบร้อย");
                        }
                        setLoading(false);
                    }
                }}
            >
                Update
            </Button>
        </Stack>
    );
};

export default AdminStatusControl;

import React, { useState } from 'react'
import {
    Stack,
    Button,
    Select,
    useColorModeValue
} from "@chakra-ui/react";

import { catStatus } from "../utils/helpers"
import { useUpdateGiveOrderMutation } from '../generated/graphql';
interface Props {
    functionName: string
    id: number
    prevStatus: string
}

const AdminStatusControl: React.FC<Props> = ({ id, prevStatus, functionName }) => {
    const [orderStatus, setOrderStatus] = useState(prevStatus)
    const [loading, setLoading] = useState(false)

    const bgSelect = useColorModeValue("#DD6B20", "#20B2AA");
    const bgButton = useColorModeValue("orange", "teal");

    const [, updateGiveOrder] = useUpdateGiveOrderMutation()

    return (
        <Stack isInline mt={3}>
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
            <Button
                w="40vh"
                color="white"
                isLoading={loading}
                loadingText="Loading..."
                colorScheme={bgButton}
                disabled={orderStatus === prevStatus}
                onClick={async () => {
                    setLoading(true)

                    if (functionName === "GiveOrder") {
                        const response = await updateGiveOrder({ id, newStatus: orderStatus })
                        if (response.error?.message) {
                            alert(response.error.message)
                        } else if (response.data?.updateGiveOrder.giveOrder) {
                            alert("ทำการบันทึกเรียบร้อย")
                        }
                        setLoading(false)
                    }

                    if (functionName === "JobIT") {
                        alert("test Status Control")
                    }
                }}
            >
                Update
            </Button>
        </Stack>
    )
}

export default AdminStatusControl
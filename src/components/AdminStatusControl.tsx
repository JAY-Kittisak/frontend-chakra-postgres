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
    orderId: number
    prevStatus: string
}

const AdminStatusControl: React.FC<Props> = ({ orderId, prevStatus }) => {
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
                    const response = await updateGiveOrder({ id: orderId, newStatus: orderStatus })
                    if (response.error) {
                        alert(response.error.message)
                    } else if (response.data?.updateGiveOrder) {
                        alert("ทำการบันทึกเรียบร้อยโปรด Reface หน้าเว็บหรือกด F5")
                    }
                    setLoading(false)
                }}
            >
                Update
            </Button>
        </Stack>
    )
}

export default AdminStatusControl
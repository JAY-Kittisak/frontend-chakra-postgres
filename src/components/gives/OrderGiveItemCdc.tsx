import React from "react";
import {
    Text,
    Box,
    useColorMode,
    Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { RegularGiveOrdersCdcFragment } from "../../generated/graphql";
import { formatAmount, formatDate } from "../../utils/helpers"

interface Props {
    order: RegularGiveOrdersCdcFragment;
}

const OrderGiveItemCdc: React.FC<Props> = ({
    order: {
        id,
        createdAt,
        amount,
        price,
        status,
    },
}) => {
    const { colorMode } = useColorMode();

    return (
        <Link to={`/order-give/my-orders-cdc/${id}`}>
            <div className='orders-content orders-content--content'>
                <Box w="25%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">{formatDate(+createdAt)}</Text>
                </Box>
                <Box w="25%">
                    <Text fontSize="md" align="center">{amount}</Text>
                </Box>
                <Box w="25%">
                    <Text fontSize="md" align="center" ml="10">{price && formatAmount(price)}</Text>
                </Box>
                <Box w="25%">
                    <Text
                        ml="4"
                        align="center"
                        fontWeight="semibold"
                        fontSize={["md", "md", "md", "md"]}
                        color={
                            status === "New"
                                ? colorMode === "light" ? "cyan.600" : "cyan"
                                : status === "Preparing"
                                    ? "orange"
                                    : status === "Success"
                                        ? "green"
                                        : undefined
                        }
                    >
                        {status}
                    </Text>
                </Box>
            </div>
            <Divider orientation="horizontal" />
        </Link>
    );
};

export default OrderGiveItemCdc;

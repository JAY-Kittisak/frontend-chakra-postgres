import React from "react";
import {
    Tr,
    Td,
    Text,
    Box,
    Button,
    Center,
    useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { RegularGiveOrdersFragment } from "../../generated/graphql";
import { formatAmount } from "../../utils/helpers"

interface Props {
    order: RegularGiveOrdersFragment;
}

const OrderGiveItem: React.FC<Props> = ({
    order: {
        id,
        createdAt,
        amount,
        price,
        status,
        customerDetail,
        give: { giveName, price: p, imageUrl },
    },
}) => {
    const { colorMode } = useColorMode();

    return (
        <Tr>
            <Td fontSize={["xs", "xs", "sm", "md"]}>
                <Center>{new Date(+createdAt).toDateString()}</Center>
            </Td>
            <Td>
                <Center>{imageUrl}{giveName}</Center>
            </Td>
            <Td>
                <Center>{customerDetail}</Center>
            </Td>
            <Td>
                <Center>{amount} ชิ้น x {p && formatAmount(p)} บาท</Center>
            </Td>
            <Td>
                <Center>{price && formatAmount(price)}</Center>
            </Td>
            <Td
                fontWeight="semibold"
                fontSize={["md", "md", "md", "xl"]}
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
                <Center>{status}</Center>
            </Td>
            <Td fontSize={["xs", "xs", "sm", "md"]}>
                <Link to={`/tiers/factories/${id}`}>
                    <Box textAlign="center">
                        <Button
                            colorScheme={colorMode === "light" ? "green" : "blue"}
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _active={{ boxShadow: "lg" }}
                        >
                            <Text color="white">รายละเอียด</Text>
                        </Button>
                    </Box>
                </Link>
            </Td>
        </Tr>
    );
};

export default OrderGiveItem;

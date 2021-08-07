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
        give: { giveName, price: p },
    },
}) => {
    const { colorMode } = useColorMode();

    return (
        <Tr>
            <Td fontSize={["xs", "xs", "sm", "md"]}>
                <Center>{createdAt}</Center>
            </Td>
            <Td>
                <Center>{giveName}</Center>
            </Td>
            <Td>
                <Center>{amount} x {p} บาท</Center>
            </Td>
            <Td>
                <Center>{price}</Center>
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

import React from 'react'
import {
    Text,
    Box,
    useColorMode,
    Divider,
    Button,
    Image,
    Flex
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { RegularGiveOrdersFragment } from "../../generated/graphql";
import { formatAmount, formatDate } from "../../utils/helpers"

interface Props {
    order: RegularGiveOrdersFragment;
}

const AdminOrderGivesItem: React.FC<Props> = ({
    order: {
        id,
        createdAt,
        amount,
        price,
        status,
        give: { giveName, imageUrl },
        creator: { fullNameTH }
    },
}) => {
    const { colorMode } = useColorMode();

    return (
        <Link to={`/admin/manage-give-orders/${id}`}>
            <Flex className='orders-content orders-content--content' _hover={{ bgColor: "#eee" }}>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">{formatDate(+createdAt)}</Text>
                </Box>
                <Flex justify="space-between" w="16%">
                    {imageUrl &&
                        <Image
                            mr={2}
                            borderRadius="2xl"
                            boxSize="60px"
                            objectFit="cover"
                            src={imageUrl}
                        />
                    }
                    <Flex flexDir="column">
                        <Text fontSize={["xs", "xs", "sm", "md"]} isTruncated w="200px">{fullNameTH}</Text>
                        <Text fontSize={["xs", "xs", "sm", "md"]} color="green" isTruncated w="200px">{giveName}</Text>
                    </Flex>
                </Flex>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">{amount}</Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center" ml="10">{price && formatAmount(price)}</Text>
                </Box>

                <Box w="16%">
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

                <Box textAlign="center" w="16%">
                    <Button
                        size="md"
                        colorScheme="blue"
                        boxShadow="sm"
                    >
                        <Text color="white" fontSize={["xs", "xs", "sm", "md"]}>
                            Manage order
                        </Text>
                    </Button>
                </Box>
            </Flex>
            <Divider orientation="horizontal" />
        </Link>
    )
}

export default AdminOrderGivesItem
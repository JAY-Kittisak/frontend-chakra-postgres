import React from "react";
import { Text, Box, Divider, Button, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { RegularStockItOrderFragment } from "../../generated/graphql";
import { formatDate } from "../../utils/helpers";

interface Props {
    order: RegularStockItOrderFragment;
}

const AdminStockOrItem: React.FC<Props> = ({
    order: {
        id,
        createdAt,
        holdStatus,
        status,
        branch,
        stockIt: { itemName, serialNum, imageUrl },
        creator: { fullNameTH },
    },
}) => {
    return (
        <Link to={`/admin/stock-it-orders/${id}`}>
            <Flex
                className="orders-content orders-content--content"
                _hover={{ bgColor: "#eee" }}
            >
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">
                        {formatDate(+createdAt)}
                    </Text>
                </Box>
                <Flex justify="space-between" w="16%">
                    {imageUrl && (
                        <Image
                            mr={2}
                            borderRadius="2xl"
                            boxSize="60px"
                            objectFit="cover"
                            src={imageUrl}
                        />
                    )}
                    <Flex flexDir="column">
                        <Text fontSize={["xs", "xs", "sm", "md"]} isTruncated w="200px">
                            {fullNameTH}
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="green"
                            isTruncated
                            w="170px"
                        >
                            {itemName}
                        </Text>
                    </Flex>
                </Flex>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center" ml="10">
                        {serialNum}
                    </Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center" fontWeight="bold">
                        {holdStatus}
                    </Text>
                </Box>

                <Box w="16%">
                    <Text
                        ml="4"
                        align="center"
                        fontWeight="semibold"
                        fontSize={["md", "md", "md", "md"]}
                        color={
                            status === "New"
                                ? "cyan.600"
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
                    <Button size="md" colorScheme="blue" boxShadow="sm">
                        <Text color="white" fontSize={["xs", "xs", "sm", "md"]}>
                            Manage order
                        </Text>
                    </Button>
                </Box>
            </Flex>
            <Divider orientation="horizontal" />
        </Link>
    );
};

export default AdminStockOrItem;

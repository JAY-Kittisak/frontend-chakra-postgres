import React from "react";
import {
    Flex,
    Text,
    Box,
    useColorMode,
    Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { RegularJobItFragment } from "../../generated/graphql";
import { formatDate } from "../../utils/helpers";

interface Props {
    jobIT: RegularJobItFragment;
}

const AdminJobITItem: React.FC<Props> = ({
    jobIT: { id, titled, itActionName, desiredDate, createdAt, status, branch },
}) => {
    const { colorMode } = useColorMode();
    return (
        <Link to={`/admin/manage-job-it/${id}`}>
            <Flex
                _hover={{ bgColor: "#eee" }}
                p="3"
                align="center"
                rounded="lg"
            >
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">
                        {formatDate(+createdAt)}
                    </Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center" isTruncated>
                        {titled}
                    </Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">
                        {itActionName}
                    </Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center" ml="10">
                        {desiredDate}
                    </Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center" ml="10">
                        {branch === 0 ? "ลาดกระบัง" : "ชลบุรี"}
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
                                ? colorMode === "light"
                                    ? "cyan.600"
                                    : "cyan"
                                : status === "Wait Approve"
                                    ? "orange"
                                    : status === "Success"
                                        ? "green"
                                        : status === "Impossible"
                                            ? "red"
                                            : undefined
                        }
                    >
                        {status}
                    </Text>
                </Box>
            </Flex>
            <Divider orientation="horizontal" />
        </Link>
    );
};

export default AdminJobITItem;

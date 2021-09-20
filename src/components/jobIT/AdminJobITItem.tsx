import React from 'react'
import {
    Text,
    Box,
    // useColorMode,
    Divider,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { RegularJobItFragment } from "../../generated/graphql";
import { formatAmount, formatDate } from "../../utils/helpers"

interface Props {
    jobIT: RegularJobItFragment
}

const AdminJobITItem: React.FC<Props> = ({ jobIT: { id, category, createdAt } }) => {
    // const { colorMode } = useColorMode();
    return (
        <Link to={`/admin/manage-job-it/${id}`}>
            <div className='orders-content orders-content--content'>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">{formatDate(+createdAt)}</Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">{category}</Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">amount</Text>
                </Box>
                <Box w="16%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center" ml="10">{formatAmount(15665)}</Text>
                </Box>

                <Box w="16%">
                    <Text
                        ml="4"
                        align="center"
                        fontWeight="semibold"
                        fontSize={["md", "md", "md", "md"]}
                    // color={
                    //     status === "New"
                    //         ? colorMode === "light" ? "cyan.600" : "cyan"
                    //         : status === "Preparing"
                    //             ? "orange"
                    //             : status === "Success"
                    //                 ? "green"
                    //                 : undefined
                    // }
                    >
                        status
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
            </div>
            <Divider orientation="horizontal" />
        </Link>
    )
}

export default AdminJobITItem
import React from 'react'
import {
    Text,
    Box,
    useColorMode,
    Divider,
} from "@chakra-ui/react";

import { RegularJobItFragment } from "../../generated/graphql";
import { formatDate } from "../../utils/helpers"

interface Props {
    jobIt: RegularJobItFragment
}

const JobITItem: React.FC<Props> = ({ jobIt: {
    createdAt,
    titled,
    itComment,
    itActionName,
    desiredDate,
    status
} }) => {

    const { colorMode } = useColorMode();

    return (
        <>
            <div className='orders-content orders-content--content'>
                <Box w="20%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">{formatDate(+createdAt)}</Text>
                </Box>
                <Box w="20%">
                    <Text fontSize="md" align="center">{titled}</Text>
                </Box>
                <Box w="20%">
                    <Text fontSize="md" align="center">{itComment}</Text>
                </Box>
                <Box w="20%">
                    <Text fontSize="md" align="center">{itActionName}</Text>
                </Box>
                <Box w="20%">
                    <Text fontSize="md" align="center" ml="10">{desiredDate}</Text>
                </Box>
                <Box w="20%">
                    <Text
                        ml="4"
                        align="center" ff
                        fontWeight="semibold"
                        fontSize={["md", "md", "md", "md"]}
                        color={
                            status === "New"
                                ? colorMode === "light" ? "cyan.600" : "cyan"
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
            </div>
            <Divider orientation="horizontal" />
        </>
    )
}

export default JobITItem
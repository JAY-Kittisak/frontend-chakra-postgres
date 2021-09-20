import React from 'react'
import {
    Text,
    Box,
    // useColorMode,
    Divider,
} from "@chakra-ui/react";

// import { RegularJobItFragment } from "../../generated/graphql";

interface Props { id: number }

const JobITItem: React.FC<Props> = ({ id }) => {
    return (
        <>
            <div className='orders-content orders-content--content'>
                <Box w="25%">
                    <Text fontSize={["xs", "xs", "sm", "md"]} align="center">"new Date(+createdAt).toDateString()"</Text>
                </Box>
                <Box w="25%">
                    <Text fontSize="md" align="center">amount{id}</Text>
                </Box>
                <Box w="25%">
                    <Text fontSize="md" align="center" ml="10">price</Text>
                </Box>
                <Box w="25%">
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
            </div>
            <Divider orientation="horizontal" />
        </>
    )
}

export default JobITItem
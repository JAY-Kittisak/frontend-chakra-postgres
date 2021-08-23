import React from 'react'
import { Flex, Text, Box } from "@chakra-ui/react"

import Layout from "../components/Layout";
interface Props { }

const ManageGiveOrders: React.FC<Props> = () => {
    return (
        <Layout variant="small">
            <Flex flexDir="column">
                <Text as="i" fontSize="3xl">ManageGiveOrders</Text>
                <Flex flexDir="column" >
                    <Flex justify="space-around">
                        <Text fontSize="xl" fontWeight="bold">Next</Text>
                        <Text fontSize="xl" fontWeight="bold">Next</Text>
                        <Text fontSize="xl" fontWeight="bold">Next</Text>
                        <Text fontSize="xl" fontWeight="bold">Next</Text>
                    </Flex>

                    <Flex flexDir="row">
                        <Box w="25%">
                            <Text fontSize="xl" align="center">sdf 123 256 </Text>
                        </Box>
                        <Box w="25%">
                            <Text fontSize="xl" align="center">5</Text>
                        </Box>
                        <Box w="25%">
                            <Text fontSize="xl" align="center">300</Text>
                        </Box>
                        <Box w="25%">
                            <Text fontSize="xl" align="center">sdf</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    )
}

export default ManageGiveOrders
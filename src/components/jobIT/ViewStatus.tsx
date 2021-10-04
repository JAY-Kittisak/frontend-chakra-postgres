import React from 'react'
import { Text, Flex } from "@chakra-ui/react";

interface Props { }

const ViewStatus: React.FC<Props> = () => {
    return (
        <Flex
            flexDir="column"
            w="375px"
            h="250px"
            boxShadow="md"
            ml="5"
            rounded="lg"
            p="3"
        >
            <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                Job Status
            </Text>
            <Flex flexDir="column" mt="5">
                <Flex flexDir="row" mb="3">
                    <Flex
                        w="100px"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        p="3"
                        mr="6"
                        align="center"
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            1
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" color="cyan.600">
                            New
                        </Text>
                    </Flex>

                    <Flex
                        w="100px"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        p="3"
                        mr="6"
                        align="center"
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            2
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" color="orange">
                            Preparing
                        </Text>
                    </Flex>

                    <Flex
                        w="100px"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        p="3"
                        align="center"
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            3
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" color="green">
                            Success
                        </Text>
                    </Flex>
                </Flex>

                <Text>
                    Start
                </Text>
                <Text>
                    End
                </Text>
            </Flex>
        </Flex>
    )
}

export default ViewStatus
import React from 'react'
// import { useParams } from 'react-router-dom'
import { Badge, Box, Text, Stack, Icon, Button, Flex, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import Layout from '../components/Layout'

interface Props { }

const FactoryDetail: React.FC<Props> = () => {
    // const params = useParams<{ id: string }>()
    const { toggleColorMode } = useColorMode()
    const bg = useColorModeValue("gray.200", "gray.700")
    const color = useColorModeValue("blue", "gray")
    const colorW = useColorModeValue("white", "white")
    return (
        <Layout variant='regular'>
            <Flex ml="100">
                <Box w="50%" p={5} rounded="10px" boxShadow="sm" bg={bg} mr="5">
                    <Stack isInline align="baseline">
                        <Badge variant="solid" colorScheme="pink" rounded="full" px={2}>
                            NEW!
                        </Badge>
                        <Badge variant="solid" colorScheme={color} rounded="full" px={2}>
                            ทดสอบ!
                        </Badge>
                        <Text
                            textTransform="uppercase"
                            fontSize="sm"
                            colorScheme={color}
                            letterSpacing="wide"
                        >
                            2 Hours &bull; 12 lectures
                        </Text>
                    </Stack>
                    <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                        Introduction
                    </Text>
                    <Text isTruncated fontWeight="light" fontSize="md">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui commodi,
                        <br />
                        numquam similique incidunt quam earum sit delectus. Repellat eum cumque,
                        harum quas beatae accusantium perspiciatis voluptas libero repudiandae,
                        veritatis alias.
                    </Text>
                    <Stack isInline justify="space-between">
                        <Text fontWeight="semibold" fontSize="lg">
                            $20
                        </Text>
                        <Box d="flex">
                            <Box as="span">
                                {Array(4)
                                    .fill("")
                                    .map((_, i) => (
                                        <Icon as={StarIcon} color="yellow.500" key={i} />
                                    ))}
                                <Icon as={StarIcon} mr="2" />
                            </Box>
                            <Text as="h3" fontWeight="light" fontSize="lg">
                                34 Reviews
                            </Text>
                        </Box>
                    </Stack>
                    <Box textAlign="center">
                        <Button
                            colorScheme={color}
                            size="lg"
                            mt={3}
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _active={{ boxShadow: "lg" }}
                            onClick={toggleColorMode}
                        >
                            <Text color={colorW}>
                                เพิ่มโรงงานใหม่
                            </Text>
                        </Button>
                    </Box>

                </Box>
            </Flex>
        </Layout>
    )
}

export default FactoryDetail
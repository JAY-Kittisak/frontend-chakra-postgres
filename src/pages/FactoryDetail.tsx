import { useParams } from 'react-router-dom'
import { Badge, Box, Button, Flex, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from 'react';
import Layout from '../components/Layout';
import { useFactoryByIdQuery } from "../generated/graphql";


interface Props { }

const FactoryDetail: React.FC<Props> = () => {
    const params = useParams<{ id: string }>()
    const { toggleColorMode } = useColorMode()
    const bg = useColorModeValue("gray.200", "gray.700")
    const color = useColorModeValue("blue", "gray")
    const colorW = useColorModeValue("white", "white")

    const paramsId = params.id
    const [{ data, fetching }] = useFactoryByIdQuery({
        variables: {
            id: +paramsId
        }
    });

    if (!fetching && !data) {
        return <div>you got query failed for some reason</div>
    }

    let body = null

    if (fetching) {
        // user not logged in
    } else if (!data?.factoryById.products) {
        body = (
            <div>
                ยังไม่มีข้อมูล
            </div>
        )
    } else {
        body = (
            <Flex ml="100">
                <Box w="70%" p={5} rounded="10px" boxShadow="sm" bg={bg} mr="5">
                    <Stack isInline align="baseline">
                        <Text fontSize="xl" fontWeight="bold">
                            {data.factoryById.companyName}
                            <Badge ml="1" fontSize="0.8em" variant="solid" colorScheme="green" rounded="full" px={2}>
                                {data.factoryById.industrialEstate}
                            </Badge>
                        </Text>
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
                                ดูข้อมูลโรงงาน
                            </Text>
                        </Button>
                    </Box>

                </Box>
            </Flex>
        )
    }



    // const { description, companyName } = data.factoryById
    return (
        <Layout variant='regular'>
            {!data && fetching ? (
                <div>Loading...</div>
            ) : (
            <Flex ml="100">
                        <Box w="100%" p={5} rounded="10px" boxShadow="sm" bg={bg} mr="5">
                            <Stack isInline align="baseline">
                                <Text fontSize="xl" fontWeight="bold">
                                    {data.factoryById.companyName}
                                    <Badge ml="1" fontSize="0.8em" variant="solid" colorScheme="green" rounded="full" px={2}>
                                        {data.factoryById.industrialEstate}
                                    </Badge>
                                    <Badge ml="1" fontSize="0.8em" variant="solid" colorScheme="pink" rounded="full" px={2}>
                                        {data.factoryById.businessType}
                                    </Badge>
                                </Text>
                        <Text
                            textTransform="uppercase"
                            fontSize="sm"
                            colorScheme={color}
                            letterSpacing="wide"
                        >
                                    {data.factoryById.phoneNumber}&bull; {data.factoryById.FAX}
                        </Text>
                            </Stack>
                            <Text fontWeight="light" fontSize="md" my={3}>
                                {data.factoryById.description}
                            </Text>
                            <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                                {data.factoryById.address}
                            </Text>
                            {/* <Stack isInline justify="space-between">
                        <Text fontWeight="semibold" fontSize="lg">
                                    ผลิตสินค้า {data.factoryById.products &&
                                        data.factoryById.products.map((product) => (
                                            <Badge key={product.id} variant="solid" colorScheme="blue" rounded="full" px={2}>
                                                {product.productName}
                                            </Badge>
                                        ))
                                    }
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
                    </Stack> */}
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
                            {body}
                </Box>
                    </Flex>
            )}
        </Layout>
    )
}

export default FactoryDetail
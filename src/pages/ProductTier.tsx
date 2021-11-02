import React from "react";
import {
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    Td,
    Box,
    Flex,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import { useProductByTiersQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";

interface Props { }

const ProductTier: React.FC<Props> = () => {
    const [{ data, fetching }] = useProductByTiersQuery();

    const params = useParams<{ category: string }>();
    const category = params.category;

    return (
        <>
            <Text
                p="3"
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
                Product โดยบริษัทต่างๆ
            </Text>
            {fetching ? <Flex justify="center">
                <Spinner color="grey" height={50} width={50} />
                <Text p="2" fontSize="2xl" fontWeight="bold">Loading...</Text>
            </Flex> :
                <Flex flexDir="column" boxShadow="md" p="5">
                    <Table variant="striped">
                        <Thead>
                            <Tr>
                                <Th textAlign="center" fontSize="xl" w="13%">
                                    Product ID
                                </Th>
                                <Th textAlign="center" fontSize="xl" w="13%">
                                    บริษัทผู้ผลิต
                                </Th>
                                <Th textAlign="center" fontSize="xl">
                                    productName
                                </Th>
                                <Th textAlign="center" fontSize="xl">
                                    description
                                </Th>
                                <Th textAlign="center" fontSize="xl">
                                    category
                                </Th>
                                <Th textAlign="center" fontSize="xl" w="15%">
                                    บริษัทที่ผลิตให้
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!data?.ProductByTiers
                                ? null
                                : data?.ProductByTiers.filter((val) =>
                                    category === "all" ? val : val?.category === category
                                ).map((product) => (
                                    <Tr key={product?.id}>
                                        <Td>{product?.id}</Td>
                                        <Td>{product?.creatorName}</Td>
                                        <Td>
                                            <Text fontWeight="bold" display="inline-table">
                                                {product?.productName}
                                            </Text>
                                        </Td>
                                        <Td>
                                            <Text display="inline-table">{product?.description}</Text>
                                        </Td>
                                        <Td>{product?.category}</Td>
                                        <Td>
                                            <Box textAlign="center">
                                                {product?.factorys &&
                                                    product.factorys.map((data) => (
                                                        <Text display="inline-table" key={data.id}>
                                                            <br />
                                                            {data.companyName}
                                                        </Text>
                                                    ))}
                                            </Box>
                                        </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </Flex>
            }
        </>
    );
};

export default ProductTier;

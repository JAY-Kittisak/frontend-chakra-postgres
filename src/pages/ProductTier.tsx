import {
    Table, Tbody, Text, Tfoot, Th, Thead, Tr, Td, Box
} from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import { useProductByTiersQuery } from "../generated/graphql";

interface Props { }

const ProductTier: React.FC<Props> = () => {
    const [{ data }] = useProductByTiersQuery()
    return (
        <Layout variant="regular">
            <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                Product โดยบริษัทต่างๆ
            </Text>

            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th fontSize="md" w="13%">Product ID</Th>
                        <Th fontSize="md" w="13%">บริษัทผู้ผลิต</Th>
                        <Th>productName</Th>
                        <Th>description</Th>
                        <Th>category</Th>
                        <Th fontSize="md" w="15%">บริษัทที่ผลิตให้</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {!data?.ProductByTiers ? (
                        null
                    ) : (
                        data.ProductByTiers.map((product) => (
                            <Tr>
                                <Td>{product?.id}</Td>
                                <Td>{product?.creatorName}</Td>
                                <Td>
                                    <Text fontWeight="bold" display="inline-table" color="orange">{product?.productName}</Text>
                                </Td>
                                <Td><Text display="inline-table">{product?.description}</Text></Td>
                                <Td>{product?.category}</Td>
                                <Td>
                                    <Box textAlign="center">
                                        {product?.factorys && product.factorys.map((data) => (

                                            <Text display="inline-table" key={data.id}><br />{data.companyName}</Text>)
                                        )}
                                    </Box>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th fontSize="md" w="13%">Product ID</Th>
                        <Th fontSize="md" w="13%">บริษัทผู้ผลิต</Th>
                        <Th>productName</Th>
                        <Th>description</Th>
                        <Th>category</Th>
                        <Th fontSize="md" w="15%">บริษัทที่ผลิตให้</Th>
                    </Tr>
                </Tfoot>
            </Table>


        </Layout>
    )
}

export default ProductTier
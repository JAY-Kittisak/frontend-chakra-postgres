import React from 'react'
import { useParams } from "react-router-dom";
import {
    Text,
    Flex,
    Divider,
    Image,
    Stack,
    Center,
} from "@chakra-ui/react";

import { useStockItByIdQuery } from '../generated/graphql';
import Spinner from "../components/Spinner";
import { formatAmount } from "../utils/helpers"

interface Props { }

const StockItDetail: React.FC<Props> = () => {
    const params = useParams<{ id: string }>();

    const [{ data, fetching }] = useStockItByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                {data?.stockItById.itemName}
            </Text>
            <Divider mt={1} mb={3} orientation="horizontal" />
            <Center>
                {fetching &&
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading...
                        </Text>
                    </Flex>}

                {!data?.stockItById ? (
                    <Text>No data.</Text>
                ) : (
                    <Flex
                        flexDir="column"
                        w={[null, null, "70%", "70%"]}
                        p={5}
                        rounded="7px"
                        boxShadow="md"
                        bg="white"
                    >
                        <Flex flexDir={["column", "column", "column", "row"]} align="center">
                            <Flex w={[null, null, null, "40%"]} justify="center" align="center">
                                {data.stockItById.imageUrl && (
                                    <Image borderRadius="xl" boxSize="400px" src={data.stockItById.imageUrl} />
                                )}
                            </Flex>
                            <Flex flexDir="column" w={[null, null, null, "60%"]} justify="center">
                                <Flex p={5} flexDir="column" justifyContent="space-between">

                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "xl"]}>ราคา : </Text>
                                        <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">{data.stockItById.price && formatAmount(data.stockItById.price)} บาท</Text>
                                    </Stack>
                                    <Divider orientation="horizontal" mt={3} />

                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "xl"]}>ประเภท : </Text>
                                        <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">{data.stockItById.category}</Text>
                                    </Stack>
                                    <Divider orientation="horizontal" mt={3} />

                                    <Flex mt={3}>
                                        <Text w="130px" fontSize={["sm", "sm", "md", "xl"]}>
                                            Details :{" "}
                                        </Text>
                                    </Flex>
                                    <Flex ml={4}>
                                        <Flex fontSize={["sm", "sm", "md", "xl"]} overflow="inherit" fontWeight="semibold">{data.stockItById.details}</Flex>
                                    </Flex>
                                    <Divider orientation="horizontal" mt={3} />

                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "xl"]}>วันที่ซื้อ : </Text>
                                        <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">{new Date(+data.stockItById.createdAt).toDateString()}</Text>
                                    </Stack>
                                    <Divider orientation="horizontal" mt={3} />
                                    <Text color="red" fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">หมายเหตุ</Text>
                                    <Text color="red" fontSize={["sm", "sm", "md", "xl"]} >
                                        เบิก คือ ...
                                        <br />
                                        ยืม คือ ...
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Center>
        </>
    )
}

export default StockItDetail
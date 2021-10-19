import React from 'react'
import {
    Flex,
    Text,
    Image,
    Stack,
    Center,
    Button,
    Divider,
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import { useHistory, useParams } from 'react-router-dom'

import Spinner from "../components/Spinner";
import {
    useDeleteStockItOrderMutation,
    useStockItOrderByIdQuery
} from "../generated/graphql";
import { formatDate } from "../utils/helpers";

interface Props { }

const ManageStockItOrderDetail: React.FC<Props> = () => {
    const params = useParams<{ id: string }>();
    const history = useHistory()

    const [{ data, fetching }] = useStockItOrderByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    const [, deleteStockItOrder] = useDeleteStockItOrderMutation()

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                Admin manage order stock IT
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />

            <Center>
                {!data?.stockItOrderById || fetching ? (
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading... or No data.
                        </Text>
                    </Flex>
                ) : (
                    <Flex
                        flexDir={["column", "column", "column", "row"]}
                        w={[null, null, null, "70%"]}
                        p={1}
                        rounded="7px"
                        boxShadow="md"
                    >
                        <Flex
                            w={[null, null, null, "40%"]}
                            justify="center"
                            alignItems="center"
                        >
                            {data.stockItOrderById.stockIt.imageUrl && (
                                <Image
                                    borderRadius="xl"
                                    boxSize="400px"
                                    src={data.stockItOrderById.stockIt.imageUrl}
                                />
                            )}
                        </Flex>
                        <Flex p={5} flexDir="column" w={[null, null, null, "60%"]}>
                            <Flex justify="end">
                                <Button colorScheme="red" variant="link" fontSize="xl" rightIcon={<DeleteIcon />}
                                    onClick={async () => {
                                        const response = await deleteStockItOrder({ id: data.stockItOrderById.id })
                                        if (!response) {
                                            alert("Delete Error! โปรดติดต่อผู้ดูแล")
                                        } else if (response) {
                                            history.push("/admin/stock-it-orders")
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </Flex>
                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize="2xl" fontWeight="bold" align="center" mr="4">
                                    {data.stockItOrderById.creator.fullNameTH} ต้องการ {data.stockItOrderById.holdStatus}
                                </Text>
                                <Text
                                    as="i"
                                    fontWeight="bold"
                                    fontSize="xl"
                                    color={
                                        data.stockItOrderById.status === "New"
                                            ? "cyan.600"
                                            : data.stockItOrderById.status === "Preparing"
                                                ? "orange"
                                                : data.stockItOrderById.status === "Success"
                                                    ? "green"
                                                    : undefined
                                    }
                                >
                                    {data.stockItOrderById.status}
                                </Text>
                            </Stack>

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>ชื่อสินค้า : </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.stockItOrderById.stockIt.itemName}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                    สาขา :{" "}
                                </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.stockItOrderById.creator.roles === "client-LKB"
                                        ? "ลาดกระบัง"
                                        : data.stockItOrderById.creator.roles === "client-CDC"
                                            ? "ชลบุรี"
                                            : "Admin"}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>
                                    Serial Number :{" "}
                                </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.stockItOrderById.stockIt.serialNum}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]} w="60vh">
                                    รายละเอียด :{" "}
                                </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {data.stockItOrderById.detail}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Stack isInline mt={3} justify="space-between">
                                <Text fontSize={["sm", "sm", "md", "md"]}>วันที่่ : </Text>
                                <Text
                                    fontSize={["sm", "sm", "md", "md"]}
                                    as="i"
                                    fontWeight="semibold"
                                >
                                    {formatDate(+data.stockItOrderById.updatedAt)}
                                </Text>
                            </Stack>
                            <Divider mt={3} orientation="horizontal" />

                            <Text fontSize={["sm", "sm", "md", "md"]} mt={3}>
                                สถานะการจัดส่ง :{" "}
                            </Text>
                            {/* <AdminStatusControl
                                    functionName="GiveOrder"
                                    id={data.giveOrderById.id}
                                    prevStatus={data.giveOrderById.status}
                                /> */}
                        </Flex>
                    </Flex>
                )}
            </Center>
        </>
    )
}

export default ManageStockItOrderDetail
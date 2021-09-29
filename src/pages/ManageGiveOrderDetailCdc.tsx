import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import {
    useColorModeValue,
    Flex,
    Text,
    Image,
    Stack,
    Center,
    Button,
    Divider,
    useColorMode,
} from "@chakra-ui/react";
import { useReactToPrint } from "react-to-print";
import { DeleteIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'

import Spinner from "../components/Spinner";
import AdminStatusControl from "../components/AdminStatusControl";
import { useDeleteGiveOrderCdcMutation, useGiveOrderByIdCdcQuery } from "../generated/graphql";
import { formatAmount, formatDate } from "../utils/helpers";

interface Props { }

const ManageGiveOrderDetailCdc: React.FC<Props> = () => {
    const printRef = useRef<HTMLDivElement>(null);
    const history = useHistory()

    const bg = useColorModeValue("white", "gray.700");
    const { colorMode } = useColorMode();
    const bgButton = useColorModeValue("orange", "teal");

    const [, deleteGiveOrderCdc] = useDeleteGiveOrderCdcMutation()

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useGiveOrderByIdCdcQuery({
        variables: {
            id: +params.id,
        },
    });

    const printInvoice = useReactToPrint({
        content: () => printRef.current,
        documentTitle: `Invoice - ${params.id}`,
    });

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
            >
                Admin manage order
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />

            <Center>
                {!data?.giveOrderByIdCdc || fetching ? (
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading... or No data.
                        </Text>
                    </Flex>
                ) : (
                    <>
                        {/* ----------------------------------Print---------------------------------- */}
                        <Flex display="none">
                            <Flex
                                flexDir={["column", "column", "column", "row"]}
                                w={[null, null, "70%", "70%"]}
                                p={9}
                                bg={bg}
                                ref={printRef}
                            >
                                <Flex
                                    w={[null, null, null, "40%"]}
                                    justify="center"
                                    alignItems="center"
                                >
                                    {data.giveOrderByIdCdc.give.imageUrl && (
                                        <Image
                                            borderRadius="xl"
                                            boxSize="400px"
                                            src={data.giveOrderByIdCdc.give.imageUrl}
                                        />
                                    )}
                                </Flex>
                                <Flex p={5} flexDir="column" w={[null, null, null, "60%"]}>
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize="xl" fontWeight="bold" align="center" mr="4">
                                            Order ID : {data.giveOrderByIdCdc.id}
                                        </Text>
                                        <Text
                                            as="i"
                                            fontWeight="bold"
                                            fontSize="xl"
                                            color={
                                                data.giveOrderByIdCdc.status === "New"
                                                    ? colorMode === "light"
                                                        ? "cyan.600"
                                                        : "cyan"
                                                    : data.giveOrderByIdCdc.status === "Preparing"
                                                        ? "orange"
                                                        : data.giveOrderByIdCdc.status === "Success"
                                                            ? "green"
                                                            : undefined
                                            }
                                        >
                                            {data.giveOrderByIdCdc.status}
                                        </Text>
                                    </Stack>
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "md"]}>
                                            จำนวนที่เบิก :{" "}
                                        </Text>
                                        <Text
                                            fontSize={["sm", "sm", "md", "md"]}
                                            as="i"
                                            fontWeight="semibold"
                                        >
                                            {data.giveOrderByIdCdc.amount} ชิ้น
                                        </Text>
                                    </Stack>
                                    <Divider mt={3} orientation="horizontal" />
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "md"]}>
                                            ชื่อผู้ร้องขอ :{" "}
                                        </Text>
                                        <Text
                                            fontSize={["sm", "sm", "md", "md"]}
                                            as="i"
                                            fontWeight="semibold"
                                        >
                                            {data.giveOrderByIdCdc.creator.fullNameTH}
                                        </Text>
                                    </Stack>
                                    <Divider mt={3} orientation="horizontal" />
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "md"]}>ราคารวม : </Text>
                                        <Text
                                            fontSize={["sm", "sm", "md", "md"]}
                                            as="i"
                                            fontWeight="semibold"
                                        >
                                            {data.giveOrderByIdCdc.price &&
                                                formatAmount(data.giveOrderByIdCdc.price)}{" "}
                                            บาท
                                        </Text>
                                    </Stack>
                                    <Divider mt={3} orientation="horizontal" />
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "md"]}>ชื่อสินค้า : </Text>
                                        <Text
                                            fontSize={["sm", "sm", "md", "md"]}
                                            as="i"
                                            fontWeight="semibold"
                                        >
                                            {data.giveOrderByIdCdc.give.giveName}
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
                                            {data.giveOrderByIdCdc.customerDetail}
                                        </Text>
                                    </Stack>
                                    <Divider mt={3} orientation="horizontal" />
                                    <Stack isInline mt={3} justify="space-between">
                                        <Text fontSize={["sm", "sm", "md", "md"]}>วันที่เบิก : </Text>
                                        <Text
                                            fontSize={["sm", "sm", "md", "md"]}
                                            as="i"
                                            fontWeight="semibold"
                                        >
                                            {data.giveOrderByIdCdc.createdAt &&
                                                formatDate(+data.giveOrderByIdCdc.createdAt)}
                                        </Text>
                                    </Stack>
                                    <Divider mt={3} orientation="horizontal" />

                                </Flex>
                                <Flex flexDir="column" alignItems="flex-end" mt="10">
                                    <Flex flexDir="column" alignItems="center">
                                        <Text mt="5">
                                            .................................................
                                        </Text>
                                        <Text mt="5">
                                            (&nbsp;________________________&nbsp;)
                                        </Text>
                                        <Text mt="5">
                                            วันที่ &nbsp; ____&nbsp;/____&nbsp;/____
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>

                        {/* ----------------------------------UI---------------------------------- */}
                        <Flex
                            flexDir={["column", "column", "column", "row"]}
                            w={[null, null, null, "70%"]}
                            p={1}
                            rounded="7px"
                            boxShadow="md"
                            bg={bg}
                        >
                            <Flex
                                w={[null, null, null, "40%"]}
                                justify="center"
                                alignItems="center"
                            >
                                {data.giveOrderByIdCdc.give.imageUrl && (
                                    <Image
                                        borderRadius="xl"
                                        boxSize="400px"
                                        src={data.giveOrderByIdCdc.give.imageUrl}
                                    />
                                )}
                            </Flex>
                            <Flex p={5} flexDir="column" w={[null, null, null, "60%"]}>
                                <Flex justify="end">
                                    <Button colorScheme="red" variant="link" fontSize="xl" rightIcon={<DeleteIcon />}
                                        onClick={async () => {
                                            const response = await deleteGiveOrderCdc({ id: data.giveOrderByIdCdc.id })
                                            if (!response) {
                                                alert("Delete Error! โปรดติดต่อผู้ดูแล")
                                            } else if (response) {
                                                history.push("/admin/manage-give-orders")
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Flex>
                                <Stack isInline mt={3} justify="space-between">
                                    <Flex>
                                        <Text fontSize="xl" fontWeight="bold" align="center" mr="4">
                                            Order ID : {data.giveOrderByIdCdc.id}
                                        </Text>
                                        {data.giveOrderByIdCdc.status === "New" && (
                                            <Button
                                                colorScheme={bgButton}
                                                mt="-1"
                                                onClick={printInvoice}
                                                fontSize="xl"
                                            >
                                                Print
                                            </Button>
                                        )}
                                    </Flex>
                                    <Text
                                        as="i"
                                        fontWeight="bold"
                                        fontSize="xl"
                                        color={
                                            data.giveOrderByIdCdc.status === "New"
                                                ? colorMode === "light"
                                                    ? "cyan.600"
                                                    : "cyan"
                                                : data.giveOrderByIdCdc.status === "Preparing"
                                                    ? "orange"
                                                    : data.giveOrderByIdCdc.status === "Success"
                                                        ? "green"
                                                        : undefined
                                        }
                                    >
                                        {data.giveOrderByIdCdc.status}
                                    </Text>
                                </Stack>

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        จำนวนที่เบิก :{" "}
                                    </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.giveOrderByIdCdc.amount} ชิ้น
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        ชื่อผู้ร้องขอ :{" "}
                                    </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.giveOrderByIdCdc.creator.fullNameTH}
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>ราคารวม : </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.giveOrderByIdCdc.price &&
                                            formatAmount(data.giveOrderByIdCdc.price)}{" "}
                                        บาท
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>ชื่อสินค้า : </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.giveOrderByIdCdc.give.giveName}
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
                                        {data.giveOrderByIdCdc.customerDetail}
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Stack isInline mt={3} justify="space-between">
                                    <Text fontSize={["sm", "sm", "md", "md"]}>วันที่เบิก : </Text>
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        as="i"
                                        fontWeight="semibold"
                                    >
                                        {data.giveOrderByIdCdc.createdAt &&
                                            formatDate(+data.giveOrderByIdCdc.createdAt)}
                                    </Text>
                                </Stack>
                                <Divider mt={3} orientation="horizontal" />

                                <Text fontSize={["sm", "sm", "md", "md"]} mt={3}>
                                    สถานะการจัดส่ง :{" "}
                                </Text>
                                <AdminStatusControl
                                    functionName="GiveOrderCdc"
                                    id={data.giveOrderByIdCdc.id}
                                    prevStatus={data.giveOrderByIdCdc.status}
                                />
                            </Flex>
                        </Flex>
                    </>
                )}
            </Center>
        </>
    );
};

export default ManageGiveOrderDetailCdc;

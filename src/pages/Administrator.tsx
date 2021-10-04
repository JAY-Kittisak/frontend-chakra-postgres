import React from "react";
import { Text, Flex, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Chart from "../components/chart/Chart";
import {
    useGiveOrdersCdcQuery,
    useGiveOrdersQuery,
} from "../generated/graphql";

interface Props { }

const Administrator: React.FC<Props> = () => {
    const [{ data, fetching }] = useGiveOrdersQuery();
    const [{ data: dataCdc, fetching: fetchingCdc }] = useGiveOrdersCdcQuery();

    if (fetching || fetchingCdc) {
        return <Text fontSize="6xl">Loading...</Text>;
    }

    const giveNew = data?.giveOrders?.filter((give) => give.status === "New");
    const giveNewCdc = dataCdc?.giveOrdersCdc?.filter(
        (give) => give.status === "New"
    );
    const givePreparing = data?.giveOrders?.filter(
        (give) => give.status === "Preparing"
    );
    const givePreparingCdc = dataCdc?.giveOrdersCdc?.filter(
        (give) => give.status === "Preparing"
    );
    const giveSuccess = data?.giveOrders?.filter(
        (give) => give.status === "Success"
    );
    const giveSuccessCdc = dataCdc?.giveOrdersCdc?.filter(
        (give) => give.status === "Success"
    );

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
            >
                ผู้ดูแลระบบ
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />
            <Flex
                flexDir="column"
                w="375px"
                h="100%"
                boxShadow="md"
                ml="5"
                rounded="lg"
                p="3"
            >
                <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                    ระบบเบิกของแจกลูกค้า
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
                                {giveNew && giveNewCdc && giveNew.length + giveNewCdc.length}
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
                                {givePreparing &&
                                    givePreparingCdc &&
                                    givePreparing.length + givePreparingCdc.length}
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
                                {giveSuccess &&
                                    giveSuccessCdc &&
                                    giveSuccess.length + giveSuccessCdc.length}
                            </Text>
                            <Text fontSize="xl" fontWeight="bold" color="green">
                                Success
                            </Text>
                        </Flex>
                    </Flex>

                    <Link to="/admin/manage-gives">
                        <Text as="u" fontSize="xl">
                            จัดการของแจก
                        </Text>
                    </Link>
                    <Link to="/admin/manage-give-orders">
                        <Text as="u" fontSize="xl">
                            จัดการ Order ของแจก
                        </Text>
                    </Link>
                    <Link to="/admin/manage-give-category">
                        <Text as="u" fontSize="xl">
                            เพิ่มกลุ่มสินค้าใหม่
                        </Text>
                    </Link>
                </Flex>
            </Flex>

            <Flex justify="center" mt="6">
                <Chart />
            </Flex>
        </>
    );
};

export default Administrator;

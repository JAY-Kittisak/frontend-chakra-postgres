import React from "react";
import { Text, Flex, Divider } from "@chakra-ui/react";

import Chart from "../components/chart/Chart";
import AdministratorItem from "../components/AdministratorItem";
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

    const sumLength = {
        newNum: giveNew && giveNewCdc && giveNew.length + giveNewCdc.length,
        preparingNum:
            givePreparing &&
            givePreparingCdc &&
            givePreparing.length + givePreparingCdc.length,
        successNum:
            giveSuccess &&
            giveSuccessCdc &&
            giveSuccess.length + giveSuccessCdc.length,
    };

    const contentGive = {
        main: "จัดการของแจก",
        order: "จัดการ Order ของแจก",
        addCategory: "เพิ่มกลุ่มสินค้าใหม่",
    };
    const contentStockIt = {
        main: "จัดการ Stock-IT",
        order: "จัดการ Order Stock-IT",
        addCategory: undefined,
    };

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                ผู้ดูแลระบบ
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />
            <Flex>
                <AdministratorItem
                    title="ระบบเบิกของแจกลูกค้า"
                    sumLength={sumLength}
                    toMain="/admin/manage-gives"
                    toOrder="/admin/manage-give-orders"
                    content={contentGive}
                />
                <AdministratorItem
                    title="ระบบเบิกอุปกรณ์ IT"
                    sumLength={{
                        newNum: 5,
                        preparingNum: 5,
                        successNum: 5,
                    }}
                    toMain="/admin/manage-stock-it"
                    toOrder="/admin/stock-it-orders"
                    content={contentStockIt}
                />
            </Flex>

            <Flex justify="center" mt="6">
                <Chart />
            </Flex>
        </>
    );
};

export default Administrator;

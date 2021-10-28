import React from "react";
import { Text, Flex, Divider } from "@chakra-ui/react";

import Chart from "../components/chart/Chart";
import Spinner from "../components/Spinner"
import AdministratorItem from "../components/AdministratorItem";
import {
    useGiveOrdersCdcQuery,
    useGiveOrdersQuery,
    useJobITsQuery,
    useStockItOrdersQuery,
} from "../generated/graphql";

interface Props { }

const Administrator: React.FC<Props> = () => {
    const [{ data: jobIt, fetching: fetchingJt }] = useJobITsQuery({
        variables: {
            input: {
                nameItAction: "",
                status: "",
                dateBegin: "",
                dateEnd: "",
            },
        },
    });
    const [{ data, fetching }] = useGiveOrdersQuery();
    const [{ data: dataCdc, fetching: fetchingCdc }] = useGiveOrdersCdcQuery();
    const [{ data: stockIto, fetching: fetchingSto }] = useStockItOrdersQuery({ variables: { createBy: false } });

    let body = null
    if (fetchingJt || fetching || fetchingCdc || fetchingSto) {
        body = (
            <Flex justify="center" align="center">
                <Spinner color="grey" height={70} width={70} />
                <Text ml="2" fontSize="6xl">Loading...</Text>
            </Flex>
        )
    }
    //------------------------------------ JobITs ---------------------------------------------
    const jobItNew = jobIt?.jobITs?.filter((val) => val.status === "New");
    const jobItWait = jobIt?.jobITs?.filter((val) => val.status === "Wait Approve");
    const jobItSuc = jobIt?.jobITs?.filter((val) => val.status === "Success");
    const jobItImp = jobIt?.jobITs?.filter((val) => val.status === "Impossible");
    //------------------------------------ GiveOrders ---------------------------------------------
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
    //------------------------------------ stockIto ---------------------------------------------
    const stockItoNew = stockIto?.stockItOrders?.filter((val) => val.status === "New");
    const stockItoPr = stockIto?.stockItOrders?.filter((val) => val.status === "Preparing");
    const stockItoSuc = stockIto?.stockItOrders?.filter((val) => val.status === "Success");

    const sumLength = {
        newNum: giveNew && giveNewCdc && giveNew.length + giveNewCdc.length,
        waitApprove: undefined,
        preparingNum:
            givePreparing &&
            givePreparingCdc &&
            givePreparing.length + givePreparingCdc.length,
        successNum:
            giveSuccess &&
            giveSuccessCdc &&
            giveSuccess.length + giveSuccessCdc.length,
        impossible: undefined
    };

    const contentJobIt = {
        main: "จัดการ Job-IT",
        order: undefined,
        addCategory: undefined,
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
            {body ? body : (
                <>
                    <Flex flexDir={["column", "column", "column", "column", "row"]}>
                        <AdministratorItem
                            title="ระบบแจ้ง Job IT"
                            sumLength={{
                                newNum: jobItNew?.length,
                                waitApprove: jobItWait?.length,
                                preparingNum: undefined,
                                successNum: jobItSuc?.length,
                                impossible: jobItImp?.length
                            }}
                            toMain="/admin/manage-job-it"
                            toOrder={undefined}
                            content={contentJobIt}
                        />
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
                                newNum: stockItoNew?.length,
                                waitApprove: undefined,
                                preparingNum: stockItoPr?.length,
                                successNum: stockItoSuc?.length,
                                impossible: undefined
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
            )}

        </>
    );
};

export default Administrator;

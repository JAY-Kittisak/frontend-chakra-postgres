import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import SelectBranch from "../components/SelectBranch";
import { Branch } from "../utils/helpers";
import { RegularStockItOrderFragment, useStockItOrdersQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";
import AdminStockOrItem from "../components/StockIt/AdminStockOrItem";

interface Props { }

const ManageStockItOrders: React.FC<Props> = () => {
    const [branch, setBranch] = useState<Branch>("All");
    const [item, setItem] = useState<RegularStockItOrderFragment[] | undefined>(
        undefined
    );

    const [{ data, fetching }] = useStockItOrdersQuery({
        variables: {
            createBy: false,
        },
    });

    useEffect(() => {
        if (branch === "All" && data?.stockItOrders) {
            setItem(data.stockItOrders);
        }
        if (branch === "ลาดกระบัง") {
            const latKraBang = data?.stockItOrders?.filter((val) => val.branch === branch);
            setItem(latKraBang);
        }
        if (branch === "ชลบุรี") {
            const cdc = data?.stockItOrders?.filter((val) => val.branch === branch);
            setItem(cdc);
        }
    }, [branch, data]);

    return (
        <>
            <SelectBranch
                title="Manages Stock IT"
                branch={branch}
                setBranch={setBranch}
            />

            <Flex
                flexDir="column"
                p={9}
                rounded="7px"
                boxShadow="md"
                mt="5"
            >
                <Flex flexDir="column" overflowX="auto">
                    <Flex
                        // justify="space-around"
                        bg="#028174"
                        rounded="7px"
                        color="white"
                        h="35px"
                        align="center"
                    >
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="16%"
                            textAlign="center"
                        >
                            วันที่สั่ง
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="18%"
                            textAlign="center"
                        >
                            รายละเอียด
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="15%"
                            textAlign="center"
                        >
                            Serial Number
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="21%"
                            textAlign="center"
                        >
                            Hold Status
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="12%"
                            textAlign="center"
                        >
                            สถานะ
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="18%"
                            textAlign="center"
                        >
                            Manage order
                        </Text>
                    </Flex>

                    <Flex flexDir="column">
                        {fetching || !data?.stockItOrders ? (
                            <Flex justify="center" mt="5">
                                <Spinner color="grey" height={50} width={50} />
                                <Text fontWeight="bold" fontSize="2xl">
                                    &nbsp; Loading...
                                </Text>
                            </Flex>
                        ) : (
                            item?.map((val) => (
                                <AdminStockOrItem key={val.id} order={val} />
                            ))
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default ManageStockItOrders;

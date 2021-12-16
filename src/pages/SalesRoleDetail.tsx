import React, { useEffect, useState } from "react";
import {
    Flex, Text, Divider, Image, Table, Tbody, Th, Thead, Tr,
    Td, Center, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Select
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

import { useMeQuery, useSalesRoleByIdQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/uselsAuth";
import Spinner from "../components/Spinner";
import {
    AlertNt,
    formatAmount,
    formatDate,
    formatGetMonth,
    formatGetYear,
    selectMonth,
    reducer
} from "../utils/helpers";
import AlertNotification from "../components/dialogs/AlertNotification";

import SalesChart from "../components/sales-report/SalesChart";

interface Props { }

const SalesRoleDetail: React.FC<Props> = () => {
    useIsAuth();

    const today = new Date().getFullYear().toString()

    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");

    const [item, setItem] = useState(0)

    const [chooseMonth, setChooseMonth] = useState("เดือน");
    const [chooseYear, setChooseYear] = useState(today);

    const [monthlyValue, setMonthlyValue] = useState([{
        เดือน: "",
        safety_line: 5000,
        target_กลยุทธ์: 4500,
        target_KPI: 4000,
        value: 0,
    }])

    const history = useHistory();
    const params = useParams<{ id: string }>();

    const [{ data, fetching }] = useSalesRoleByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    const [{ data: me }] = useMeQuery();

    const userHandle = (userId: number) => {
        if (me?.me?.position.includes("หัวหน้างาน")) {
            return history.push(`/user-id/${userId}`);
        } else if (me?.me?.position.includes("GM")) {
            return history.push(`/user-id/${userId}`);
        } else if (me?.me?.id === userId) {
            return history.push(`/user-id/${userId}`);
        } else {
            return setAlertWarning("show");
        }
    };

    const onChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChooseMonth(e.target.value);
    };

    const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChooseYear(e.target.value);
    };
    //----------------------------------------------------- FILTER -------------------------------------------------------------------
    useEffect(() => {
        setItem(0)
        const issueFilterYear = data?.salesRoleById.issues.filter(
            (y) => formatGetYear(+y.createdAt) === (+chooseYear)
        );
        const issueFilterMonth = issueFilterYear?.filter(
            (m) => (selectMonth[formatGetMonth(+m.createdAt) + 1]) === chooseMonth
        );
        // const actualSum = data?.salesRoleById.salesActual.map((val) => val.actual);

        const issueFilterSum = issueFilterMonth?.map((val) => val.value);
        if (chooseMonth === "เดือน") {
            setMonthlyValue([])
            const queryValue = issueFilterYear?.map(val => val.value)
            let result = 0
            if ((queryValue?.length !== 0) && queryValue) {
                result = queryValue.reduce(reducer)
            }
            setItem(result)

            // const groupBy = (key: number,arr:[]) => arr
            //     .reduce(
            //         (cache, product) => {
            //             const property = product[key]
            //             if (property in cache) {
            //                 return {...cache, [property]: cache[property].concat(product)
            //                 }
            //             }
            //             return {...cache, [property]: [product]}
            //         },
            //         {}
            //     )

            issueFilterYear?.forEach(m => setMonthlyValue((arr) => [...arr, {
                เดือน: selectMonth[formatGetMonth(+m.createdAt) + 1],
                safety_line: 5000,
                target_กลยุทธ์: 4500,
                target_KPI: 4000,
                value: 0,
            }])
            )
        } else if ((chooseMonth !== "เดือน") && (issueFilterSum?.length !== 0)) {
            const result = issueFilterSum?.reduce(reducer)
            if (result) {
                setItem(result)
            }
        } else {
            setItem(0)
        }
    }, [data, chooseMonth, chooseYear]);
    console.log("monthlyValue", monthlyValue)

    return (
        <Flex flexDir="column" p="5" pb="10" overflow="auto" h="95vh">
            <Flex justify="space-between">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="gray.600"
                >
                    {data?.salesRoleById.salesRole} {data?.salesRoleById.branch}
                </Text>
                <Flex>
                    <Select
                        w="150px"
                        mr="5"
                        fontWeight="semibold"
                        name="selectMonth"
                        onChange={(e) => onChangeMonth(e)}
                    >
                        {selectMonth.map((val, i) => (
                            <option key={i} value={val}>
                                {val}
                            </option>
                        ))}
                    </Select>
                    <Select
                        w="150px"
                        fontWeight="semibold"
                        name="selectYear"
                        onChange={(e) => onChangeYear(e)}
                    >
                        {data?.salesRoleById.targets.map((val) => (
                            <option key={val.id} value={val.year}>{val.year}</option>
                        ))}
                    </Select>
                </Flex>
            </Flex>
            <Divider mt={1} mb={2} orientation="horizontal" />
            <AlertNotification
                alertWarning={alertWarning}
                setAlertWarning={setAlertWarning}
                label="คุณไม่สามารถเข้าถึงข้อมูลนี้ได้!"
            />
            {fetching ? (
                <Flex justify="center">
                    <Spinner color="grey" height={50} width={50} />
                    <Text
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        my={2}
                    >
                        {" "}
                        &nbsp; Loading...
                    </Text>
                </Flex>
            ) : !data?.salesRoleById ? (
                <Flex justify="center">
                    <Text
                        color="orange.600"
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        my={2}
                    >
                        แจ้งเตือน: คุณไม่สามารถเข้าถึงข้อมูลนี้ได้
                    </Text>
                </Flex>
            ) : (
                <>
                            <Flex justify="space-between" align="center" h="320px" w="100%">
                                <Flex flexDir="column" w={["100%", "100%", "40%", "40%", "70%"]}>
                                    <SalesChart
                                        colorBranch="#64c9e2"
                                        colorBranchPass="#1379ec"
                                        colorOnMouse="#0a7988"
                                        team={chooseYear}
                                    />
                                </Flex>
                                <Flex align="center">
                                    <Flex flexDir="column" p="5" h="100%">
                                        <Flex justify="space-between" mb="1" px="2">
                                            <Text fontWeight="bold" fontSize="xl">
                                                Target
                                            </Text>
                                            <Button
                                                ml="5"
                                                size="sm"
                                                colorScheme="blue"
                                                leftIcon={<AddIcon />}
                                            // onClick={() => {
                                            //     setIsOpen(true);
                                            // }}
                                            >
                                                เพิ่ม
                                            </Button>
                                        </Flex>

                                        <Table
                                            boxShadow="base"
                                            variant="striped"
                                            colorScheme="blackAlpha"
                                        >
                                            <Thead>
                                                <Tr bg="#1379ec">
                                                    <Th
                                                        textAlign="center"
                                                        fontSize={["xs", "xs", "sm", "md"]}
                                                        color="white"
                                                    >
                                                        Year
                                                    </Th>
                                                    <Th
                                                        textAlign="center"
                                                        fontSize={["xs", "xs", "sm", "md"]}
                                                        color="white"
                                                    >
                                                        Value
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {data.salesRoleById.targets.map((val) => (
                                                    <Tr key={val.id}>
                                                        <Td>
                                                            <Center>{val.year}</Center>
                                                        </Td>
                                                        <Td>
                                                            <Center>{formatAmount(val.value)}</Center>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </Flex>
                                    <Flex
                                        flexDir="column"
                                        p="2"
                                        mr="5"
                                        h="300px"
                                        w="220px"
                                        cursor="pointer"
                                        borderRadius="xl"
                                        background="#1379ec"
                                        color="white"
                                        align="center"
                                        _hover={{ fontWeight: "bold" }}
                                        onClick={() => userHandle(data?.salesRoleById.user.id)}
                                    >
                                        <Text fontSize="xl" mb="3" fontWeight="bold">
                                            SALE REPORT
                                        </Text>
                                        {data?.salesRoleById.user.imageUrl && (
                                            <Image
                                                borderRadius="xl"
                                                boxSize="200px"
                                                src={data.salesRoleById.user.imageUrl}
                                                alt="Dan Abramov"
                                            />
                                        )}
                                        <Text fontSize="xl" mt="3">
                                            {data?.salesRoleById.user.fullNameTH}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex p="3" rounded="7px" boxShadow="md">
                                <Tabs align="end" variant="enclosed" w="100%">
                                    <TabList>
                                        <Tab>Issue</Tab>
                                        <Tab>ยอดขาย</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <Flex>
                                                <Text ml="6" fontWeight="bold" fontSize="xl">
                                                    {" "}
                                                    ประวัติการกรอก Issue ของทั้งหมด
                                                </Text>
                                                <Text
                                                    ml="2"
                                                    fontWeight="bold"
                                                    fontSize="xl"
                                                    color="blue.500"
                                                >
                                                    {formatAmount(item)}
                                                </Text>
                                            </Flex>
                                            <Table
                                                boxShadow="base"
                                                variant="striped"
                                                colorScheme="blackAlpha"
                                            >
                                                <Thead>
                                                    <Tr bg="#1379ec">
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            วันที่ไปพบลูกค้า
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            user
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            สินค้าที่ขาย
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            รายละเอียด
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            ราคา
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            ขายให้กับบริษัท
                                                        </Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {data.salesRoleById.issues.map((val, i) => (
                                                        <Tr key={i}>
                                                            <Td w="10%">
                                                                <Center>{formatDate(+val.createdAt)}</Center>
                                                            </Td>
                                                            <Td w="10%">
                                                                <Center>val.user.fullNameTH</Center>
                                                            </Td>
                                                            <Td w="20%">{val.title}</Td>
                                                            <Td w="30%">{val.detail}</Td>
                                                            <Td w="10%">
                                                                <Center>{formatAmount(val.value)}</Center>
                                                            </Td>
                                                            <Td w="20%">{val.contact}</Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TabPanel>
                                        <TabPanel>
                                            {/* {actualSum?.length === 0 || !actualSum ? (
                                                <Flex>
                                                    <Text ml="6" fontWeight="bold" fontSize="xl">
                                                        ยังไม่มีข้อมูล
                                                    </Text>
                                                </Flex>
                                            ) : (
                                                <Flex>
                                                    <Text ml="6" fontWeight="bold" fontSize="xl">
                                                        {" "}
                                                        ประวัติการกรอก Issue ของทั้งหมด
                                                    </Text>
                                                    <Text
                                                        ml="2"
                                                        fontWeight="bold"
                                                        fontSize="xl"
                                                        color="blue.500"
                                                    >
                                                        {formatAmount(actualSum.reduce(reducer))}
                                                    </Text>
                                                </Flex>
                                            )} */}
                                            <Table
                                                boxShadow="base"
                                                variant="striped"
                                                colorScheme="blackAlpha"
                                            >
                                                <Thead>
                                                    <Tr bg="#1379ec">
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            วันที่ไปพบลูกค้า
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            user
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            สินค้าที่ขาย
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            รายละเอียด
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            ราคา
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            ขายให้กับบริษัท
                                                        </Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {data.salesRoleById.salesActual.map((val, i) => (
                                                        <Tr key={i}>
                                                            <Td w="10%">
                                                                <Center>{formatDate(+val.createdAt)}</Center>
                                                            </Td>
                                                            <Td w="10%">
                                                                <Center>{val.user.fullNameTH}</Center>
                                                            </Td>
                                                            <Td w="20%">{val.title}</Td>
                                                            <Td w="30%">{val.detail}</Td>
                                                            <Td w="10%">
                                                                <Center>{formatAmount(val.actual)}</Center>
                                                            </Td>
                                                            <Td w="20%">{val.customer.customerName}</Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default SalesRoleDetail;

import React, { useEffect, useState } from "react";
import {
    Flex,
    Text,
    Divider,
    Image,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Td,
    Center,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Select,
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
    reducer,
    demoData,
} from "../utils/helpers";
import AlertNotification from "../components/dialogs/AlertNotification";

import SalesChart from "../components/sales-report/SalesChart";
import SalesPercent from "../components/sales-report/SalesPercent";
import IssueChart from "../components/sales-report/IssueChart";

interface Props { }

const SalesRoleDetail: React.FC<Props> = () => {
    useIsAuth();

    const today = new Date().getFullYear().toString();

    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");

    const [monthValue, setMonthValue] = useState({
        มกราคม: 0,
        กุมภาพันธ์: 0,
        มีนาคม: 0,
        เมษายน: 0,
        พฤษภาคม: 0,
        มิถุนายน: 0,
        กรกฎาคม: 0,
        สิงหาคม: 0,
        กันยายน: 0,
        ตุลาคม: 0,
        พฤศจิกายน: 0,
        ธันวาคม: 0,
    });

    const [item, setItem] = useState(0);

    const [chooseMonth, setChooseMonth] = useState("เดือน");
    const [chooseYear, setChooseYear] = useState(today);

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
        setItem(0);

        let januaryResult = 0;
        let februaryResult = 0;
        let marchResult = 0;
        let aprilResult = 0;
        let mayResult = 0;
        let juneResult = 0;
        let julyResult = 0;
        let augustResult = 0;
        let septemberResult = 0;
        let octoberResult = 0;
        let novemberResult = 0;
        let decemberResult = 0;

        // const issueFilterYear = data?.salesRoleById.issues.filter(
        const issueFilterYear = demoData?.filter(
            (y) => formatGetYear(+y.createdAt) === +chooseYear
        );
        console.log("issueFilterYear", issueFilterYear);
        const issueFilterMonth = issueFilterYear?.filter(
            (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === chooseMonth
        );
    // const actualSum = data?.salesRoleById.salesActual.map((val) => val.actual);
        const issueFilterSum = issueFilterMonth?.map((val) => val.value);

        if (issueFilterYear && chooseMonth === "เดือน") {
            const queryValue = issueFilterYear.map((val) => val.value);
            let result = 0;
            if (queryValue.length !== 0) {
                result = queryValue.reduce(reducer);
            }
            setItem(result);

            const januaryFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "มกราคม"
                )
                .map((val) => val.value);
            if (januaryFilter.length !== 0) {
                januaryResult = januaryFilter.reduce(reducer);
            }

            const februaryFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "กุมภาพันธ์"
                )
                .map((val) => val.value);
            if (februaryFilter.length !== 0) {
                februaryResult = februaryFilter.reduce(reducer);
            }

            const marchFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "มีนาคม"
                )
                .map((val) => val.value);
            if (marchFilter.length !== 0) {
                marchResult = marchFilter.reduce(reducer);
            }

            const aprilFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "เมษายน"
                )
                .map((val) => val.value);
            if (aprilFilter.length !== 0) {
                aprilResult = aprilFilter.reduce(reducer);
            }

            const mayFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "พฤษภาคม"
                )
                .map((val) => val.value);
            if (mayFilter.length !== 0) {
                mayResult = mayFilter.reduce(reducer);
            }

            const juneFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "มิถุนายน"
                )
                .map((val) => val.value);
            if (juneFilter.length !== 0) {
                juneResult = juneFilter.reduce(reducer);
            }

            const julyFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "กรกฎาคม"
                )
                .map((val) => val.value);
            if (julyFilter.length !== 0) {
                julyResult = julyFilter.reduce(reducer);
            }

            const augustFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "สิงหาคม"
                )
                .map((val) => val.value);
            if (augustFilter.length !== 0) {
                augustResult = augustFilter.reduce(reducer);
            }

            const septemberFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "กันยายน"
                )
                .map((val) => val.value);
            if (septemberFilter.length !== 0) {
                septemberResult = septemberFilter.reduce(reducer);
            }

            const octoberFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "ตุลาคม"
                )
                .map((val) => val.value);
            if (octoberFilter.length !== 0) {
                octoberResult = octoberFilter.reduce(reducer);
            }

            const novemberFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "พฤศจิกายน"
                )
                .map((val) => val.value);
            if (novemberFilter.length !== 0) {
                novemberResult = novemberFilter.reduce(reducer);
            }

            const decemberFilter = issueFilterYear
                .filter(
                    (m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "ธันวาคม"
            )
                .map((val) => val.value);
            if (decemberFilter.length !== 0) {
                decemberResult = decemberFilter.reduce(reducer);
            }

            setMonthValue({
                มกราคม: januaryResult,
                กุมภาพันธ์: februaryResult,
                มีนาคม: marchResult,
                เมษายน: aprilResult,
                พฤษภาคม: mayResult,
                มิถุนายน: juneResult,
                กรกฎาคม: julyResult,
                สิงหาคม: augustResult,
                กันยายน: septemberResult,
                ตุลาคม: octoberResult,
                พฤศจิกายน: novemberResult,
                ธันวาคม: decemberResult,
            });
        } else if (chooseMonth !== "เดือน" && issueFilterSum?.length !== 0) {
            const result = issueFilterSum?.reduce(reducer);
            if (result) {
                setItem(result);
            }
        } else {
            setItem(0);
        }
    }, [data, chooseMonth, chooseYear]);

    console.log("monthValue", monthValue);

    return (
        <Flex flexDir="column" p="5" pb="10" overflow="auto" h="96vh">
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
                            <option key={val.id} value={val.year}>
                                {val.year}
                            </option>
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
                            <Flex justify="center" align="center" h="320px" w="100%">
                                <Flex
                                    mr="1"
                                    h="230px"
                                    w="230px"
                                    cursor="pointer"
                                    rounded="7px"
                                    boxShadow="md"
                                    _hover={{ fontWeight: "bold" }}
                                    onClick={() => userHandle(data?.salesRoleById.user.id)}
                                >
                                    {data?.salesRoleById.user.imageUrl && (
                                        <Image
                                            borderRadius="lg"
                                            boxSize="230"
                                            src={data.salesRoleById.user.imageUrl}
                                            alt="Dan Abramov"
                                        />
                                    )}
                                </Flex>

                                <Flex
                                    flexDir="column"
                                    fontSize="md"
                                    h="230px"
                                    w="280px"
                                    p="5"
                                    mr="1"
                                    rounded="7px"
                                    boxShadow="md"
                                    background="#1379ec"
                                    color="white"
                                >
                                    <Flex justify="space-between">
                                        <Text fontWeight="semibold">Company</Text>
                                        <Text>JSRI</Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontWeight="semibold">Name</Text>
                                        <Text>{data.salesRoleById.user.fullNameTH}</Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontWeight="semibold">Code</Text>
                                        <Text>Demo</Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontWeight="semibold">Team</Text>
                                        <Text>Demo</Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontWeight="semibold">Area</Text>
                                        <Text>Demo</Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontWeight="semibold">Area Code</Text>
                                        <Text>Demo</Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontWeight="semibold">Date Start</Text>
                                        <Text>1/01/2022</Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text fontWeight="semibold">อายุงาน</Text>
                                        <Text>0 ปี 0 เดือน 0 วัน</Text>
                                    </Flex>
                                </Flex>

                                <SalesPercent />

                                <Flex flexDir="column" p="3" h="100%">
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
                                        //     lineNotifyToDevGroup();
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
                                                    Safety Line
                                                </Th>
                                                <Th
                                                    textAlign="center"
                                                    fontSize={["xs", "xs", "sm", "md"]}
                                                    color="white"
                                                >
                                                    KPI
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
                                                    <Td>
                                                        <Center>Demo</Center>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Flex>
                            </Flex>

                            <Flex flexDir="column" w="100%" rounded="7px" boxShadow="md">
                                <SalesChart
                                    colorBranch="#64c9e2"
                                    colorBranchPass="#1379ec"
                                    colorOnMouse="#0a7988"
                                    team={chooseYear}
                                    monthValue={monthValue}
                                />
                            </Flex>

                            <Flex mt="2" justify="space-between">
                                <Flex flexDir="column" w="33%" rounded="7px" boxShadow="md">
                                    <IssueChart label="สรุป Issue รายเดือน" monthValue={monthValue} />
                                </Flex>
                                <Flex flexDir="column" w="33%" rounded="7px" boxShadow="md">
                                    <IssueChart label="สรุป WIP รายเดือน" monthValue={monthValue} />
                                </Flex>
                                <Flex flexDir="column" w="33%" rounded="7px" boxShadow="md">
                                    <IssueChart label="สรุป Visit รายเดือน" monthValue={monthValue} />
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

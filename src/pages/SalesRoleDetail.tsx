import React, { useEffect, useState } from "react";
import {
    Flex, Text, Divider, Image, Table, Tbody, Th, Thead, Tr,
    Td, Center, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Select,
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

import { useMeQuery, useSalesRoleByIdQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/uselsAuth";
import Spinner from "../components/Spinner";
import {
    AlertNt, formatAmount, formatDateNew, formatGetMonth,
    formatGetYear, selectMonth, reducer, demoData,
} from "../utils/helpers";
import AlertNotification from "../components/dialogs/AlertNotification";

import SalesChart from "../components/sales-report/SalesChart";
import SalesPercent from "../components/sales-report/SalesPercent";
import IssueChart from "../components/sales-report/IssueChart";
import AddAndEditTarget from "../components/sales-report/AddAndEditTarget";
import { useDialog } from "../components/dialogs/useDialog";

interface Props { }

const userPrev = ["ปัจจุบัน", "ก่อนหน้า"];

const SalesRoleDetail: React.FC<Props> = () => {
    useIsAuth();

    const currentYear = new Date().getFullYear();
    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");
    const [loading, setLoading] = useState(false);

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

    const [monthVisit, setMonthVisit] = useState({
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
    const [chooseYear, setChooseYear] = useState(currentYear.toString());
    const [selectYear, setSelectYear] = useState([currentYear]);
    const [dateStart, setDateStart] = useState("");
    const [monthIndex, setMonthIndex] = useState(0);
    const [commission, setCommission] = useState(0);
    const [strategy, setStrategy] = useState(0);


    const history = useHistory();
    const params = useParams<{ id: string }>();

    const { isOpen, setIsOpen } = useDialog();

    const [{ data, fetching }] = useSalesRoleByIdQuery({
        variables: {
            id: +params.id,
            monthIndex,
            year: +chooseYear
        },
    });

    const [{ data: me }] = useMeQuery();

    const branch = data?.salesRoleById.branch;
    const colorBranch = branch === "ลาดกระบัง" ? "#64c9e2" : "#7be4ca";
    const colorBranchPass = branch === "ลาดกระบัง" ? "#1379ec" : "#0AB68B";
    const colorOnMouse = branch === "ลาดกระบัง" ? "#0a7988" : "#0d4e3e";

    const today = new Date();
    const getDateStart = new Date(dateStart);
    const differenceInTime = today.getTime() - getDateStart.getTime();
    const sumDateAll = differenceInTime / (1000 * 3600 * 24);
    const sumYear = sumDateAll / 365;
    const dateDifference = new Date(differenceInTime);
    const dayDiff = dateDifference.getUTCDate() - 1;
    const monthDiff = dateDifference.getUTCMonth();

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
        setLoading(true);
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

        if (data?.salesRoleById.targets) {
            const yearAll = data.salesRoleById.targets
                .map((val) => val.year)
            const commission = data.salesRoleById.targets
                .filter(item => item.year === +chooseYear)
                .map((val) => val.commission)
            const strategy = data.salesRoleById.targets
                .filter(item => item.year === +chooseYear)
                .map((val) => val.strategy)
            setCommission(commission[0])
            setStrategy(strategy[0])
            setSelectYear(yearAll);
            setDateStart(data.salesRoleById.startDate)
        }
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

            console.log('queryValue', queryValue)
            let result = 0;
            if (queryValue.length !== 0) {
                result = queryValue.reduce(reducer);
                console.log('result', result)
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
            setMonthVisit({
                มกราคม: januaryFilter.length,
                กุมภาพันธ์: februaryFilter.length,
                มีนาคม: marchFilter.length,
                เมษายน: aprilFilter.length,
                พฤษภาคม: mayFilter.length,
                มิถุนายน: juneFilter.length,
                กรกฎาคม: julyFilter.length,
                สิงหาคม: augustFilter.length,
                กันยายน: septemberFilter.length,
                ตุลาคม: octoberFilter.length,
                พฤศจิกายน: novemberFilter.length,
                ธันวาคม: decemberFilter.length,
            });

            setTimeout(() => {
                setLoading(false);
            }, 100);
        } else if (chooseMonth !== "เดือน" && issueFilterSum?.length !== 0) {
            const result = issueFilterSum?.reduce(reducer);
            if (result) {
                setItem(result);
            }
            setTimeout(() => {
                setLoading(false);
            }, 100);
        } else {
            setItem(0);
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    }, [data, chooseMonth, chooseYear]);

    console.log("ร่วม ค่า Issues ทั้งหมด", item)

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
                    <Select w="150px" mr="5" fontWeight="semibold" name="userPrev">
                        {userPrev.map((val, i) => (
                            <option key={i} value={val}>
                                {val}
                            </option>
                        ))}
                    </Select>
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
                        {selectYear.map((year, i) => {
                            return (
                                <option key={i} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </Select>
                </Flex>
            </Flex>

            <Divider mt={1} mb={2} orientation="horizontal" />

            <AlertNotification
                alertWarning={alertWarning}
                setAlertWarning={setAlertWarning}
                label="คุณไม่สามารถเข้าถึงข้อมูลนี้ได้!"
            />

            {fetching || loading ? (
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
                            <Flex
                                flexDir={["column", "column", "column", "column", "column", "row",]}
                                rounded="7px"
                                boxShadow="md"
                                p="5"
                                justify="center"
                                align="center"
                                mb="3"
                            >
                                <Flex w="100%" mb="3" justify="center">
                                <Flex
                                    mr="1"
                                    h="230px"
                                        w="360px"
                                        rounded="7px"
                                        justify="center"
                                    cursor="pointer"
                                    _hover={{ bg: '#eee'}}
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
                                        fontSize="xl"
                                        h="230px"
                                        w="410px"
                                        p="5"
                                        rounded="7px"
                                        boxShadow="md"
                                        color="white"
                                        bg={colorBranchPass}
                                        justify="center"
                                    >
                                        <Flex justify="space-between">
                                            <Text fontWeight="semibold">Name</Text>
                                            <Text>{data.salesRoleById.user.fullNameTH}</Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Text fontWeight="semibold">Code</Text>
                                            <Text>{data.salesRoleById.salesRole}</Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Text fontWeight="semibold">Team</Text>
                                            <Text>{data.salesRoleById.channel}</Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Text fontWeight="semibold">Area</Text>
                                            <Text>
                                                {data.salesRoleById.areaCode.includes("--ตัวอย่าง--")
                                                    ? "--ตัวอย่าง--"
                                                    : data.salesRoleById.areaCode.includes("--ตัวอย่าง--")
                                                        ? "--ตัวอย่าง--"
                                                        : "--ตัวอย่าง--"}
                                            </Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Text fontWeight="semibold">Area Code</Text>
                                            <Text>{data.salesRoleById.areaCode}</Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Text fontWeight="semibold">Date Start</Text>
                                            <Text>{dateStart}</Text>
                                        </Flex>
                                        <Flex justify="space-between">
                                            <Text fontWeight="semibold">อายุงาน</Text>
                                            {/* <Text>{data.salesRoleById.วันเริ่มตำแหน่ง หรือ อายุงาน}</Text> */}
                                            <Text>
                                                {sumYear >= 1 && sumYear.toString().split(".")[0] + " ปี"}{" "}
                                                {monthDiff >= 1 && monthDiff + " เดือน"} {dayDiff} วัน
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                <Flex w="100%" mb="3" justifyContent="center">
                                <SalesPercent colorBranch={colorBranch} />

                                    <Flex
                                        p="3"
                                        h="230px"
                                        w="410px"
                                        flexDir="column"
                                        rounded="7px"
                                        boxShadow="md"
                                    >
                                        <Flex justify="space-between" mb="1" px="2">
                                            <Text fontWeight="bold" fontSize="xl">
                                                Target
                                            </Text>
                                            
                                            {me?.me?.position.includes("GM") && (
                                                <Button
                                                    ml="5"
                                                    size="sm"
                                                    colorScheme={branch === "ลาดกระบัง" ? "blue" : "teal"}
                                                    color="white"
                                                    leftIcon={<AddIcon />}
                                                    onClick={() => setIsOpen(true)}
                                                >
                                                    เพิ่ม
                                                </Button>
                                            )}

                                            {isOpen && (
                                                <AddAndEditTarget
                                                    Open={true}
                                                    setOpen={() => setIsOpen(false)}
                                                    branch={branch}
                                                    roleId={params.id}
                                                />
                                            )}
                                        </Flex>
                                        <Table>
                                            <Thead>
                                                <Tr bg={colorBranchPass}>
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
                                                        commission
                                                    </Th>
                                                    <Th
                                                        textAlign="center"
                                                        fontSize={["xs", "xs", "sm", "md"]}
                                                        color="white"
                                                    >
                                                        strategy
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
                                                            <Center>{formatAmount(val.commission)}</Center>
                                                        </Td>
                                                        <Td>
                                                            <Center>{formatAmount(val.strategy)}</Center>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex flexDir="column" w="100%" rounded="7px" boxShadow="md">
                                <SalesChart
                                    colorBranch={colorBranch}
                                    colorBranchPass={colorBranchPass}
                                    colorOnMouse={colorOnMouse}
                                    title={chooseYear}
                                    commission={commission}
                                    strategy={strategy}
                                    monthValue={monthValue}
                                    setMonthIndex={setMonthIndex}
                                />
                            </Flex>

                            <Flex mt="2" justify="space-between">
                                <Flex flexDir="column" w="33%" rounded="7px" boxShadow="md">
                                    <IssueChart
                                        label="สรุป Issue รายเดือน"
                                        monthValue={monthValue}
                                        colorBranch={colorBranch}
                                    />
                                </Flex>
                                <Flex flexDir="column" w="33%" rounded="7px" boxShadow="md">
                                    <IssueChart
                                        label="สรุป WIP รายเดือน"
                                        monthValue={monthValue}
                                        colorBranch={colorBranch}
                                    />
                                </Flex>
                                <Flex flexDir="column" w="33%" rounded="7px" boxShadow="md">
                                    <IssueChart
                                        label="สรุป Visit รายเดือน"
                                        monthValue={monthVisit}
                                        colorBranch={colorBranch}
                                    />
                                </Flex>
                            </Flex>

                            <Flex p="3" mt="10" rounded="7px" boxShadow="md">
                                <Tabs variant="enclosed" w="100%">
                                    <TabList>
                                        <Tab fontWeight="bold">Issue</Tab>
                                        <Tab fontWeight="bold">การเข้าพบลูกค้า</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <Flex>
                                                <Text ml="6" fontWeight="bold" fontSize="xl">
                                                    {" "}
                                                    ประวัติการกรอก Issue ของทั้งหมด
                                                </Text>
                                            </Flex>
                                            <Table
                                                boxShadow="base"
                                                variant="simple"
                                                colorScheme="blackAlpha"
                                            >
                                                <Thead>
                                                    <Tr bg={colorBranchPass}>
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
                                                            Sale Name
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            Company
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            Detail
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            Status
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
                                                    {data.salesRoleById.issues.map((val, i) => (
                                                        <Tr
                                                            key={i}
                                                            cursor="pointer"
                                                            _hover={{ bg: '#eee'}}
                                                            onClick={() =>
                                                                history.push(`/sales-report/issue/${val.id}`)
                                                            }
                                                        >
                                                            <Td w="20%">
                                                                <Flex flexDir="column">
                                                                    <Center>{formatDateNew(+val.createdAt)}</Center>
                                                                </Flex>
                                                            </Td>
                                                            <Td w="15%">
                                                                <Center>{val.saleName}</Center>
                                                            </Td>
                                                            <Td w="15%">
                                                                <Center>{val.customer}</Center>
                                                            </Td>
                                                            <Td w="30%">{val.detail}</Td>
                                                            <Td w="5%" color="cyan.600">
                                                                {val.status}
                                                            </Td>
                                                            <Td w="15%">
                                                                <Center>{formatAmount(val.issueValue)}</Center>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </TabPanel>
                                        <TabPanel>
                                            <Flex>
                                                <Text ml="6" fontWeight="bold" fontSize="xl">
                                                    {" "}
                                                    ประวัติการเข้าพบลูกค้าทั้งหมด
                                                </Text>
                                            </Flex>
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
                                                variant="simple"
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
                                                            SALE NAME
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            COMPANY
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                        >
                                                            jobPurpose
                                                        </Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {data.salesRoleById.visits && data.salesRoleById.visits.map((val, i) => (
                                                        <Tr 
                                                        key={i} 
                                                        cursor="pointer"
                                                        _hover={{ bg: '#eee'}}
                                                        onClick={() =>
                                                            history.push(`/sales-report/visit/${val.id}`)
                                                        }>
                                                            <Td>
                                                                <Center>{val.visitDate}</Center>
                                                            </Td>
                                                            <Td>
                                                                <Center>{val.saleName}</Center>
                                                            </Td>
                                                            <Td>{val.customer}</Td>
                                                            <Td><Center>{val.jobPurpose}</Center></Td>
                                                            {/* <Td w="10%">
                                                                <Center>{formatAmount(val.actual)}</Center>
                                                            </Td> */}
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

import React, { useState, useEffect } from "react";
import { Flex, Image, Text, Button, Divider, Select } from "@chakra-ui/react";
import { EditIcon, SettingsIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

import {
    CatUserRole,
    catUserRole,
    AlertNt,
    selectMonth,
} from "../utils/helpers";
import { useMeQuery, useSalesRolesQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";
import SalesTarget from "../components/sales-report/SalesTarget";
import MainChart from "../components/sales-report/MainChart";
import SalesChart from "../components/sales-report/SalesChart";
import { useIsAuth } from "../utils/uselsAuth";
import AlertNotification from "../components/dialogs/AlertNotification";

import "../styles/card-sales.css";

interface Props { }

// FIXME:
type TgDemo = {
    id: number;
    year: number;
    branch: string;
    c1: number;
    c2: number;
    are: number;
    reg: number;
    pro: number;
};

const targetDemoLkb = [
    {
        id: 1,
        year: 2022,
        branch: "ลาดกระบัง",
        c1: 350_000_000,
        c2: 350_000_000,
        are: 350_000_000,
        reg: 350_000_000,
        pro: 350_000_000,
    },
    {
        id: 2,
        year: 2021,
        branch: "ลาดกระบัง",
        c1: 250_000_000,
        c2: 250_000_000,
        are: 250_000_000,
        reg: 250_000_000,
        pro: 250_000_000,
    },
];

// const salesRole = [
//     {
//         id: 1,
//         salesRole: "Sales01",
//         branch: "ลาดกระบัง",
//         channel: "cutting1",
//         status: "Active",
//         userId: 24,
//         targetId: 1,
//     },
//     {
//         id: 2,
//         salesRole: "Sales02",
//         branch: "ลาดกระบัง",
//         channel: "Area",
//         status: "Active",
//         userId: 25,
//         targetId: 1,
//     }
// ]

// const saveTarget = [
//     {
//         id:1,
//         value: 35000,
//         salesByUserId: 24,
//         createAt: "30/11/2021",
//         salesRoleId: 1
//     },
// ]

const SalesReport: React.FC<Props> = () => {
    useIsAuth();

    const [branch, setBranch] = useState<CatUserRole>("ลาดกระบัง");
    const [loading, setLoading] = useState(false);
    const [userIsSales, setUserIsSales] = useState(true);
    const [team, setTeam] = useState("All");

    const [colorBranch, setColorBranch] = useState("#64c9e2");
    const [colorBranchPass, setColorBranchPass] = useState("#1379ec");
    const [colorOnMouse, setColorOnMouse] = useState("#0a7988");

    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");

    const [chooseMonth, setChooseMonth] = useState("เดือน");
    const [chooseYear, setChooseYear] = useState("2022");
    const [targetYear, setTargetYear] = useState<TgDemo>(targetDemoLkb[0]);

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

    const [{ data: me }] = useMeQuery();

    const [{ data: salesRole, fetching }] = useSalesRolesQuery();

    const history = useHistory();

    const userHandle = (roleId: number, userId: number) => {
        if (me?.me?.position.includes("หัวหน้างาน")) {
            return history.push(`/sales-report/role-manage/${roleId}`);
        } else if (me?.me?.position.includes("GM")) {
            return history.push(`/sales-report/role-manage/${roleId}`);
        } else if (me?.me?.id === userId) {
            return history.push(`/sales-report/role-manage/${roleId}`);
        } else {
            return setAlertWarning("show");
        }
    };

    const userHandleBtn = () => {
        if (me?.me?.position.includes("GM")) {
            history.push("/sales-report/role-manage")
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

    useEffect(() => {
        setLoading(true);

        if (salesRole?.salesRoles && me?.me) {
            const response = salesRole.salesRoles.map(item => item.userId)
            const meId = me.me.id
            if (response.includes(meId)) {
                setUserIsSales(false)
            }
        }

        if (branch === "ชลบุรี") {
            setColorBranch("#7be4ca");
            setColorBranchPass("#0AB68B");
            setColorOnMouse("#0d4e3e");

            setTimeout(() => {
                setLoading(false);
            }, 500);
        } else {
            setColorBranch("#64c9e2");
            setColorBranchPass("#1379ec");
            setColorOnMouse("#0a7988");

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }

        if (chooseYear) {
            const response = targetDemoLkb.filter((val) => val.year === +chooseYear);
            setTargetYear(response[0]);
        }

        setMonthValue({
            มกราคม: 5000,
            กุมภาพันธ์: 3000,
            มีนาคม: 5000,
            เมษายน: 4000,
            พฤษภาคม: 4440,
            มิถุนายน: 6000,
            กรกฎาคม: 2500,
            สิงหาคม: 1000,
            กันยายน: 8000,
            ตุลาคม: 4000,
            พฤศจิกายน: 6000,
            ธันวาคม: 5000,
        });
    }, [branch, chooseYear, me, salesRole]);

    // console.log(chooseMonth, chooseYear);

    return (
        <Flex
            flexDir={["column", "column", "column", "column", "row"]}
            overflowY="auto"
            px="5"
            h="97vh"
        >
            <Flex w="100%" flexDir="column" mr="2">
                <Flex justify="space-between">
                    <Text
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        color="gray.600"
                    >
                        Sales Report
                    </Text>
                    <Flex mt="1">
                        {catUserRole.map((value, i) => (
                            <Button
                                key={i}
                                size="md"
                                colorScheme="teal"
                                variant={branch === value ? "outline" : "link"}
                                mr="3"
                                onClick={() => setBranch(value)}
                            >
                                {value}
                            </Button>
                        ))}
                    </Flex>
                </Flex>

                <Divider mt={1} mb={2} orientation="horizontal" />
                <AlertNotification
                    alertWarning={alertWarning}
                    setAlertWarning={setAlertWarning}
                    label="คุณไม่สามารถเข้าถึงข้อมูลนี้ได้!"
                />
                {(fetching || loading) ? (
                    <Flex h="225px" justify="center" align="center">
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
                ) : (
                        <Flex flexDir="column">
                            <Flex
                                borderRadius="8px"
                                w="100%"
                                h="250px"
                                overflowX="auto"
                                overflowY="hidden"
                                sx={{
                                    "&::-webkit-scrollbar": {
                                        width: "8px",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        width: "8px",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        width: "1em",
                                        backgroundColor: colorBranchPass,
                                        borderRadius: "24px",
                                    },
                                }}
                            >
                                {salesRole?.salesRoles &&
                                    salesRole.salesRoles
                                        .filter((val) => val.branch === branch)
                                        .filter((val) =>
                                            team === "All" ? val : val.channel === team
                                        )
                                        .map(
                                            (val) =>
                                                val.user.imageUrl && (
                                                    <div
                                                        className={`card ${branch === "ลาดกระบัง"
                                                            ? "bg-card-lkb"
                                                            : "bg-card-cdc"
                                                            }`}
                                                        key={val.id}
                                                        onClick={() => userHandle(val.id, val.userId)}
                                                    >
                                                        <p>{val.salesRole}</p>
                                                        <Image
                                                            objectFit="cover"
                                                            // src="https://bit.ly/sage-adebayo"
                                                            src={val.user.imageUrl}
                                                            alt={
                                                                val.user.fullNameTH
                                                                    ? val.user.fullNameTH
                                                                    : "User ไม่ได้ทำการใส่ข้อมูล"
                                                            }
                                                            borderRadius="lg"
                                                        />
                                                        <h4>{val.user.fullNameTH}</h4>
                                                    </div>
                                                )
                                        )}
                            </Flex>

                            <Flex mt="3">
                                <Flex
                                    flexDir="column"
                                    mr="5"
                                    w="80%"
                                    rounded="7px"
                                    boxShadow="md"
                                >
                                    <Flex justify="space-between">
                                        <Text
                                            ml="3"
                                            fontWeight="semibold"
                                            fontSize={["md", "md", "xl", "3xl"]}
                                            color={colorBranchPass}
                                        >
                                            {branch}
                                        </Text>

                                        <Flex>
                                            <Select
                                                w="150px"
                                                mr="5"
                                                mt="1"
                                                fontWeight="semibold"
                                                name="selectYear"
                                                onChange={(e) => onChangeYear(e)}
                                            >
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                            </Select>
                                            <Select
                                                w="150px"
                                                mr="5"
                                                mt="1"
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
                                        </Flex>
                                    </Flex>

                                    <Flex mt="-2">
                                        <SalesTarget
                                            colorBranch={colorBranch}
                                            colorBranchPass={colorBranchPass}
                                        />
                                        <MainChart
                                            setTeam={setTeam}
                                            colorBranch={colorBranch}
                                            colorBranchPass={colorBranchPass}
                                            targetYear={targetYear}
                                            chooseMonth={chooseMonth}
                                        />
                                    </Flex>
                                    <SalesChart
                                        colorBranch={colorBranch}
                                        colorBranchPass={colorBranchPass}
                                        colorOnMouse={colorOnMouse}
                                        team={team}
                                        monthValue={monthValue}
                                        setMonthIndex={() => undefined}
                                    />
                                </Flex>

                                <Flex flexDir="column" w="20%" rounded="7px" boxShadow="md">
                                    <Flex flexDir="column" justify="space-between" p="3" h="100%">
                                        <Flex flexDir="column">
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["md", "md", "xl", "3xl"]}
                                                color="gray.600"
                                            >
                                                Menu
                                            </Text>
                                            <Button
                                                mt="3"
                                                disabled={userIsSales}
                                                leftIcon={<EditIcon />}
                                                variant='outline'
                                                colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "teal"}
                                                onClick={() => history.push("/sales-report/issue-create")}
                                            >
                                                บันทึก Issue
                                            </Button>
                                            <Button
                                                mt="3"
                                                disabled={true}
                                                leftIcon={<EditIcon />}
                                                colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "teal"}
                                                variant='outline'
                                                onClick={() => history.push("/sales-report/actual-create")}
                                            >
                                                บันทึกยอดขาย
                                            </Button>
                                        </Flex>

                                        <Flex flexDir="column" mb="10">
                                            <Text
                                                disabled={false}
                                                fontWeight="semibold"
                                                fontSize={["md", "md", "xl", "3xl"]}
                                                color="gray.600"
                                            >
                                                Setting
                                            </Text>
                                            <Button
                                                mt="3"
                                                leftIcon={<SettingsIcon />}
                                                variant='outline'
                                                colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "teal"}
                                                onClick={() => userHandleBtn()}
                                            >
                                                Sales Role
                                            </Button>
                                            <Button
                                                mt="3"
                                                disabled={true}
                                                leftIcon={<SettingsIcon />}
                                                variant='outline'
                                                colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "teal"}
                                            >
                                                Sales Target
                                            </Button>
                                            <Button
                                                mt="3"
                                                disabled={true}
                                                leftIcon={<SettingsIcon />}
                                                variant='outline'
                                                colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "teal"}
                                            >
                                                Customer
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default SalesReport;

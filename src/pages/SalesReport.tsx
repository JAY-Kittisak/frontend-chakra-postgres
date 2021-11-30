import React, { useState, useEffect } from "react";
import {
    Flex,
    Image,
    Text,
    Button,
    Divider,
    SimpleGrid,
    Select
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { CatUserRole, catUserRole, AlertNt, selectMonth } from "../utils/helpers";
import { useMeQuery, useUsersQuery } from "../generated/graphql";
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
}

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
]

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
    const [team, setTeam] = useState("");

    const [colorBranch, setColorBranch] = useState("#64c9e2");
    const [colorBranchPass, setColorBranchPass] = useState("#1379ec");
    const [colorOnMouse, setColorOnMouse] = useState("#0a7988");

    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");

    const [chooseMonth, setChooseMonth] = useState("เดือนทั้งหมด")
    const [chooseYear, setChooseYear] = useState("2022")
    const [targetYear, setTargetYear] = useState<TgDemo>(targetDemoLkb[0])

    const [{ data, fetching }] = useUsersQuery();

    const [{ data: me }] = useMeQuery();

    const history = useHistory();

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

    useEffect(() => {
        if (branch === "ชลบุรี") {
            setColorBranch("#7be4ca");
            setColorBranchPass("#0AB68B");
            setColorOnMouse("#0d4e3e");
        } else {
            setColorBranch("#64c9e2");
            setColorBranchPass("#1379ec");
            setColorOnMouse("#0a7988");
        }

        if (chooseYear) {
            const response = targetDemoLkb.filter(val => val.year === +chooseYear)
            setTargetYear(response[0])
        }
    }, [branch, chooseYear]);

    console.log(chooseMonth, chooseYear)

    return (
        <Flex flexDir={["column", "column", "column", "column", "row"]}>
            <Flex
                w={["100%", "100%", "100%", "100%", "100%"]}
                flexDir="column"
                mr="2"
            >
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
                {fetching ? (
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
                        <>
                            <Flex
                                borderRadius="8px"
                                overflowY="hidden"
                                overflowX="auto"
                                justify="center"
                                sx={{
                                    "&::-webkit-scrollbar": {
                                        width: "8px",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        width: "8px",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        width: "1em",
                                        backgroundColor: `#666`,
                                        borderRadius: "24px",
                                    },
                                }}
                            >
                                {data?.users
                                    .filter((item) => item.departments === "Marketing")
                                    .map(
                                        (val, i) =>
                                            val.imageUrl && (
                                                <div
                                                    className={`card ${branch === "ลาดกระบัง" ? "bg-card-lkb" : "bg-card-cdc"
                                                        }`}
                                                    key={val.id}
                                                    onClick={() => userHandle(val.id)}
                                                >
                                                    <p>Sales{i}</p>
                                                    <Image
                                                        objectFit="cover"
                                                        src={val.imageUrl}
                                                        alt={val.username}
                                                        borderRadius="lg"
                                                    />
                                                    <h4>{val.fullNameTH}</h4>
                                                </div>
                                            )
                                    )}
                            </Flex>
                            <Flex mt="3">
                                <Flex
                                    flexDir="column"
                                    mr="5"
                                    w="80%"
                                    h="100%"
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
                                                <option value="2022">
                                                    2022
                                                </option>
                                                <option value="2021">
                                                    2021
                                                </option>
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
                                            colorBranch={colorBranch}
                                            colorBranchPass={colorBranchPass}
                                            setTeam={setTeam}
                                            targetYear={targetYear}
                                            chooseMonth={chooseMonth}
                                        />
                                    </Flex>
                                    <SalesChart
                                        colorBranch={colorBranch}
                                        colorBranchPass={colorBranchPass}
                                        colorOnMouse={colorOnMouse}
                                        team={team}
                                    />
                                </Flex>

                                <Flex flexDir="column" w="20%" rounded="7px" boxShadow="md">
                                    <Text
                                        ml="3"
                                        fontWeight="semibold"
                                        fontSize={["md", "md", "xl", "3xl"]}
                                        color="gray.600"
                                    >
                                        Boss
                                    </Text>
                                    <Flex>
                                        {data?.users
                                            .filter(
                                                (item) =>
                                                    item.position === "หัวหน้างาน" || item.position === "GM"
                                            )
                                            .map(
                                                (val) =>
                                                    val.imageUrl && (
                                                        <SimpleGrid
                                                            w="100%"
                                                            key={val.id}
                                                            column={3}
                                                            spacing="8px"
                                                            align="center"
                                                        >
                                                            <Image
                                                                ml="3"
                                                                boxSize="70px"
                                                                objectFit="cover"
                                                                src={val.imageUrl}
                                                                alt={val.username}
                                                                borderRadius="lg"
                                                            />
                                                            <Text fontSize="xs">{val.fullNameTH}</Text>
                                                        </SimpleGrid>
                                                    )
                                            )}
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text
                                            ml="3"
                                            fontWeight="semibold"
                                            fontSize={["md", "md", "xl", "3xl"]}
                                            color="gray.600"
                                        >
                                            Menu
                                        </Text>
                                        <div className="card-btn-sales">
                                            <div className="card-btn__img"></div>
                                        </div>
                                        <div className="card-btn-sales">
                                            <div className="card-btn__img"></div>
                                        </div>
                                        <div className="card-btn-sales">
                                            <div className="card-btn__img"></div>
                                        </div>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </>

                )}
            </Flex>
        </Flex>
    );
};

export default SalesReport;

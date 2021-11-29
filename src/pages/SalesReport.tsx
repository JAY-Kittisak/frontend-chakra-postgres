import React, { useState, useEffect } from "react";
import {
    Flex,
    Image,
    Text,
    Button,
    Divider,
    SimpleGrid,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { CatUserRole, catUserRole, AlertNt } from "../utils/helpers";
import { useMeQuery, useUsersQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";
import SalesTarget from "../components/sales-report/SalesTarget";
import MainChart from "../components/sales-report/MainChart";
import SalesChart from "../components/sales-report/SalesChart";
import { useIsAuth } from "../utils/uselsAuth";
import AlertNotification from "../components/dialogs/AlertNotification";

import "../styles/card-sales.css";

interface Props { }

const SalesReport: React.FC<Props> = () => {
    useIsAuth();

    const [branch, setBranch] = useState<CatUserRole>("ลาดกระบัง");
    const [team, setTeam] = useState("");

    const [colorBranch, setColorBranch] = useState("#64c9e2");
    const [colorBranchPass, setColorBranchPass] = useState("#1379ec");
    const [colorOnMouse, setColorOnMouse] = useState("#0a7988");

    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");

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
    }, [branch]);

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
                                    <Text
                                        ml="3"
                                        fontWeight="semibold"
                                        fontSize={["md", "md", "xl", "3xl"]}
                                        color={colorBranchPass}
                                    >
                                        {branch}
                                    </Text>
                                    <Flex mt="-2">
                                        <SalesTarget
                                            colorBranch={colorBranch}
                                            colorBranchPass={colorBranchPass}
                                        />
                                        <MainChart
                                            colorBranch={colorBranch}
                                            colorBranchPass={colorBranchPass}
                                            setTeam={setTeam}
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

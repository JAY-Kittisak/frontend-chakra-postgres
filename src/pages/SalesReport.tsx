import React, { useState, useEffect } from "react";
import { Flex, Image, Text, Button, Divider, SimpleGrid } from "@chakra-ui/react";

import { CatUserRole, catUserRole } from "../utils/helpers";
import { useUsersQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";
import SalesTarget from "../components/sales-report/SalesTarget";
import MainChart from "../components/sales-report/MainChart";
import SalesChart from "../components/sales-report/SalesChart";

import '../styles/card-sales.css'

interface Props { }

const SalesReport: React.FC<Props> = () => {
    const [branch, setBranch] = useState<CatUserRole>("ลาดกระบัง");
    const [team, setTeam] = useState("Cutting 1");

    const [colorBranch, setColorBranch] = useState("#2670c4");
    const [colorBranchPass, setColorBranchPass] = useState("#08bae6");

    const [{ data, fetching }] = useUsersQuery();

    useEffect(() => {
        if (branch === "ชลบุรี") {
            setColorBranch("#7be4ca");
            setColorBranchPass("#0AB68B");
        } else {
            setColorBranch("#2670c4");
            setColorBranchPass("#08bae6");
        }
    }, [branch])

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
                                variant={(branch === value) ? "outline" : "link"}
                                mr="3"
                                onClick={() => setBranch(value)}
                            >
                                {value}
                            </Button>
                        ))}
                    </Flex>
                </Flex>

                <Divider mt={1} mb={2} orientation="horizontal" />
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
                    <Flex
                        overflowY="hidden"
                        overflowX="auto"
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
                                        <div className={`card ${branch === "ลาดกระบัง" ? "bg-card-lkb" : "bg-card-cdc"}`} key={val.id}>
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
                )}
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
                            color="gray.600"
                        >
                            {branch}
                        </Text>
                        <Flex>
                            <MainChart
                                colorBranch={colorBranch}
                                colorBranchPass={colorBranchPass}
                                setTeam={setTeam}
                            />
                            <SalesTarget
                                colorBranch={colorBranch}
                                colorBranchPass={colorBranchPass}
                            />
                        </Flex>
                        <SalesChart
                            colorBranch={colorBranch}
                            colorBranchPass={colorBranchPass}
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
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default SalesReport;

import React, { useState, useEffect } from "react";
import { Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import { useJobITsQuery, RegularJobItFragment } from "../generated/graphql";
import AdminJobITItem from "../components/jobIT/AdminJobITItem";
import ViewStatus from "../components/jobIT/ViewStatus";
import ViewAdmin from "../components/jobIT/ViewAdmin";
import { Branch } from "../utils/helpers"

interface Props { }

const ManageJobIT: React.FC<Props> = () => {
    const [jobData, setJobData] = useState<RegularJobItFragment[] | undefined>(
        undefined
    );
    const [branch, setBranch] = useState<Branch>("All");

    const [reset, setReset] = useState(false);

    const [nameItAction, setNameItAction] = useState("");
    const [status, setStatus] = useState("New");
    const [dateBeginStrTo, setDateBeginStrTo] = useState("");
    const [dateEndStrTo, setDateEndStrTo] = useState("");

    const [graph, setGraph] = useState(false);

    const [{ data, fetching }] = useJobITsQuery({
        variables: {
            input: {
                nameItAction: nameItAction,
                status: status,
                dateBegin: dateBeginStrTo,
                dateEnd: dateEndStrTo,
            },
        },
    });
    const bg = useColorModeValue("white", "gray.700");
    const bgColumn = useColorModeValue("#028174", "#3E54D3");

    useEffect(() => {
        if (branch === "All" && data?.jobITs) {
            setJobData(data.jobITs);
        }
        if (branch === "ลาดกระบัง") {
            const dataTest = data?.jobITs?.filter((val) => val.branch === 0);
            setJobData(dataTest);
        }
        if (branch === "ชลบุรี") {
            const dataTest = data?.jobITs?.filter((val) => val.branch === 1);
            setJobData(dataTest);
        }
    }, [branch, data]);

    useEffect(() => {
        if (reset) {
            setNameItAction("");
            setStatus("");
            setDateBeginStrTo("");
            setDateEndStrTo("");
        }
        setReset(false);
    }, [reset]);

    const newStatus = jobData?.filter((value) => value.status === "New");
    const wait = jobData?.filter((value) => value.status === "Wait Approve");
    const success = jobData?.filter((value) => value.status === "Success");
    const impossible = jobData?.filter((value) => value.status === "Impossible");
    const arrayStatus = [
        newStatus?.length,
        wait?.length,
        success?.length,
        impossible?.length,
    ];

    const altas = jobData?.filter((value) => value.category === "altas");
    const hardware = jobData?.filter((value) => value.category === "hardware");
    const software = jobData?.filter((value) => value.category === "software");
    const network = jobData?.filter((value) => value.category === "network");
    const email = jobData?.filter((value) => value.category === "email");
    const ups = jobData?.filter((value) => value.category === "ups");
    const telephone = jobData?.filter((value) => value.category === "โทรศัพท์");
    const arrayCat = [
        altas?.length,
        hardware?.length,
        software?.length,
        network?.length,
        email?.length,
        ups?.length,
        telephone?.length,
    ];

    if (!data && fetching) {
    return (
        <Flex>
                <Flex flexDir="row" m="auto" h="90vh" align="center">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex flexDir={["column", "column", "column", "column", "row"]}>
            {!graph &&
                <Flex w={["100%", "100%", "100%", "100%", "75%"]} flexDir="column">
                <Flex justify="space-between">
                    <Text
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        color="gray.600"
                    >
                        Manage Job IT
                    </Text>

                    <Flex mt="3">
                        <Button
                            size="md"
                            colorScheme="teal"
                            variant={(branch === "All") ? "outline" : "link"}
                            mr="3"
                            onClick={() => setBranch("All")}
                        >
                            All
                        </Button>
                        <Button
                            size="md"
                            colorScheme="teal"
                            variant={(branch === "ลาดกระบัง") ? "outline" : "link"}
                            mr="3"
                            onClick={() => setBranch("ลาดกระบัง")}
                        >
                            ลาดกระบัง
                        </Button>
                        <Button
                            size="md"
                            colorScheme="teal"
                            variant={(branch === "ชลบุรี") ? "outline" : "link"}
                            onClick={() => setBranch("ชลบุรี")}
                        >
                            ชลบุรี
                        </Button>
                    </Flex>
                </Flex>

                <Flex
                    flexDir="column"
                    p={9}
                    rounded="7px"
                    boxShadow="md"
                    bg={bg}
                    minW="90vh"
                    maxH="90vh"
                    overflowY="auto"
                >
                    <Flex
                        bg={bgColumn}
                        rounded="7px"
                        color="white"
                        h="35px"
                        align="center"
                    >
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="18%"
                            textAlign="center"
                        >
                            วันที่สั่ง
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="15%"
                            textAlign="center"
                        >
                            เรื่องที่แจ้ง
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="15%"
                            textAlign="center"
                        >
                            IT ผู้ปฏิบัติงาน
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="20%"
                            textAlign="center"
                        >
                            วันที่ต้องการ
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="13%"
                            textAlign="center"
                        >
                            สาขา
                        </Text>
                        <Text
                            fontSize={["xs", "xs", "md", "xl"]}
                            fontWeight="bold"
                            w="15%"
                            textAlign="center"
                        >
                            สถานะ
                        </Text>
                    </Flex>

                    {fetching ? (
                        <Flex h="290px" flexDir="row" m="auto" align="center">
                                <Spinner color="grey" height={50} width={50} />
                            <Text fontWeight="bold" fontSize="2xl">
                                    &nbsp; Loading...
                                </Text>
                            </Flex>
                    ) : (
                            <Flex flexDir="column" overflowX="auto">
                                {jobData?.map((jobIT) => (
                                    <AdminJobITItem key={jobIT.id} jobIT={jobIT} />
                                ))}
                        </Flex>
                    )}
                </Flex>
            </Flex>
            }

            <Flex
                flexDir="column"
                w={["100%", "100%", "100%", "100%", graph ? "100%" : "25%"]}
            >
                <Flex justify="end" h="30px">
                    <Button
                        ml="5"
                        mb="2"
                        size="md"
                        colorScheme="teal"
                        variant="outline"
                        boxShadow="md"
                        disabled={
                            nameItAction === "" &&
                            status === "" &&
                            dateBeginStrTo === "" &&
                            dateEndStrTo === ""
                        }
                        isLoading={fetching}
                        onClick={() => setReset(true)}
                    >
                        All Data
                    </Button>
                    <Button
                        ml="5"
                        mb="2"
                        size="md"
                        colorScheme="teal"
                        variant="outline"
                        boxShadow="md"
                        onClick={() => setGraph(!graph)}
                    >
                        Graph
                    </Button>
                </Flex>
                <ViewStatus
                    setStatus={setStatus}
                    arrayStatus={arrayStatus}
                    arrayCat={arrayCat}
                    setDateBeginStrTo={setDateBeginStrTo}
                    setDateEndStrTo={setDateEndStrTo}
                    graph={graph}
                />
                {!graph &&
                <ViewAdmin setNameItAction={setNameItAction} />
                }
            </Flex>
        </Flex>
    );
};

export default ManageJobIT;

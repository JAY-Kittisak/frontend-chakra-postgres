import React, { useState, useEffect } from 'react'
import { Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import { useJobITsQuery, RegularJobItFragment } from "../generated/graphql"
import AdminJobITItem from '../components/jobIT/AdminJobITItem';
import ViewStatus from '../components/jobIT/ViewStatus';
import ViewAdmin from '../components/jobIT/ViewAdmin';

interface Props { }
type Branch = "All" | "ลาดกระบัง" | "ชลบุรี"

const ManageJobIT: React.FC<Props> = () => {
    const [jobData, setJobData] = useState<RegularJobItFragment[] | undefined>(undefined)
    const [branch, setBranch] = useState<Branch>("All")
    const [{ data, fetching }] = useJobITsQuery()
    const bg = useColorModeValue("white", "gray.700");
    const bgColumn = useColorModeValue("#028174", "#3E54D3");

    // if (data?.jobITs) {
    //     const dataTest = data.jobITs.filter(val => val.branch === 1)
    //     console.log(dataTest)
    // }

    useEffect(() => {
        if (branch === "All" && data?.jobITs) {
            setJobData(data.jobITs)
        }
        if (branch === "ลาดกระบัง") {
            const dataTest = data?.jobITs?.filter(val => val.branch === 0)
            setJobData(dataTest)
        }
        if (branch === "ชลบุรี") {
            const dataTest = data?.jobITs?.filter(val => val.branch === 1)
            setJobData(dataTest)
        }
    }, [branch, data])

    return (
        <Flex>
            <Flex w="80%" flexDir="column">
                <Flex justify="space-between">
                    <Text
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        bgGradient="linear(to-l, #7928CA,#FF0080)"
                        bgClip="text"
                    >
                        Manage Job IT
                    </Text>

                    <Flex mt="3">
                        <Button size="lg" colorScheme="teal" variant="link" mr="3" onClick={() => setBranch("All")}>
                            All
                        </Button>
                        <Button size="lg" colorScheme="teal" variant="link" mr="3" onClick={() => setBranch("ลาดกระบัง")}>
                            ลาดกระบัง
                        </Button>
                        <Button size="lg" colorScheme="teal" variant="link" onClick={() => setBranch("ชลบุรี")}>
                            ชลบุรี
                        </Button>
                    </Flex>
                </Flex>

            <Flex flexDir="column" p={9} rounded="7px" boxShadow="md" bg={bg}>
                <Flex flexDir="column" overflowX="auto">
                    <Flex
                        // justify="space-around"
                        bg={bgColumn}
                        rounded="7px"
                        color="white"
                        h="35px"
                        align="center"
                    >
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="16%" textAlign="center">
                            วันที่สั่ง
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="18%" textAlign="center">
                            เรื่องที่แจ้ง
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="15%" textAlign="center">
                            IT ผู้ปฏิบัติงาน
                        </Text>
                            <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="15%" textAlign="center">
                            วันที่ต้องการ
                        </Text>
                            <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="20%" textAlign="center">
                                สาขา
                            </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="12%" textAlign="center">
                            สถานะ
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="18%" textAlign="center">
                            Manage order
                        </Text>
                    </Flex>

                    <Flex flexDir="column">
                            {fetching || !jobData ? (
                            <Flex justify="center" mt="5">
                                <Spinner color="grey" height={50} width={50} />
                                <Text fontWeight="bold" fontSize="2xl">
                                    &nbsp; Loading...
                                </Text>
                            </Flex>
                        ) : (
                                    jobData.map((jobIT) => (
                                <AdminJobITItem key={jobIT.id} jobIT={jobIT} />
                            ))
                        )}
                    </Flex>
                </Flex>
            </Flex>
            </Flex>

            <Flex flexDir="column" rounded="7px" mt="9">
                <ViewStatus />
                <ViewAdmin />
            </Flex>
        </Flex>
    )
}

export default ManageJobIT
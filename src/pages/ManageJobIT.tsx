import React from 'react'
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import { useJobITsQuery } from "../generated/graphql"
import AdminJobITItem from '../components/jobIT/AdminJobITItem';

interface Props { }

const ManageJobIT: React.FC<Props> = () => {
    const [{ data, fetching }] = useJobITsQuery()
    const bg = useColorModeValue("white", "gray.700");
    const bgColumn = useColorModeValue("#028174", "#3E54D3");
    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
            >
                Manage Job IT
            </Text>

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
                            ผู้เบิก
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="15%" textAlign="center">
                            จำนวนร้องขอ
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="21%" textAlign="center">
                            ราคารวม
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="12%" textAlign="center">
                            สถานะ
                        </Text>
                        <Text fontSize={["xs", "xs", "md", "xl"]} fontWeight="bold" w="18%" textAlign="center">
                            Manage order
                        </Text>
                    </Flex>

                    <Flex flexDir="column">
                        {fetching || !data?.jobITs ? (
                            <Flex justify="center" mt="5">
                                <Spinner color="grey" height={50} width={50} />
                                <Text fontWeight="bold" fontSize="2xl">
                                    &nbsp; Loading...
                                </Text>
                            </Flex>
                        ) : (
                            data.jobITs.map((jobIT) => (
                                <AdminJobITItem key={jobIT.id} jobIT={jobIT} />
                            ))
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default ManageJobIT
import React from 'react'
import { Flex, Table, Tbody, Text, Th, Thead, Tr, useColorMode, Button } from "@chakra-ui/react";

import Spinner from '../components/Spinner'
import AdminGiveItem from '../components/gives/AdminGiveItem'
import { useGivesQuery } from '../generated/graphql'

interface Props { }

const ManageGives: React.FC<Props> = () => {
    const [{ data, fetching }] = useGivesQuery()

    const { colorMode } = useColorMode();

    if (fetching) return <Spinner color="grey" height={50} width={50} />

    return (
        <Flex flexDir="column">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                my={2}
            >
                Admin Manage
            </Text>
            <Flex align="center">
                <Button
                    colorScheme={colorMode === "light" ? "green" : "blue"}
                    boxShadow="sm"
                    _hover={{ boxShadow: "md" }}
                    _active={{ boxShadow: "lg" }}
                >
                    <Text color="white">รายละเอียด</Text>
                </Button>
            </Flex>

            {/* // <Text key={order.id}>{order.give.giveName}</Text> */}
            <Flex w="100%" overflowX="auto" rounded="7px" boxShadow="xl" >
                <Table variant="striped" colorScheme={colorMode === "light" ? "green" : "blue"}>
                    <Thead>
                        <Tr bg={colorMode === "light" ? "#028174" : "#3E54D3"}>
                            <Th textAlign="center" fontSize="md" color="white">Image</Th>
                            <Th textAlign="center" fontSize="md" color="white">ชื่อของแจก</Th>
                            <Th textAlign="center" fontSize="md" color="white">รายละเอียด</Th>
                            <Th textAlign="center" fontSize="md" color="white">ราคาต่อหน่วย</Th>
                            <Th textAlign="center" fontSize="md" color="white">จำนวนใน Stock</Th>
                            <Th textAlign="center" fontSize="md" color="white">ประเภท</Th>
                            <Th textAlign="center" fontSize="md" color="white">วันที่ Update</Th>
                            <Th textAlign="center" fontSize="md" color="white">Manage</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.gives &&
                            data.gives.map((give) => (
                                <AdminGiveItem key={give.id} give={give} />
                            ))
                        }
                        {/* {!industrialEstate ? (
                            <div>Loading...</div>
                        ) : (
                            industrialEstate.map((factory) => (
                                <FactoryItem key={factory.id} factory={factory} />
                            ))
                        )} */}
                    </Tbody>
                </Table>
            </Flex>
        </Flex>
    )
}

export default ManageGives
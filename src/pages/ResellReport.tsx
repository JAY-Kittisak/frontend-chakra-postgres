import React, { useState } from 'react'
import {
    Flex,
    Table,
    Text,
    Tbody,
    Th,
    Thead,
    Tr,
    Center,
    Input,
    InputLeftElement,
    InputGroup,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { useIsResellAuth } from '../utils/useIsResellAuth'
import { useResellsQuery } from '../generated/graphql';
import ResellItem from '../components/resell/ResellItem';
import Spinner from '../components/Spinner';

interface Props { }

const ResellReport: React.FC<Props> = () => {
    useIsResellAuth()

    const [searchName, setSearchName] = useState("")

    const [{ data, fetching }] = useResellsQuery()

    return (
        <Flex flexDir="column" h="90vh">
            <Flex justify="space-between">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    Report
                </Text>
                <Flex>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="gray.600" />}
                        />
                        <Input
                            w="200px"
                            errorBorderColor="crimson"
                            type="text"
                            placeholder="ชื่อบริษัท..."
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </InputGroup>
                </Flex>
            </Flex>
            {(fetching) ? (
                <Center>
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
                </Center>
            ) : (
                <Flex mt="2" overflowX="auto" rounded="5px" boxShadow="md">
                    <Table boxShadow="base" variant="simple" colorScheme="blackAlpha">
                            <Thead>
                                <Tr bg="#028174">
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        Make/Category
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        Product
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
                                        บริษัทที่สั่งซื้อ
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        ขายต่อให้กับ
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.resells?.filter((val) => {
                                    if (searchName === "") {
                                        return val
                                    } else if (
                                        val.orderCustomer.customerName
                                            .toLowerCase()
                                            .includes(searchName.toLowerCase())
                                    ) {
                                        return val
                                    }
                                    return false;
                                }).map((resell) => (
                                    <ResellItem key={resell.id} resell={resell} />
                                ))}
                            </Tbody>
                        </Table>
                </Flex>
            )}
        </Flex>
    )
}

export default ResellReport
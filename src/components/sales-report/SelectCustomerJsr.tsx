import React, { useState } from 'react'
import {
    Text,
    Flex,
    Center,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Td,
    Spinner,
    Input,
    InputLeftElement,
    InputGroup,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useCustomerJsrQuery } from '../../generated/graphql';

interface Props {
    setCustomerID: React.Dispatch<React.SetStateAction<number | undefined>>;
    setCustomerData: React.Dispatch<
        React.SetStateAction<
            | {
                code: string;
                name: string;
            }
            | undefined
        >
    >;
    orderCustomerId: number | undefined;
    addedId: number[] | undefined;
}

const SelectCustomerJsr: React.FC<Props> = ({
    setCustomerID,
    setCustomerData,
    orderCustomerId,
    addedId
}) => {
    const [searchCat, setSearchCat] = useState("")
    const [checkId, setCheckId] = useState(0);

    const [{ data, fetching }] = useCustomerJsrQuery()

    const handleSubmit = (id: number, code: string, name: string) => {
        setCheckId(id);
        setCustomerID(id);
        setCustomerData({ code, name });
    };

    return (
        <Flex
            flexDir="column"
            w="40%"
            h="80vh"
            p="6"
            mt="8"
            ml="3"
            boxShadow="xl"
            borderRadius="md"
        >
            <Flex justify="center">
                <Text fontSize="2xl" fontWeight="bold">
                    เลือกบริษัท
                </Text>
            </Flex>

            <Flex justify="space-between" mt="5">
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.600" />}
                    />
                    <Input
                        w="200px"
                        errorBorderColor="crimson"
                        type="text"
                        placeholder="โค้ด หรือ ชื่อบริษัท"
                        onChange={(e) => setSearchCat(e.target.value)}
                    />
                </InputGroup>
            </Flex>

            {fetching ? (
                <Flex justify="center" mt="60px">
                    <Spinner color="grey" height={30} width={30} />
                    <Text fontWeight="bold" fontSize="xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            ) : (
                <Flex mt="5" overflowX="auto" rounded="5px" boxShadow="md">
                    <Table boxShadow="base" variant="striped" colorScheme="blackAlpha">
                        <Thead>
                            <Tr bg="#028174">
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Customer Code
                                </Th>
                                <Th
                                    textAlign="center"
                                    fontSize={["xs", "xs", "sm", "md"]}
                                    color="white"
                                >
                                    Customer Name
                                </Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {data?.customerJsr
                                ?.filter((val) => {
                                    if (searchCat === "") {
                                        return val;
                                    } else if (
                                        val.customerName
                                            .toLowerCase()
                                            .includes(searchCat.toLowerCase()) ||
                                        val.customerCode
                                            .toLowerCase()
                                            .includes(searchCat.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                    return false;
                                })
                                .map((val, i) => (
                                    <Tr
                                        key={i}
                                        cursor={
                                            val.id === orderCustomerId || addedId?.includes(val.id)
                                                ? "not-allowed"
                                                : "pointer"
                                        }
                                        onClick={() => {
                                            handleSubmit(val.id, val.customerCode, val.customerName);
                                        }}
                                    >
                                        <Td w="40%">
                                            <Flex>
                                                {val.id === orderCustomerId ? (
                                                    <Flex color="red">
                                                        <i className="bi bi-x-square"></i>
                                                    </Flex>
                                                ) : checkId === val.id || addedId?.includes(val.id) ? (
                                                    <Flex>
                                                        <i className="bi bi-check-square"></i>
                                                    </Flex>
                                                ) : (
                                                    <Flex>
                                                        <i className="bi bi-square"></i>
                                                    </Flex>
                                                )}
                                                <Center ml="10">{val.customerCode}</Center>
                                            </Flex>
                                        </Td>
                                        <Td w="60%">{val.customerName}</Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </Flex>
            )}
        </Flex>
    )
}

export default SelectCustomerJsr
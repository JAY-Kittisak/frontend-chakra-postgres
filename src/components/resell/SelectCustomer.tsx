import React, { useState } from "react";
import {
    Text,
    Flex,
    Button,
    Center,
    Input,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Td,
    InputLeftElement,
    InputGroup,
} from "@chakra-ui/react";
import { Search2Icon, AddIcon } from "@chakra-ui/icons";

import Spinner from "../Spinner";
import { useDialog } from "../dialogs/useDialog";
import AddCustomer from "./AddCustomer";
import { useCustomersQuery } from "../../generated/graphql";

interface Props { }

const SelectCustomer: React.FC<Props> = () => {
    const [searchCat, setSearchCat] = useState("");

    const { isOpen, setIsOpen } = useDialog();

    const [{ data, fetching }] = useCustomersQuery()

    return (
        <Flex
            flexDir="column"
            w="40%"
            h="80vh"
            p="6"
            mt="8"
            ml="3"
            bg="white"
            boxShadow="xl"
            borderRadius="md"
        >
            <Flex justify="center">
                <Text fontSize="2xl" fontWeight="bold">
                    Select Customer
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
                        placeholder="Search"
                        onChange={(e) => setSearchCat(e.target.value)}
                    />
                </InputGroup>
                <Button
                    ml="5"
                    colorScheme="green"
                    rightIcon={<AddIcon />}
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    Add
                </Button>
                {isOpen && (
                    <AddCustomer open={true} setOpen={() => setIsOpen(false)} />
                )}
            </Flex>

            {fetching ? (
                <Flex justify="center" mt="60px" >
                    <Spinner color="grey" height={30} width={30} />
                    <Text fontWeight="bold" fontSize="xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            ) : (
            <Flex mt="5" overflowX="auto" rounded="5px" boxShadow="md">
                <Table
                    boxShadow="base"
                    variant="striped"
                    colorScheme="blackAlpha"
                >
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
                                {data?.customers?.filter((val) => {
                                if (searchCat === "") {
                                    return val;
                                } else if (
                                    val.customerCode
                                        .toLowerCase()
                                        .includes(searchCat.toLowerCase())
                                ) {
                                    return val;
                                }
                                return false;
                            }).map((val, i) => (
                                <Tr key={i} cursor="pointer" onClick={() => alert("รายละเอียด : " + val.customerName)}>
                                    <Td w="40%">
                                        <Center>{val.customerCode}</Center>
                                    </Td>
                                    <Td w="60%">
                                        {val.customerName}
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </Flex>
            )}
        </Flex>
    );
};

export default SelectCustomer;

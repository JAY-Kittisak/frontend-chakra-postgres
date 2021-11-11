import React, { useState } from "react";
import {
    Text,
    Flex,
    Button,
    Center,
    Input,
    Icon,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Td,
} from "@chakra-ui/react";
import { Search2Icon, AddIcon } from "@chakra-ui/icons";

import Spinner from "../Spinner";
import { useDialog } from "../dialogs/useDialog";
import AddCustomer from "./AddCustomer";

interface Props { }

const dateDemo = [
    {
        customerCode: "ร03-ส064",
        customerName: "บริษัท สยามสมาร์ทโซลูชั่น จำกัด"
    },
    {
        customerCode: "ค13-ว111",
        customerName: "บริษัท วีพงศ์ ซัพพลาย จำกัด"
    },
    {
        customerCode: "ร06-ส547",
        customerName: "บริษัท สยามคาสติ้งโพรดักซ์  จำกัด"
    },
    {
        customerCode: "ค06-ช022",
        customerName: "บริษัท ชบาโฮลดิ้ง จำกัด"
    },
    {
        customerCode: "ค02-ด006",
        customerName: "บริษัท ดีบี เทรด แอนด์ คอนซัลท์ จำกัด"
    },
]
const SelectCustomer: React.FC<Props> = () => {
    const [searchCat, setSearchCat] = useState("");

    const { isOpen, setIsOpen } = useDialog();

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
            {false && (
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={30} width={30} />
                    <Text fontWeight="bold" fontSize="xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            )}

            <Flex justify="space-between" mt="5">
                <Flex>
                    <Flex p="3">
                        <Icon as={Search2Icon} />
                    </Flex>
                    <Input
                        w="150px"
                        className="searchInput"
                        type="text"
                        placeholder="Search..."
                        onChange={(event) => {
                            setSearchCat(event.target.value);
                        }}
                    />
                </Flex>
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
                        {dateDemo
                            .filter((val) => {
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
                                <Tr key={i}>
                                    <Td w="40%">
                                        <Center>{val.customerCode}</Center>
                                    </Td>
                                    <Td w="60%">
                                        <Center>{val.customerName}</Center>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </Flex>
        </Flex>
    );
};

export default SelectCustomer;

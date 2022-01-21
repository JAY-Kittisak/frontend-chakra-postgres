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
import {
    useCustomersQuery,
    useJoinResellMutation,
} from "../../generated/graphql";
import { AlertNt } from "../../utils/helpers";

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
    setAlertWarning: (action: AlertNt) => void | undefined
    setAlertSuccess: (action: AlertNt) => void | undefined
    orderCustomerId: number | undefined;
    resellId: number | undefined;
    addedId: number[] | undefined;
}

const SelectCustomer: React.FC<Props> = ({
    setCustomerID,
    setCustomerData,
    setAlertWarning,
    setAlertSuccess,
    orderCustomerId,
    resellId,
    addedId,
}) => {
    const [searchCat, setSearchCat] = useState("");
    const [checkId, setCheckId] = useState(0);

    const { isOpen, setIsOpen } = useDialog();

    const [{ data, fetching }] = useCustomersQuery();

    const handleSubmit = (id: number, code: string, name: string) => {
        setCheckId(id);
        setCustomerID(id);
        setCustomerData({ code, name });
    };

    const [, joinResell] = useJoinResellMutation();

    const joinData = async (resellId: number, customerId: number) => {
        if (orderCustomerId === customerId) {
            return setAlertWarning("show")

        }
        const response = await joinResell({ input: { resellId, customerId } });
        if (response.error) {
            return setAlertWarning("show")

        } else if (response.data?.joinResell) {
            return setAlertSuccess("show")
        }
    };

    return (
        <Flex
            flexDir="column"
            w="50%"
            h="80vh"
            px="6"
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
                <Button
                    ml="5"
                    colorScheme="green"
                    leftIcon={<AddIcon />}
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    เพิ่ม
                </Button>
                {isOpen && <AddCustomer open={true} setOpen={() => setIsOpen(false)} />}
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
                                {data?.customers
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
                                                if (resellId) {
                                                    joinData(resellId, val.id);
                                                }
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
    );
};

export default SelectCustomer;

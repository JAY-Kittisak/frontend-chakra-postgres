import React, { useState } from 'react'
import {
    Flex, Text, Divider, Avatar, Table,
    Tbody, Th, Thead, Tr, Td, Center, Button
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

import { useIsAuth } from '../utils/uselsAuth';
import { useSalesRolesQuery } from '../generated/graphql';
import Spinner from '../components/Spinner';
import { useDialog } from "../components/dialogs/useDialog";
import { CatUserRole, catUserRole, formatAmount } from '../utils/helpers';
import AddAndEditRole from '../components/sales-report/AddAndEditRole';

interface Props { }

const SalesRoleManage: React.FC<Props> = () => {
    useIsAuth();

    const [branch, setBranch] = useState<CatUserRole>("ลาดกระบัง");

    const { isOpen, setIsOpen } = useDialog();
    const history = useHistory()
    const [{ data, fetching }] = useSalesRolesQuery()

    return (
        <Flex flexDir="column" px="5">
            {/* <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                Sales Role Manage
            </Text> */}
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
                            variant={branch === value ? "outline" : "link"}
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
            ) : !data?.salesRoles ? (
                <Flex justify="center">
                    <Text
                        color="orange.600"
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        my={2}
                    >
                        แจ้งเตือน: คุณไม่สามารถเข้าถึงข้อมูลนี้ได้
                    </Text>
                </Flex>
            ) : (
                <>
                    <Flex
                        mx="2"
                        p="5"
                        rounded="7px"
                        boxShadow="md"
                    >
                                <Flex flexDir="column" align="center" w="100%">
                                    <Button
                                        w="20%"
                                        mb="5"
                                        leftIcon={<AddIcon />}
                                        colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "whatsapp"}
                                        onClick={() => {
                                            // setStockToEdit(null);
                                            setIsOpen(true);
                                        }}
                                    >
                                        Add Sales Role
                                    </Button>
                                    {isOpen && (
                                        <AddAndEditRole
                                            Open={true}
                                            setOpen={() => setIsOpen(false)}
                                        // stockToEdit={stockToEdit}
                                        />
                                    )}
                                    <Flex flexDir="column" w="100%" h="80vh" overflowX="auto">
                                <Table boxShadow="base" variant="striped" colorScheme="blackAlpha">
                                    <Thead>
                                                <Tr bg={branch === "ลาดกระบัง" ? "#1379ec" : "#0AB68B"}>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                image
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                        User Id
                                                    </Th>
                                                    <Th
                                                        textAlign="center"
                                                        fontSize={["xs", "xs", "sm", "md"]}
                                                        color="white"
                                                    >
                                                user
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                role
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                channel
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                        status
                                                    </Th>
                                                    <Th
                                                        textAlign="center"
                                                        fontSize={["xs", "xs", "sm", "md"]}
                                                        color="white"
                                                    >
                                                        Area Code
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                                {data.salesRoles.filter(item => item.branch === branch).map((val, i) => (
                                            <Tr
                                                key={i}
                                                cursor="pointer"
                                                _hover={{ color: 'tomato' }}
                                                onClick={() => history.push(`/sales-report/role-manage/${val.id}`)}
                                            >
                                                <Td w="5%">
                                                    {(val.user.fullNameTH && val.user.imageUrl) ? (
                                                        <Center>
                                                            <Avatar name={val.user.fullNameTH} src={val.user.imageUrl} />
                                                        </Center>
                                                    ) : (
                                                        <Text>ไม่มีข้อมูล</Text>
                                                    )}
                                                </Td>
                                                <Td w="10%">
                                                            <Center>{formatAmount(val.userId)}</Center>
                                                        </Td>
                                                        <Td w="20%">
                                                    {val.user.fullNameTH}
                                                </Td>
                                                <Td w="20%">
                                                    <Center>{val.salesRole}</Center>
                                                </Td>
                                                        <Td w="20%">
                                                    <Center>{val.channel}</Center>
                                                </Td>
                                                <Td w="10%">
                                                            <Center>{val.status}</Center>
                                                        </Td>
                                                        <Td w="20%">
                                                            <Center>{val.areaCode}</Center>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Flex>
                        </Flex>
                    </Flex>
                </>
            )}
        </Flex>
    )
}

export default SalesRoleManage
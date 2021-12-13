import React, { useState } from 'react'
import {
    Flex, Text, Divider, Image, Table,
    Tbody, Th, Thead, Tr, Td, Center, Button
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { useMeQuery, useSalesRoleByIdQuery } from '../generated/graphql';
import { useIsAuth } from '../utils/uselsAuth';
import Spinner from '../components/Spinner';
import { AlertNt, formatAmount, formatDate } from '../utils/helpers';
import AlertNotification from '../components/dialogs/AlertNotification';

interface Props { }

const SalesRoleDetail: React.FC<Props> = () => {
    useIsAuth();

    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");

    const history = useHistory();
    const params = useParams<{ id: string }>();

    const [{ data, fetching }] = useSalesRoleByIdQuery({
        variables: {
            id: +params.id,
        },
    })

    const [{ data: me }] = useMeQuery();

    const userHandle = (userId: number) => {
        if (me?.me?.position.includes("หัวหน้างาน")) {
            return history.push(`/user-id/${userId}`);
        } else if (me?.me?.position.includes("GM")) {
            return history.push(`/user-id/${userId}`);
        } else if (me?.me?.id === userId) {
            return history.push(`/user-id/${userId}`);
        } else {
            return setAlertWarning("show");
        }
    };

    const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue;
    const actualSum = data?.salesRoleById.salesActual.map(val => val.actual)

    return (
        <Flex flexDir="column">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                {data?.salesRoleById.salesRole}
            </Text>
            <Divider mt={1} mb={2} orientation="horizontal" />
            <AlertNotification
                alertWarning={alertWarning}
                setAlertWarning={setAlertWarning}
                label="คุณไม่สามารถเข้าถึงข้อมูลนี้ได้!"
            />
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
            ) : !data?.salesRoleById ? (
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
                    <Flex justify="space-between">
                        <Flex
                            flexDir="column"
                                    ml="2"
                                    mb="5"
                            p="5"
                            rounded="7px"
                            boxShadow="md"
                            align="center"
                        >
                            <Text ml="6" fontWeight="bold" fontSize="xl">Target ของแต่ละปี</Text>

                            <Table boxShadow="base" variant="striped" colorScheme="blackAlpha">
                                <Thead>
                                    <Tr bg="#1379ec">
                                        <Th
                                            textAlign="center"
                                            fontSize={["xs", "xs", "sm", "md"]}
                                            color="white"
                                        >
                                            ยอดขายประจำปี
                                        </Th>
                                        <Th
                                            textAlign="center"
                                            fontSize={["xs", "xs", "sm", "md"]}
                                            color="white"
                                        >
                                            Value
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            <Center>
                                                2021
                                            </Center>
                                        </Td>
                                        <Td>
                                            <Center>
                                                {formatAmount(30_000_000)}
                                            </Center>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>
                                            <Center>
                                                2022
                                            </Center>
                                        </Td>
                                        <Td>
                                            <Center>
                                                {formatAmount(40_000_000)}
                                            </Center>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                            <Button mt="7" colorScheme='teal' variant='outline' w="50%">
                                Button
                            </Button>
                        </Flex>
                        <Flex flexDir="column" cursor="pointer" onClick={() => userHandle(data?.salesRoleById.user.id)}>
                            <Text fontWeight="bold" fontSize="xl">User ปัจจุบัน</Text>
                            <Text ml="6" fontSize="xl">{data?.salesRoleById.user.fullNameTH}</Text>
                            <Text ml="6" fontSize="xl">{data?.salesRoleById.branch}</Text>
                            {data?.salesRoleById.user.imageUrl && (
                                <Image boxSize='200px' src={data.salesRoleById.user.imageUrl} alt='Dan Abramov' />
                            )}
                        </Flex>
                    </Flex>
                    <Flex
                        mx="2"
                        p="5"
                        h="500px"
                        rounded="7px"
                        boxShadow="md"
                    >
                        <Flex justify="space-between" w="100%">
                            <Flex flexDir="column" w="100%">
                                {(actualSum?.length === 0 || !actualSum) ? (
                                    <Text ml="6" fontWeight="bold" fontSize="xl">ยังไม่มีข้อมูล</Text>
                                ) : (
                                    <Flex>
                                                    <Text ml="6" fontWeight="bold" fontSize="xl"> ประวัติการกรอก Issue ของทั้งหมด</Text>
                                        <Text ml="2" fontWeight="bold" fontSize="xl" color="blue.500">{formatAmount(actualSum.reduce(reducer))}</Text>
                                    </Flex>
                                )}

                                <Table boxShadow="base" variant="striped" colorScheme="blackAlpha">
                                    <Thead>
                                        <Tr bg="#1379ec">
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                        วันที่ไปพบลูกค้า
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
                                                สินค้าที่ขาย
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
                                                ราคา
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                ขายให้กับบริษัท
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data.salesRoleById.salesActual.map((val, i) => (
                                            <Tr key={i} >
                                                <Td w="10%">
                                                    <Center>{formatDate(+val.createdAt)}</Center>
                                                </Td>
                                                <Td w="10%">
                                                    <Center>{val.user.fullNameTH}</Center>
                                                </Td>
                                                <Td w="20%">
                                                    {val.title}
                                                </Td>
                                                <Td w="30%">
                                                    {val.detail}
                                                </Td>
                                                <Td w="10%">
                                                    <Center>{formatAmount(val.actual)}</Center>
                                                </Td>
                                                <Td w="20%">
                                                    {val.customer.customerName}
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

export default SalesRoleDetail
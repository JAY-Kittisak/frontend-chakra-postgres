import React, { useState } from "react";
import {
    Flex,
    Text,
    Divider,
    Image,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Td,
    Center,
    Button,
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

import { useMeQuery, useSalesRoleByIdQuery } from "../generated/graphql";
import { useIsAuth } from "../utils/uselsAuth";
import Spinner from "../components/Spinner";
import { AlertNt, formatAmount, formatDate } from "../utils/helpers";
import AlertNotification from "../components/dialogs/AlertNotification";

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
    });

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

    const reducer = (previousValue: number, currentValue: number) =>
        previousValue + currentValue;
    const actualSum = data?.salesRoleById.salesActual.map((val) => val.actual);

    return (
        <Flex flexDir="column" p="5">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                {data?.salesRoleById.salesRole} {data?.salesRoleById.branch}
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
                                <Flex>{/* FIXME: */}</Flex>
                                <Flex>
                                    <Flex
                                        flexDir="column"
                                        p="5"
                                        h="100%"
                                        align="center"
                                    >
                                        <Flex w="100%" justify="space-between" mb="1" px="2">
                                            <Text fontWeight="bold" fontSize="xl">
                                                Target
                                            </Text>
                                            <Button
                                                ml="5"
                                                size='sm'
                                                colorScheme="blue"
                                                leftIcon={<AddIcon />}
                                            // onClick={() => {
                                            //     setIsOpen(true);
                                            // }}
                                            >
                                                เพิ่ม
                                            </Button>
                                        </Flex>

                                        <Table
                                            boxShadow="base"
                                            variant="striped"
                                            colorScheme="blackAlpha"
                                        >
                                            <Thead>
                                                <Tr bg="#1379ec">
                                                    <Th
                                                        textAlign="center"
                                                        fontSize={["xs", "xs", "sm", "md"]}
                                                        color="white"
                                                    >
                                                        Year
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
                                                {data.salesRoleById.targets.map((val) => (
                                                    <Tr key={val.id}>
                                                        <Td>
                                                            <Center>{val.year}</Center>
                                                        </Td>
                                                        <Td>
                                                            <Center>{formatAmount(val.value)}</Center>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </Flex>
                                    <Flex
                                        flexDir="column"
                                        p="2"
                                        mr="5"
                                        cursor="pointer"
                                        boxShadow="xl"
                                        borderRadius="xl"
                                        background="#1379ec"
                                        color="white"
                                        align="center"
                                        _hover={{ fontWeight: "bold" }}
                                        onClick={() => userHandle(data?.salesRoleById.user.id)}
                                    >
                                        <Text fontSize="xl" mb="5">
                                            User ปัจจุบัน
                                        </Text>
                                        {data?.salesRoleById.user.imageUrl && (
                                            <Image
                                                borderRadius="xl"
                                                boxSize="200px"
                                                src={data.salesRoleById.user.imageUrl}
                                                alt="Dan Abramov"
                                            />
                                        )}
                                        <Text fontSize="xl">
                                            {data?.salesRoleById.user.fullNameTH}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex px="5" h="500px" rounded="7px" boxShadow="md">
                                <Flex justify="space-between" w="100%">
                                    <Flex flexDir="column" w="100%">
                                        {actualSum?.length === 0 || !actualSum ? (
                                            <Text ml="6" fontWeight="bold" fontSize="xl">
                                                ยังไม่มีข้อมูล
                                            </Text>
                                        ) : (
                                            <Flex>
                                                <Text ml="6" fontWeight="bold" fontSize="xl">
                                                    {" "}
                                                    ประวัติการกรอก Issue ของทั้งหมด
                                                </Text>
                                                <Text
                                                    ml="2"
                                                    fontWeight="bold"
                                                    fontSize="xl"
                                                    color="blue.500"
                                                >
                                                    {formatAmount(actualSum.reduce(reducer))}
                                                </Text>
                                            </Flex>
                                        )}

                                        <Table
                                            boxShadow="base"
                                            variant="striped"
                                            colorScheme="blackAlpha"
                                        >
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
                                                    <Tr key={i}>
                                                        <Td w="10%">
                                                            <Center>{formatDate(+val.createdAt)}</Center>
                                                        </Td>
                                                        <Td w="10%">
                                                            <Center>{val.user.fullNameTH}</Center>
                                                        </Td>
                                                        <Td w="20%">{val.title}</Td>
                                                        <Td w="30%">{val.detail}</Td>
                                                        <Td w="10%">
                                                            <Center>{formatAmount(val.actual)}</Center>
                                                        </Td>
                                                        <Td w="20%">{val.customer.customerName}</Td>
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
    );
};

export default SalesRoleDetail;

import React from 'react'
import {
    Flex, Text, Divider, Image, Button, Table,
    Tbody, Th, Thead, Tr, Td, Grid
} from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { AddIcon } from "@chakra-ui/icons";

import { useSalesRoleByIdQuery, useTargetByRoleQuery } from '../generated/graphql';
import Spinner from '../components/Spinner';
import { useDialog } from "../components/dialogs/useDialog";
import AddAndEditTarget from "../components/sales-report/AddAndEditTarget";
import { serviceLife } from '../utils/helpers';
import { useIsAuth } from '../utils/uselsAuth';

interface Props { }

const UserDetail: React.FC<Props> = () => {
    useIsAuth();

    const { isOpen, setIsOpen } = useDialog();

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useSalesRoleByIdQuery({
        variables: {
            id: +params.id,
            monthIndex: 0,
            year: 2022
        },
    });

    const [{ data: target }] = useTargetByRoleQuery({
        variables: {
            salesRoleId: +params.id,
        },
    });

    return (
        <Flex flexDir="column" p="5" pb="10" overflow="auto" h="96vh">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                แก้ไข {data?.salesRoleById.salesRole}
            </Text>
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
                    <Flex
                        py="2"
                        pl="5"
                        mt="3"
                        rounded="7px"
                        borderWidth='1px'
                        boxShadow="md"
                    >
                        {data?.salesRoleById.user.imageUrl && (
                            <Image
                                borderRadius="lg"
                                boxSize="60px"
                                src={data.salesRoleById.user.imageUrl}
                                alt="user"
                            />
                        )}

                        <Grid
                            ml="10"
                            w='100%'
                            templateColumns={[
                                'repeat(1, 1fr)',
                                'repeat(1, 1fr)',
                                'repeat(2, 1fr)',
                                'repeat(3, 1fr)',
                                'repeat(3, 1fr)',
                                'repeat(3, 1fr)'
                            ]}
                            gap={3}
                        >
                            <Flex>
                                <Text fontWeight="semibold">Name : </Text>
                                <Text>&nbsp;{data.salesRoleById.user.fullNameTH}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="semibold">Team : </Text>
                                <Text>&nbsp;{data.salesRoleById.channel}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="semibold">Area Code : </Text>
                                <Text>&nbsp;{data.salesRoleById.areaCode}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="semibold">Date Start : </Text>
                                <Text>&nbsp; {data.salesRoleById.startDate}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="semibold">อายุงาน : </Text>
                                {/* <Text>{data.salesRoleById.วันเริ่มตำแหน่ง หรือ อายุงาน}</Text> */}
                                <Text>
                                    &nbsp;{serviceLife(data.salesRoleById.startDate)}
                                </Text>
                            </Flex>
                        </Grid>
                    </Flex>

                    <Flex
                        p="2"
                        mt="3"
                        flexDir="column"
                        rounded="7px"
                        borderWidth='1px'
                        boxShadow="md"
                        alignItems="center"
                    >

                        <Button
                            mt="5"
                            colorScheme="blue"
                            color="white"
                            leftIcon={<AddIcon />}
                            onClick={() => setIsOpen(true)}
                        >
                            เพิ่ม Target
                        </Button>

                        {isOpen && (
                            <AddAndEditTarget
                                Open={true}
                                setOpen={() => setIsOpen(false)}
                                branch={data.salesRoleById.branch}
                                roleId={params.id}
                            />
                        )}

                        <Table mt="5" boxShadow="base" variant="striped" colorScheme="blackAlpha">
                            <Thead>
                                <Tr bg="#1379ec">
                                    <Th
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        ปี
                                    </Th>
                                    <Th
                                        isNumeric
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        COMMISSION
                                    </Th>
                                    <Th
                                        isNumeric
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        STRATEGY
                                    </Th>
                                    <Th
                                        isNumeric
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        จำนวน การเข้าพบลูกค้า
                                    </Th>
                                    <Th
                                        isNumeric
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        จำนวน ISSUE
                                    </Th>
                                    <Th
                                        isNumeric
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        มูลค่า ISSUE
                                    </Th>
                                    <Th
                                        isNumeric
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        มูลค่า QT
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {target?.targetByRole?.map(val => (
                                    <Tr key={val.id}>
                                        <Td>{val.year}</Td>
                                        <Td isNumeric>{val.commission}</Td>
                                        <Td isNumeric>{val.strategy}</Td>
                                        <Td isNumeric>{val.countVisit}</Td>
                                        <Td isNumeric>{val.countIssue}</Td>
                                        <Td isNumeric>{val.valueIssue}</Td>
                                        <Td isNumeric>{val.valueQt}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Flex>
                </>
            )}
        </Flex>
    )
}

export default UserDetail
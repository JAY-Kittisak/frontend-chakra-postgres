import React from "react";
import { Text, Flex, Divider, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props { }

const Administrator: React.FC<Props> = () => {
    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                ผู้ดูแลระบบ
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />
            <SimpleGrid columns={[1, 1, 1, 2, 4]} spacing={10}>
                <Flex
                    flexDir="column"
                    w="100%"
                    h="150px"
                    boxShadow="md"
                    ml="5"
                    rounded="lg"
                    p="3"
                >
                    <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                        ระบบแจ้ง Job IT
                    </Text>
                    <Flex flexDir="column" ml="5">
                        <Link to="/admin/manage-job-it">
                            <Text as="u" fontSize="xl">
                                จัดการ Job-IT
                            </Text>
                        </Link>
                    </Flex>
                </Flex>
                <Flex
                    flexDir="column"
                    w="100%"
                    h="150px"
                    boxShadow="md"
                    ml="5"
                    rounded="lg"
                    p="3"
                >
                    <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                        ระบบเบิกของแจกลูกค้า
                    </Text>
                    <Flex flexDir="column" ml="5">
                        <Link to="/admin/manage-gives">
                            <Text as="u" fontSize="xl">
                                จัดการของแจก
                            </Text>
                        </Link>
                        <Link to="/admin/manage-give-orders">
                            <Text as="u" fontSize="xl">
                                จัดการ Order ของแจก
                            </Text>
                        </Link>
                        <Link to="/admin/manage-give-category">
                            <Text as="u" fontSize="xl">
                                เพิ่มกลุ่มสินค้าใหม่
                            </Text>
                        </Link>
                    </Flex>
                </Flex>
                <Flex
                    flexDir="column"
                    w="100%"
                    h="150px"
                    boxShadow="md"
                    ml="5"
                    rounded="lg"
                    p="3"
                >
                    <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                        ระบบเบิกอุปกรณ์ IT
                    </Text>
                    <Flex flexDir="column" ml="5">
                        <Link to="/admin/manage-stock-it">
                            <Text as="u" fontSize="xl">
                                จัดการ Stock-IT
                            </Text>
                        </Link>
                        <Link to="/admin/stock-it-orders">
                            <Text as="u" fontSize="xl">
                                จัดการ Order Stock-IT
                            </Text>
                        </Link>
                    </Flex>
                </Flex>
                <Flex
                    flexDir="column"
                    w="100%"
                    h="150px"
                    boxShadow="md"
                    ml="5"
                    rounded="lg"
                    p="3"
                >
                    <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                        Users
                    </Text>
                    <Flex flexDir="column" ml="5">
                        <Link to="/admin/manage-users">
                            <Text as="u" fontSize="xl">
                                จัดการ Users
                            </Text>
                        </Link>
                    </Flex>
                    </Flex>
            </SimpleGrid>
        </>
    );
};

export default Administrator;

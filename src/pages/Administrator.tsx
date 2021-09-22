import React from "react";
import { Text, Flex, Image, Button, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom"

import Chart from "../components/chart/Chart";

interface Props { }

const Administrator: React.FC<Props> = () => {
    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
            >
                ผู้ดูแลระบบ
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />
            <Chart />

            <Flex flexDir="row" mt="5">
                <Flex
                    flexDir="column"
                    w="20%"
                    h="100%"
                    bg="#eee"
                    boxShadow="md"
                    ml="5"
                    rounded="lg"
                    justify="center"
                    p="3"
                >
                    <Flex justify="center">
                        <Image
                            boxSize="150px"
                            src="https://jsr.co.th/wp-content/uploads/2018/02/Jsr-group-header.png"
                            alt="Dan Abramov"
                        />
                    </Flex>
                    <Flex justify="center">
                        <Link to="/admin/manage-gives">
                            <Button mt="3" align="center" a="i" fontSize="2xl" colorScheme="green" color="#fff">
                                จัดการของแจก
                            </Button>
                        </Link>
                    </Flex>
                </Flex>

                <Flex
                    flexDir="column"
                    w="20%"
                    h="100%"
                    bg="#eee"
                    boxShadow="md"
                    ml="5"
                    rounded="lg"
                    justify="center"
                    p="3"
                >
                    <Flex justify="center">
                        <Image
                            boxSize="150px"
                            src="https://jsr.co.th/wp-content/uploads/2018/02/Jsr-group-header.png"
                            alt="Dan Abramov"
                        />
                    </Flex>
                    <Flex justify="center">
                        <Link to="/admin/manage-give-orders">
                            <Button mt="3" align="center" a="i" fontSize="2xl" colorScheme="green" color="#fff">
                                จัดการ Order ของแจก
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>

        </>
    );
};

export default Administrator;
import React from "react";
import { Text, Flex, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"

import pjaray from "../pjaray.svg"

interface Props { }

const Index: React.FC<Props> = () => {
    return (
        <>
            {/* -------------------------------------- Title --------------------------------------*/}
            <Flex
                w="100%"
                h="100%"
                flexDir={["column", "column", "column", "column", "row"]}
                align="center"
                bg="#eee"
                boxShadow="md"
                rounded="lg"
            >
                <Flex flexDir="column" p="10" w={["100%", "100%", "100%", "100%", "50%"]}>
                    <Text
                        as="h2"
                        fontSize={["sm", "sm", "md", "lg", "5xl"]}
                        fontWeight="bold"
                        mb="2"
                    >
                        MK Management
                    </Text>
                    <Text as="h3" fontSize={["sm", "sm", "sm", "md", "lg"]} fontWeight="light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                        possimus ratione, maiores voluptatem distinctio quod quisquam. Quia
                        placeat hic porro dolorem saepe numquam, vero ipsa sit, odit,
                        maiores inventore perferendis? Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Atque nisi amet nam, optio quos
                        ratione, distinctio velit, perferendis quis in accusantium
                        consequatur quibusdam iure sed excepturi vero ducimus nulla neque.
                    </Text>
                </Flex>
                <Flex w={["100%", "100%", "100%", "100%", "50%"]} justify="center">
                    <Image
                        boxSize="550px"
                        src={pjaray}
                        alt="Dan Abramov"
                    />
                </Flex>
            </Flex>

            <Text align="center" a="i" fontSize="3xl" fontWeight="bold" mb="5" mt="5">
                Function
            </Text>

            {/* -------------------------------------- Content --------------------------------------*/}
            <Flex flexDir="row" justify="center" ml="-5">

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
                        <Link to="/profile">
                            <Button mt="3" align="center" a="i" fontSize="2xl" colorScheme="green" color="#fff">
                                Dashboard
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
                        <Link to="/gives/gives-all">
                            <Button mt="3" align="center" a="i" fontSize="2xl" colorScheme="green" color="#fff">
                                เบิกของแจกลูกค้า
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
                        <Link to="/tiers/factories">
                            <Button mt="3" align="center" a="i" fontSize="2xl" colorScheme="green" color="#fff">
                                Tier
                            </Button>
                        </Link>
                    </Flex>
                </Flex>

            </Flex>
        </>
    );
};

export default Index;

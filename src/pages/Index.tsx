import React from "react";
import { Text, Flex, Image } from "@chakra-ui/react";

// import testsvg from "../testsvg.svg"
import logo from "../JSR-Logo-new-PNG.png"

interface Props { }

const Index: React.FC<Props> = () => {
    return (
        <Flex flexDir="column" overflowY="auto" h="100vh" p="50">
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
                        w="600px"
                        src={logo}
                        alt="Dan Abramov"
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Index;

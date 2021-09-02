import React from "react";
import Layout from "../components/Layout";
import { Box, Divider, Flex, Text, useColorMode } from "@chakra-ui/react";

interface Props { }

const Index: React.FC<Props> = () => {
    const { colorMode } = useColorMode();
    const bgColor = { light: "#0AB68B", dark: "#4F80E2" };
    return (
        <Layout variant="regular">
            <Flex
                maxW="1080px"
                w={["90vw", "90vw", "90vw", "70vw"]}
                direction={["column", "column", "row", "row"]}
                justify="center"
                bg={bgColor[colorMode]}
                boxShadow="md"
                rounded="lg"
                p="4"
            >
                <Flex align="center" mx="2">
                    <Box mx="4">
                        <Text as="h2" fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold" mb="2">
                            Usability
                        </Text>
                        <Text as="h3" fontSize={["sm", "sm", "md", "lg"]} fontWeight="light">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                            possimus ratione, maiores voluptatem distinctio quod quisquam.
                            Quia placeat hic porro dolorem saepe numquam, vero ipsa sit, odit,
                            maiores inventore perferendis?
                        </Text>
                    </Box>
                    <Divider orientation='vertical' borderColor='gray.300' my='2' />
                </Flex>
                <Flex align="center" mx="2">
                    <Box mx="4">
                        <Text as="h2" fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold" mb="2">
                            Parralax Effect
                        </Text>
                        <Text as="h3" fontSize={["sm", "sm", "md", "lg"]} fontWeight="light">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                            possimus ratione, maiores voluptatem distinctio quod quisquam.
                            Quia placeat hic porro dolorem saepe numquam, vero ipsa sit, odit,
                            maiores inventore perferendis?
                        </Text>
                    </Box>
                    <Divider orientation='vertical' borderColor='gray.300' my='2' />
                </Flex>
                <Flex align="center" mx="2">
                    <Box mx="4">
                        <Text as="h2" fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold" mb="2">
                            Parralax Effect
                        </Text>
                        <Text as="h3" fontSize={["sm", "sm", "md", "lg"]} fontWeight="light">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                            possimus ratione, maiores voluptatem distinctio quod quisquam.
                            Quia placeat hic porro dolorem saepe numquam, vero ipsa sit, odit,
                            maiores inventore perferendis?
                        </Text>
                    </Box>
                </Flex>
            </Flex>
        </Layout>
    );
};

export default Index;

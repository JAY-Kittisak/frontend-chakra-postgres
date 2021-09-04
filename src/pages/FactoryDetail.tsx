import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    IconButton,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AddAndEditJoinTier from "../components/tier/AddAndEditJoinTier";
import AddAndEditProductTier from "../components/tier/AddAndEditProductTier";
import { useFactoryByIdQuery } from "../generated/graphql";

interface Props { }

type Display = "none" | "hide" | "show";

const FactoryDetail: React.FC<Props> = () => {
    const [display, changeDisplay] = useState<Display>("hide");
    const [openProductForm, setOpenProductForm] = useState(false);
    const [creatorId, setCreatorId] = useState<number>(Number);
    const [creatorName, setCreatorName] = useState<string>("");
    const [openJoinForm, setOpenJoinForm] = useState(false);

    const params = useParams<{ id: string }>();

    const bg = useColorModeValue("gray.200", "gray.700");
    const color = useColorModeValue("blue", "blue");
    const colorW = useColorModeValue("orange", "black.100");


    const paramsId = params.id;
    const [{ data, fetching }] = useFactoryByIdQuery({
        variables: {
            id: +paramsId,
        },
    });

    useEffect(() => {
        if (data?.factoryById) {
            setCreatorId(data.factoryById.id);
            setCreatorName(data.factoryById.companyName);
        }
    }, [data]);

    if (!fetching && !data) {
        return <div>you got query failed for some reason</div>;
    }
    return (
        <>
            {!data && fetching ? (
                <div>Loading...</div>
            ) : (
                <Box>
                    <Flex>
                            <Box w="100%" p={5} rounded="7px" boxShadow="md" bg={bg}>
                                <Stack isInline align="baseline" justify="space-between" mb={4}>
                                    <Heading color="orange" fontSize={["xl", "2xl", "3xl", "4xl"]}>
                                        {data?.factoryById?.companyName}
                                    </Heading>
                                    <Text fontWeight="semibold" fontSize={["sm", "md", "lg", "xl"]}>
                                        เลขจดทะเบียน : {data?.factoryById?.id}
                                    </Text>
                                </Stack>
                                <Flex
                                    direction={["column", "column", "row", "row"]}
                                    justify="space-between"
                                >
                                    <Flex>
                                        <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold">
                                            <Badge
                                                ml="1"
                                                fontSize="0.8em"
                                                variant="solid"
                                                colorScheme="green"
                                                rounded="full"
                                                px={2}
                                            >
                                                {data?.factoryById?.industrialEstate}
                                            </Badge>
                                            <Badge
                                                ml="1"
                                                fontSize="0.8em"
                                                variant="solid"
                                                colorScheme="pink"
                                                rounded="full"
                                                px={2}
                                            >
                                                {data?.factoryById?.businessType}
                                            </Badge>
                                        </Text>
                                    </Flex>
                                    <Flex mt="3">
                                        <Text
                                            textTransform="uppercase"
                                            fontSize={["xs", "md", "md", "md"]}
                                            color="tomato"
                                            fontWeight="semibold"
                                            mr="1"
                                        >
                                            Phone &bull;
                                        </Text>
                                        <Text
                                            textTransform="uppercase"
                                            fontSize={["xs", "sm", "md", "md"]}
                                            mr="2"
                                        >
                                            {data?.factoryById?.phoneNumber}{" "}
                                        </Text>
                                        <Text
                                            textTransform="uppercase"
                                            fontSize={["xs", "sm", "md", "md"]}
                                            color="tomato"
                                            fontWeight="semibold"
                                            mr="1"
                                        >
                                            FAX &bull;
                                        </Text>
                                        <Text
                                            textTransform="uppercase"
                                            fontSize={["xs", "sm", "md", "md"]}
                                        >
                                            {data?.factoryById?.FAX}
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Flex
                                    direction={["column", "column", "row", "row"]}
                                    justify="space-between"
                                >
                                    <Text
                                        textTransform="uppercase"
                                        fontSize={["xs", "sm", "md", "md"]}
                                        color="tomato"
                                        fontWeight="semibold"
                                    >
                                        description&bull;
                                    </Text>
                                    <Text
                                        fontWeight="light"
                                        fontSize={["sm", "sm", "lg", "xl"]}
                                        ml={["8", "8", "2", "2"]}
                                    >
                                        {data?.factoryById?.description}
                                    </Text>
                                </Flex>

                                <Flex direction={["column", "column", "row", "row"]}>
                                    <Text
                                        textTransform="uppercase"
                                        fontSize={["xs", "sm", "md", "md"]}
                                        color="tomato"
                                        fontWeight="semibold"
                                    >
                                        Address&bull;
                                    </Text>
                                    <Text
                                        fontSize={["xs", "sm", "md", "md"]}
                                        ml={["8", "8", "2", "2"]}
                                    >
                                        {data?.factoryById?.address}
                                    </Text>
                                </Flex>

                                <Box textAlign="center">
                                    <Button
                                        size="lg"
                                        mt={3}
                                        mr="7"
                                        boxShadow="sm"
                                        rightIcon={<AddIcon />}
                                        colorScheme={color}
                                        onClick={() => {
                                            setOpenProductForm(true);
                                        }}
                                    >
                                        <Text color={colorW}>Add Product</Text>
                                    </Button>
                                    {openProductForm && creatorId && (
                                        <AddAndEditProductTier
                                            creatorId={creatorId}
                                            creatorName={creatorName}
                                            setOpenProductForm={setOpenProductForm}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Flex>

                        <Flex direction={["column", "column", "column", "row"]}>
                            {/* ---------------------------------ผลิต------------------------------------*/}
                            <Box
                                w={display === "show" ? ["95vw", "95vw", "95vw", "50%"] : "100%"}
                                flexDir="column"
                                alignContent="center"
                                p={8}
                            >
                                <Heading mb={4}>Product ที่ผลิต</Heading>
                                {!data?.factoryById?.products.length ? (
                                    <Text p={1} color="red" fontSize="xl">
                                        ไม่ประวัติการบันทึกข้อมูล
                                    </Text>
                                ) : (
                                    data?.factoryById?.products.map((product) => (
                                        <Box
                                            key={product.id}
                                            w="100%"
                                            rounded="20px"
                                            overflow="hidden"
                                            boxShadow="md"
                                            bg={bg}
                                            mb="8"
                                            mt="5"
                                        >
                                            <Box p={5}>
                                                <Stack isInline justify="space-between" mt={2}>
                                                    <Text
                                                        as="h2"
                                                        fontWeight="semibold"
                                                        fontSize={["lg", "lg", "xl", "2xl"]}
                                                    >
                                                      {product.productName}
                                                  </Text>
                                                    <Text
                                                        fontWeight="semibold"
                                                        fontSize={["lg", "lg", "xl", "2xl"]}
                                                    >
                                                      Product ID : {product.id}
                                                  </Text>
                                                </Stack>
                                                <Link to={`/tiers/product-tier`}>
                                                    <Badge
                                                      fontSize="0.8em"
                                                      variant="solid"
                                                      colorScheme="blue"
                                                      rounded="full"
                                                  >
                                                      {product.category}
                                                  </Badge>
                                                </Link>
                                                <Text ml="7" fontSize={["sm", "sm", "lg", "xl"]}>
                                                    {product.description}
                                              </Text>

                                                <Divider borderColor="gray.300" my="2" />

                                                <Flex
                                                    direction={["column", "column", "column", "row"]}
                                                    justify="space-between"
                                                >
                                                    <Flex align="center">
                                                        <Box>
                                                            <Text
                                                                fontSize={["sm", "md", "lg", "xl"]}
                                                                fontWeight="bold"
                                                                mb="2"
                                                            >
                                                                ผลิตให้กับบริษัท
                                                            </Text>
                                                            {product.factorys &&
                                                                product.factorys.map((factory) => (
                                                                    <Text
                                                                        key={factory.id}
                                                                        as="u"
                                                                        fontSize={["sm", "sm", "sm", "lg"]}
                                                                        fontWeight="light"
                                                                        ml="7"
                                                                        color="orange"
                                                                    >
                                                                        <Link
                                                                            to={`/tiers/factories/${factory.id}`}
                                                                            onClick={() => changeDisplay("show")}
                                                                        >
                                                                            {factory.companyName}
                                                                            <br />
                                                                        </Link>
                                                                    </Text>
                                                                ))}
                                                      </Box>
                                                    </Flex>
                                                    <Flex align="center">
                                                        <Box mt="4">
                                                            <Button
                                                                rightIcon={<AddIcon />}
                                                                colorScheme="orange"
                                                                variant="outline"
                                                                size="md"
                                                                onClick={() => setOpenJoinForm(true)}
                                                            >
                                                                เพิ่มบริษัท
                                                            </Button>
                                                            {openJoinForm && (
                                                                <AddAndEditJoinTier
                                                                    productId={product.id}
                                                                    setOpenJoinForm={setOpenJoinForm}
                                                                />
                                                            )}
                                                        </Box>
                                                    </Flex>
                                                </Flex>
                                          </Box>
                                      </Box>
                                  ))
                                )}
                            </Box>

                            {/* ---------------------------------Display------------------------------------*/}
                            <Box mt="10">
                                <IconButton
                                    aria-label=""
                                    icon={
                                        display === "show" ? (
                                            <ViewOffIcon />
                                        ) : (
                                            <Box mb="1">
                                                <Text mt="2" p={1}>
                                                    Received
                                                </Text>
                                                <ViewIcon mb="2" />
                                            </Box>
                                        )
                                    }
                                    onClick={() => {
                                        if (display === "show") {
                                            changeDisplay("none");
                                        } else {
                                            changeDisplay("show");
                                        }
                                    }}
                                />
                                <Divider orientation="vertical" ml={display === "show" ? 5 : 9} />
                            </Box>
                            {/* ---------------------------------รับสินค้า------------------------------------*/}
                            {display === "show" ? (
                                <Box
                                    // w={["100%", "45%"]}
                                    w={["95vw", "95vw", "50%", "50%"]}
                                    flexDir="column"
                                    alignContent="center"
                                    p={8}
                                >
                                    <Heading mb={4}>Product ที่ไปสั่งบริษัทอื่นผลิต</Heading>
                                    {!data?.factoryById?.productReceives ? (
                                        <Text p={1} color="red" fontSize="xl">
                                            ไม่ประวัติการบันทึกข้อมูล
                                        </Text>
                                    ) : (
                                        data?.factoryById?.productReceives?.map((productR) => (
                                            <Box
                                                key={productR.id}
                                                w="100%"
                                                rounded="20px"
                                                overflow="hidden"
                                                boxShadow="md"
                                                bg={bg}
                                                mb="8"
                                                mt="5"
                                            >
                                                <Box p={5}>
                                                    <Stack isInline justify="space-between" mt={2}>
                                                        <Text
                                                            as="h2"
                                                            fontWeight="semibold"
                                                            fontSize={["lg", "lg", "xl", "2xl"]}
                                                        >
                                                            {productR.productName}
                                                        </Text>
                                                        <Text
                                                            fontWeight="semibold"
                                                            fontSize={["lg", "lg", "xl", "2xl"]}
                                                        >
                                                            Product ID : {productR.id}
                                                        </Text>
                                                    </Stack>
                                                    <Link to={`/tiers/product-tier`}>
                                                        <Badge
                                                            fontSize="0.8em"
                                                            variant="solid"
                                                            colorScheme="blue"
                                                            rounded="full"
                                                        >
                                                            {productR.category}
                                                        </Badge>
                                                    </Link>
                                                    <Text ml="7" fontSize={["sm", "sm", "lg", "xl"]}>
                                                        {productR.description}
                                                    </Text>

                                                    <Divider borderColor="gray.300" my="2" />

                                                    <Flex
                                                        direction={["column", "column", "column", "row"]}
                                                        justify="space-between"
                                                    >
                                                        <Flex align="center">
                                                            <Box>
                                                                <Text
                                                                    fontSize={["sm", "md", "lg", "xl"]}
                                                                    fontWeight="bold"
                                                                    mb="2"
                                                                >
                                                                    ผลิตโดย
                                                                </Text>
                                                                <Text
                                                                    as="u"
                                                                    fontSize={["sm", "sm", "sm", "lg"]}
                                                                    fontWeight="light"
                                                                    ml="7"
                                                                    color="orange"
                                                                >
                                                                    <Link
                                                                        to={`/tiers/factories/${productR.creatorId}`}
                                                                        onClick={() => changeDisplay("show")}
                                                                    >
                                                                        {productR.creatorName}
                                                                        <br />
                                                                    </Link>
                                                                </Text>
                                                            </Box>
                                                        </Flex>
                                                    </Flex>
                                                </Box>
                                            </Box>
                                        ))
                                    )}
                                </Box>
                            ) : null}
                    </Flex>
                </Box>
            )}
        </>
    );
};

export default FactoryDetail;

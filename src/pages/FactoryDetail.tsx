import { useParams } from "react-router-dom";
import {
    Badge,
    Box,
    Button,
    Flex,
    Stack,
    Text,
    useColorModeValue,
    Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../components/Layout";
import AddAndEditProductTier from '../components/tier/AddAndEditProductTier'
import { useFactoryByIdQuery } from "../generated/graphql";

interface Props { }

const FactoryDetail: React.FC<Props> = () => {
    const params = useParams<{ id: string }>();
    const bg = useColorModeValue("gray.200", "gray.700");
    const color = useColorModeValue("blue", "gray");
    const colorW = useColorModeValue("white", "white");

    const [openProductForm, setOpenProductForm] = useState(false)
    const [factoryId, setFactoryId] = useState<number | undefined>(undefined)
    const [factoryName, setFactoryName] = useState<string | undefined>(undefined)

    const paramsId = params.id;
    const [{ data, fetching }] = useFactoryByIdQuery({
        variables: {
            id: +paramsId,
        },
    });

    if (!fetching && !data) {
        return <div>you got query failed for some reason</div>;
    }

    return (
        <Layout variant="regular">
            {!data && fetching ? (
                <div>Loading...</div>
            ) : (
                <Box>
                    <Flex>
                        <Box w="100%" p={5} rounded="10px" boxShadow="sm" bg={bg} mr="5">
                            <Heading mb={4} color="orange">
                                {data?.factoryById?.companyName}
                            </Heading>
                            <Stack isInline align="baseline">
                                <Text fontSize="xl" fontWeight="bold">
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
                                    <Text
                                        textTransform="uppercase"
                                        fontSize="sm"
                                        colorScheme={color}
                                        letterSpacing="wide"
                                    >
                                        {data?.factoryById?.phoneNumber}&bull;{" "}
                                        {data?.factoryById?.FAX}
                                    </Text>
                                </Stack>
                                <Text fontWeight="light" fontSize="md" my={3}>
                                    {data?.factoryById?.description}
                                </Text>
                                <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                                    {data?.factoryById?.address}
                                </Text>
                                <Box textAlign="center">
                                    <Button
                                        colorScheme={color}
                                        size="lg"
                                        mt={3}
                                        mr="7"
                                        boxShadow="sm"
                                        _hover={{ boxShadow: "md" }}
                                        _active={{ boxShadow: "lg" }}
                                        onClick={() => {
                                            setFactoryId(data?.factoryById?.id)
                                            setFactoryName(data?.factoryById?.companyName)
                                            setOpenProductForm(true)
                                        }
                                        }
                                    >
                                        <Text color={colorW}>Add Product</Text>
                                    </Button>
                                    {openProductForm && factoryId && (
                                        <AddAndEditProductTier
                                            factoryId={factoryId}
                                            factoryName={factoryName}
                                            setOpenProductForm={setOpenProductForm}
                                        />
                                    )}


                                </Box>
                            </Box>
                        </Flex>

                        <Flex>
                            <Box w="50%" p={8}>
                                <Heading mb={4}>ผลิต</Heading>
                                {!data?.factoryById?.products.length ? (
                                    <Text p={1} color="red" fontSize="xl">
                                        NO DATA
                                    </Text>
                                ) : (
                                        data?.factoryById?.products.map((product) => (
                                            <Box
                                                key={product.id}
                                                w="600px"
                                                rounded="20px"
                                                overflow="hidden"
                                                boxShadow="sm"
                                                bg={bg}
                                                mb="8"
                                                mr="7"
                                                mt="5"
                                            >
                                                <Box p={5}>
                                                    <Badge
                                                        ml="1"
                                                        fontSize="0.8em"
                                                        variant="solid"
                                                        colorScheme="blue"
                                                        rounded="full"
                                                    >
                                                        {product.category}
                                                    </Badge>
                                                    <Stack isInline justify="space-between">
                                                        <Text
                                                            as="h2"
                                                            fontWeight="semibold"
                                                            fontSize="xl"
                                                            my={2}
                                                        >
                                                            {product.productName}
                                                        </Text>
                                                        <Text>ID: {product.id}</Text>
                                                    </Stack>
                                                    <Text isTruncated>{product.description}</Text>
                                                    <Text fontSize="xl" mt="5">
                                                        ให้กับ
                                                    </Text>
                                                    {product.factorys.map((factory) => (
                                                        <Text key={factory.id} p={1} color="orange">
                                                            {factory.companyName}
                                                        </Text>
                                                    ))}
                                                </Box>
                                            </Box>
                                        ))
                                )}
                            </Box>

                            <Box w="50%" p={8}>
                                <Heading mb={4}>รับสินค้า</Heading>
                                {!data?.factoryById?.productReceives ? (
                                    <Text p={1} color="red" fontSize="xl">
                                        NO DATA
                                    </Text>
                                ) : (
                                    data?.factoryById?.productReceives?.map((productR) => (
                                        <Box
                                            key={productR.id}
                                            w="600px"
                                            rounded="20px"
                                            overflow="hidden"
                                            boxShadow="sm"
                                            bg={bg}
                                            mb="8"
                                            mr="7"
                                            mt="5"
                                        >
                                            <Box p={5}>
                                                <Badge
                                                    ml="1"
                                                    fontSize="0.8em"
                                                    variant="solid"
                                                    colorScheme="blue"
                                                    rounded="full"
                                                >
                                                    {productR.category}
                                                </Badge>
                                                <Stack isInline justify="space-between">
                                                    <Text
                                                        as="h2"
                                                        fontWeight="semibold"
                                                        fontSize="xl"
                                                        my={2}
                                                    >
                                                        {productR.productName}
                                                    </Text>
                                                    <Text>ID: {productR.id}</Text>
                                                </Stack>
                                                <Text isTruncated>{productR.description}</Text>
                                                <Text fontSize="xl" mt="5">
                                                    มาจาก
                                                </Text>
                                                {productR.factorys.map((factory) => (
                                                    <Text key={factory.id} p={1} color="orange">
                                                        {factory.companyName}
                                                    </Text>
                                                ))}
                                            </Box>
                                        </Box>
                                    ))
                                )}
                            </Box>
                    </Flex>
                    </Box>
            )}
        </Layout>
    );
};

export default FactoryDetail;

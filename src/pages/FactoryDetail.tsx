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
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import AddAndEditProductTier from "../components/tier/AddAndEditProductTier";
import { useFactoryByIdQuery } from "../generated/graphql";
import { Link } from "react-router-dom";

interface Props { }

const FactoryDetail: React.FC<Props> = () => {
    const params = useParams<{ id: string }>();
    const bg = useColorModeValue("gray.200", "gray.700");
    const color = useColorModeValue("blue", "gray");
    const colorW = useColorModeValue("white", "white");

    const [openProductForm, setOpenProductForm] = useState(false);
    const [creatorId, setCreatorId] = useState<number>(Number);
    const [creatorName, setCreatorName] = useState<string>("");

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
        <Layout variant="regular">
            {!data && fetching ? (
                <div>Loading...</div>
            ) : (
                <Box>
                    <Flex>
                        <Box w="100%" p={5} rounded="10px" boxShadow="sm" bg={bg} mr="5">
                                <Stack isInline align="baseline" justify="space-between" mb={4}>
                                    <Heading color="orange">
                                        {data?.factoryById?.companyName}
                                    </Heading>
                                    <Text fontWeight="semibold" fontSize="xl">
                                        เลขจดทะเบียน : {data?.factoryById?.id}
                                    </Text>
                                </Stack>
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
                                        onClick={() => setOpenProductForm(true)}
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

                        {/* ---------------------------------ผลิต------------------------------------*/}
                        <Flex>
                            <Box w="50%" p={8}>
                                <Heading mb={4}>Product ที่ผลิต</Heading>
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
                                              <Stack isInline justify="space-between" my={2}>
                                                  <Text as="h2" fontWeight="semibold" fontSize="xl">
                                                      {product.productName}
                                                  </Text>
                                                  <Text fontWeight="semibold" fontSize="xl">
                                                      Product ID : {product.id}
                                                  </Text>
                                              </Stack>
                                              <Text ml="7">{product.description}</Text>

                                              <Text fontSize="xl">
                                                  Category :
                                                  <Badge
                                                      ml="5"
                                                      fontSize="0.8em"
                                                      variant="solid"
                                                      colorScheme="blue"
                                                      rounded="full"
                                                  >
                                                      {product.category}
                                                  </Badge>
                                              </Text>
                                              <Box>
                                                  <Flex>
                                                      <Box>
                                                          <Text fontSize="xl">ผลิตให้กับบริษัท :</Text>
                                                      </Box>
                                                      <Box>
                                                          {product.factorys.map((factory) => (
                                                              <Text
                                                key={factory.id}
                                                color="orange"
                                                as="u"
                                                ml="7"
                                            >
                                                <Link to={`/tiers/factories/${factory.id}`}>
                                                    {factory.companyName}
                                                    <br />
                                                </Link>
                                            </Text>
                                        ))}
                                                      </Box>
                                                  </Flex>
                                              </Box>
                                          </Box>
                                      </Box>
                                  ))
                                )}
                            </Box>

                            {/* ---------------------------------รับสินค้า------------------------------------*/}
                            <Box w="50%" p={8}>
                                <Heading mb={4}>Product ที่รับมา</Heading>
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
                                              <Stack isInline justify="space-between" my={2}>
                                                  <Text as="h2" fontWeight="semibold" fontSize="xl">
                                                      {productR.productName}
                                                  </Text>
                                                  <Text fontWeight="semibold" fontSize="xl">
                                                      Product ID : {productR.id}
                                                  </Text>
                                              </Stack>
                                              <Text ml="7">{productR.description}</Text>

                                              <Text fontSize="xl">
                                                  Category :
                                                  <Badge
                                                      ml="5"
                                                      fontSize="0.8em"
                                                      variant="solid"
                                                      colorScheme="blue"
                                                      rounded="full"
                                                  >
                                                      {productR.category}
                                                  </Badge>
                                              </Text>
                                              <Flex>
                                                  <Box>
                                                      <Text fontSize="xl">ผลิตโดย :</Text>
                                                  </Box>
                                                  <Box>
                                                      <Text p={1} color="orange" as="u" ml="7">
                                                          <Link to={`/tiers/factories/${productR.creatorId}`}>
                                                              {productR.creatorName} <br />
                                                          </Link>
                                                      </Text>
                                                  </Box>
                                              </Flex>
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

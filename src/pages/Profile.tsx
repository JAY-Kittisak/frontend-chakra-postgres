import React from "react";
import {
    Text,
    Flex,
    Box,
    Heading,
    Button,
    Center,
} from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import AddImageUser from "../components/manage-users/AddImageUser";

interface Props { }

const Profile: React.FC<Props> = () => {
    const [{ data }] = useMeQuery()

    return (
        <Layout variant="small">
            <Box p="2" align="center">
                <Heading fontSize="4xl">Profile</Heading>
            </Box>
            <Flex
                direction={["column", "column", "column", "column"]}
                justify="center"
                mt={5}
                p="10"
                bg="gray.700"
                rounded="10px"
                boxShadow="md"
            >
                {data?.me ? (
                    <AddImageUser imagesUrl={data.me.imageUrl as string} />
                ) : (
                    <div>No Data.</div>
                )}

                <Box w="100%" p="5" bg="gray.600" rounded="10px" boxShadow="md">
                    <Formik
                        initialValues={{
                            fullNameTH: "",
                            fullNameEN: "",
                            nickName: "",
                            email: "",
                        }}
                        onSubmit={async (
                            values
                            //  { setErrors }
                        ) => {
                            console.log(values);

                            // const response = await register({ options: values });

                            // if (response.data?.register.errors) {
                            //     setErrors(toErrorMap(response.data.register.errors));
                            // } else if (response.data?.register.user) {
                            //     history.push("/profile");
                            // }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* <Flex
                                        direction={["column", "column", "row", "row"]}
                                        justify="space-between"
                                        mt="5"
                                        > */}
                                <InputField
                                    name="fullNameTH"
                                    value={data?.me?.fullNameTH ? data?.me?.fullNameTH : ""}
                                    label="ชื่อภาษาไทย"
                                />
                                <InputField
                                    name="fullNameEN"
                                    value={data?.me?.fullNameEN ? data?.me?.fullNameEN : ""}
                                    label="ชื่อภาษาอังกฤษ"
                                />
                                <InputField
                                    name="nickName"
                                    value={data?.me?.nickName ? data?.me?.nickName : ""}
                                    label="ชื่อเล่น"
                                />
                                <InputField
                                    name="email"
                                    value={data?.me?.email ? data?.me?.email : ""}
                                    label="Email"
                                />

                                <Flex
                                    direction={["column", "column", "row", "row"]}
                                    justify="space-evenly"
                                    mt="5"
                                >
                                    <Flex>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md", "xl"]}
                                            p={2}
                                        >
                                            แผนก
                                        </Text>
                                        <Box bg="cyan.600" rounded="10px">
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md", "xl"]}
                                                p={2}
                                            >
                                                {data?.me?.departments}
                                            </Text>
                                        </Box>
                                    </Flex>

                                    <Flex>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md", "xl"]}
                                            p={2}
                                        >
                                            สาขา
                                        </Text>
                                        <Box bg="green" rounded="10px">
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md", "xl"]}
                                                p={2}
                                            >
                                                {data?.me?.roles === "client_LKB"
                                                    ? "ลาดกระบัง"
                                                    : "ชลบุรี"}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Flex>

                                <Center>
                                    <Button
                                        mt={4}
                                        type="submit"
                                        isLoading={isSubmitting}
                                        colorScheme="teal"
                                    >
                                        แก้ไขข้อมูล
                                    </Button>
                                </Center>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex>
        </Layout>
    );
};

export default Profile;

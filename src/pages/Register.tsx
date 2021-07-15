import {
    Box,
    Button,
    Center,
    Flex,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { SelectControl } from "../components/Selectfield";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { catUserRole, catDepartments } from "../utils/helpers";

interface Props { }

const Register: React.FC<Props> = () => {
    const bg = useColorModeValue("gray.200", "gray.700");
    const history = useHistory();
    const [, register] = useRegisterMutation();
    return (
        <Layout variant="small">
            <Text as="h2" fontWeight="semibold" fontSize="2xl" mb="2">
                Register
            </Text>
            <Box
                justify="center"
                w="100%"
                rounded="10px"
                boxShadow="sm"
                bg={bg}
                p="5"
            >
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        email: "",
                        departments: "",
                        roles: "",
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        if (values.roles === "ลาดกระบัง") {
                            values.roles = "client-LKB";
                        }
                        if (values.roles === "ชลบุรี") {
                            values.roles = "client-CDC";
                        }
                        if (values.departments === "" || values.roles === "*โปรดเลือกแผนก") return alert("*โปรดเลือกแผนก ของคุณ");
                        if (values.roles === "" || values.roles === "*โปรดเลือกสาขา") return alert("*โปรดเลือกสาขา ของคุณ");

                        const response = await register({ options: values });



                        if (response.data?.register.errors) {
                            setErrors(toErrorMap(response.data.register.errors));
                        } else if (response.data?.register.user) {
                            history.push("/profile");
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="username"
                                placeholder="username"
                                label="Username"
                            />
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                            <InputField name="email" placeholder="email" label="Email" />

                            <Flex
                                direction={["column", "column", "row", "row"]}
                                justify="space-between"
                                mt="5"
                            >
                                <Text fontWeight="semibold" fontSize={["sm", "md"]} p={2}>
                                    แผนก
                                </Text>
                                <SelectControl name="departments" defaultValue="">
                                    {catDepartments.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </SelectControl>
                                <Text fontWeight="semibold" fontSize={["sm", "md"]} p={2}>
                                    สาขา
                                </Text>
                                <SelectControl name="roles" defaultValue="*โปรดเลือกสาขา" >
                                    {catUserRole.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </SelectControl>
                            </Flex>

                            <Center>
                                <Button
                                    mt={4}
                                    type="submit"
                                    isLoading={isSubmitting}
                                    colorScheme="teal"
                                >
                                    register
                                </Button>
                            </Center>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Layout>
    );
};

export default Register;

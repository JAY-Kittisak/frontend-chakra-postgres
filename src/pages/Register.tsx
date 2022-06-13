import { Button, Center, Flex, Text, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import InputField from "../components/InputField";
import { SelectControl } from "../components/Selectfield";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { catUserRole, catDepartments } from "../utils/helpers";

interface Props { }

const Register: React.FC<Props> = () => {
    const history = useHistory();
    const [, register] = useRegisterMutation();

    return (
        <Flex h="96vh" justifyContent="center" alignItems="center">
            <Flex direction="column" align="center" borderRadius="xl" boxShadow="2xl" p="10" border="1px">
                <Heading mb="2">
                    Register
                </Heading>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        email: "",
                        departments: "client",
                        roles: "ลาดกระบัง",
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        if (values.roles === "ลาดกระบัง") {
                            values.roles = "client-LKB";
                        }
                        if (values.roles === "ชลบุรี") {
                            values.roles = "client-CDC";
                        }

                        const response = await register({ options: values })
                        if (response.data?.register.errors) {
                            setErrors(toErrorMap(response.data.register.errors));
                        } else if (response.data?.register.user) {
                            return history.push('/profile')
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
                                <SelectControl name="roles" defaultValue="*โปรดเลือกสาขา">
                                    {catUserRole.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </SelectControl>
                            </Flex>
                            <Center>
                                <Button
                                    w="100%"
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
            </Flex>
        </Flex>
    );
};

export default Register;

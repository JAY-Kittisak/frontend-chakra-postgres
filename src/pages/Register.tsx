import { Box, Button, Text, Center, Flex, useColorModeValue } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/InputField'
import Layout from '../components/Layout'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'


interface Props { }

const Register: React.FC<Props> = () => {
    const bg = useColorModeValue("gray.200", "gray.700")
    const history = useHistory()
    const [, register] = useRegisterMutation()
    return (
        <Layout variant="small">
            <Text as="h2" fontWeight="semibold" fontSize="2xl" mb="2">
                Register
            </Text>
            <Flex justify="center">
                <Box Box w="100%" rounded="10px" boxShadow="sm" bg={bg} p="5">
                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                            email: "",
                            roles: "",
                            fullNameTH: "",
                            fullNameEN: "",
                            nickName: "",
                            departments: "",
                        }}
                        onSubmit={async (values, { setErrors }) => {
                            const response = await register({ options: values })
                            if (response.data?.register.errors) {
                                setErrors(toErrorMap(response.data.register.errors))
                            } else if (response.data?.register.user) {
                                //worked
                                history.push('/')
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
                                <InputField
                                    name="email"
                                    placeholder="email"
                                    label="Email"
                                />
                                <InputField
                                    name="roles"
                                    placeholder="roles"
                                    label="Roles"
                                />
                                <InputField
                                    name="fullnameTH"
                                    placeholder="fullnameTH"
                                    label="Full Name TH"
                                />
                                <InputField
                                    name="fullnameEN"
                                    placeholder="fullnameEN"
                                    label="Full name EN"
                                />
                                <InputField
                                    name="nickName"
                                    placeholder="nickName"
                                    label="Nick Name"
                                />
                                <InputField
                                    name="departments"
                                    placeholder="departments"
                                    label="Departments"
                                />
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
            </Flex>
        </Layout>
    )
}

export default Register
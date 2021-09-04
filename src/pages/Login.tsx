import { Box, Button, Heading, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/InputField'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'



const Login: React.FC<{}> = () => {
    const history = useHistory()
    const [, login] = useLoginMutation()
    return (
        <>
            <Flex direction="column" align="center">
                <Heading as="h3" size="xl" mb="7">Login</Heading>
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await login({ options: values })
                        if (response.data?.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors))
                        } else if (response.data?.login.user) {
                            if (typeof history.location.state === "string") {
                                history.push(history.location.state)
                            } else {
                                //worked
                                history.push('/profile')
                            }
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
                            <Box mt={4}>
                                <InputField
                                    name="password"
                                    placeholder="password"
                                    label="Password"
                                    type="password"
                                />
                            </Box>
                            <Button
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                                colorScheme="teal"
                            >
                                login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Flex>
        </>
    )
}

export default Login
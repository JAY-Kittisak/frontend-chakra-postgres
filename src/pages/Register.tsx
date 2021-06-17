import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import InputField from '../components/InputField'
import Layout from '../components/Layout'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'

interface Props { }

const Register: React.FC<Props> = () => {
    const history = useHistory()
    const [, register] = useRegisterMutation()
    return (
        <Layout variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register(values)
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
                            register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default Register
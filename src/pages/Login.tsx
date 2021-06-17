import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import InputField from '../components/InputField'
import Layout from '../components/Layout'
import { toErrorMap } from '../utils/toErrorMap'
import { useLoginMutation } from '../generated/graphql'


const Login: React.FC<{}> = () => {
    const history = useHistory()
    const [, login] = useLoginMutation()
    return (
        <Layout variant="small">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({ options: values })
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
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
                            login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default Login
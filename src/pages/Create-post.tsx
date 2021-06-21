import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Box, Button } from '@chakra-ui/react'

import Layout from '../components/Layout'
// import {toErrorMap} from '../utils/toErrorMap'
import InputField from '../components/InputField'
import { useCreatePostMutation, useMeQuery } from '../generated/graphql'

interface Props { }

const CreatePost: React.FC<Props> = () => {
    const [{ data, fetching }] = useMeQuery()
    const history = useHistory()
    const [, createPost] = useCreatePostMutation()

    useEffect(() => {
        if (!fetching && !data?.me) {
            history.replace("/login")
        }
    }, [fetching, data, history])
    return (
        <Layout variant='small'>
            <Formik
                initialValues={{ title: "", text: "" }}
                onSubmit={async (values) => {
                    const { error } = await createPost({ input: values })
                    if (error) {
                        history.push("/login")
                    } else {
                        history.push('/')
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="Title"
                        />
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="text"
                                placeholder="text..."
                                label="Body"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            create post
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default CreatePost
import { Box, Button, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/InputField'
import Layout from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { useIsAuth } from '../utils/uselsAuth'


interface Props { }

const CreatePost: React.FC<Props> = () => {
    const history = useHistory()
    useIsAuth()
    const [, createPost] = useCreatePostMutation()
    return (
        <Layout variant='small'>
            <Heading as="h3" size="xl" mb="7">Create post</Heading>
            <Formik
                initialValues={{ title: "", text: "" }}
                onSubmit={async (values) => {
                    const { error } = await createPost({ input: values })
                    if (error) {
                        history.push("/login")
                    } else {
                        history.push('/post')
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
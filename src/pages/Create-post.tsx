import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Box, Button } from '@chakra-ui/react'

import Wrapper from '../components/Wrapper'
// import {toErrorMap} from '../utils/toErrorMap'
import InputField from '../components/InputField'
import { useCreatePostMutation } from '../generated/graphql'

interface Props { }

const CreatePost: React.FC<Props> = () => {
    const history = useHistory()
    const [, createPost] = useCreatePostMutation()
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ title: "", text: "" }}
                onSubmit={async (values) => {
                    await createPost({ input: values })
                    history.push('/')
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
        </Wrapper>
    )
}

export default CreatePost
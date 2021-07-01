import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Form, Formik, Field } from 'formik'
import React from 'react'
// import { useState } from 'react'
import InputField from '../../components/InputField'
// import { useCreateProductByTierMutation } from '../../generated/graphql'
import { catProduct } from '../../utils/helpers'

interface Props {
    creatorId: number
    creatorName: string
    setOpenProductForm: (open: boolean) => void
}

const AddAndEditProductTier: React.FC<Props> = ({ creatorId, creatorName, setOpenProductForm }) => {
    // const [, createProductByTier] = useCreateProductByTierMutation()
    // const [category, setCategory] = useState("");

    // useEffect(() => {

    // })

    return (
        <>
            <div
                className="backdrop"
                onClick={() => {
                    setOpenProductForm(false)
                }}
            >
                {' '}
            </div>
            <div className="modal--tier modal--add-product">
                <div
                    className="modal-close"
                    onClick={() => {
                        setOpenProductForm(false)
                    }}>
                    &times;
                </div>
                <Heading as="h3" size="lg" color="blue.400">Add a new product</Heading>
                <Formik
                    initialValues={{ creatorId, creatorName, productName: "", description: "", category: "" }}
                    onSubmit={async (values) => {
                        // const { error } = await createProductByTier({ input: values })

                        console.log(values)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="productName"
                                placeholder="productName"
                                label="Product Name"
                            />

                            <Box mt={4}>
                                <InputField
                                    textarea
                                    name="description"
                                    placeholder="description..."
                                    label="Description"
                                />
                            </Box>

                            <Stack isInline justify="space-between" mt="5">
                                <Text fontWeight="semibold" fontSize="md" p={2}>
                                    Category
                                </Text>
                                <Field name="category" as="select" className="input">
                                    select
                                    {catProduct.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </Field>
                            </Stack>

                            <Button
                                mt={10}
                                type="submit"
                                isLoading={isSubmitting}
                                bg="blue.400"
                            >
                                Add Product
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default AddAndEditProductTier
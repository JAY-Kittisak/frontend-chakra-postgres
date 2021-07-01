import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import InputField from '../../components/InputField'
import { SelectControl } from '../../components/Selectfield'
import { useCreateProductByTierMutation } from '../../generated/graphql'
import { catProduct } from '../../utils/helpers'
import JoinFactory from './JoinFactory'

interface Props {
    creatorId: number
    creatorName: string
    setOpenProductForm: (open: boolean) => void
}

const AddAndEditProductTier: React.FC<Props> = ({ creatorId, creatorName, setOpenProductForm }) => {
    const [{ data }, createProductByTier] = useCreateProductByTierMutation()
    const [showJoin, setShowJoin] = useState(false)

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
                <Heading as="h3" size="lg" color="blue.400" mb="3">Add a new product</Heading>
                <Formik
                    initialValues={{ creatorId, creatorName, productName: "", description: "", category: "" }}
                    onSubmit={async (values) => {
                        const { error } = await createProductByTier({ input: values })
                        if (error) {
                            alert("แจ้ง IT support")
                        } else {
                            setShowJoin(true)
                        }
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
                                <SelectControl
                                    name="category"
                                    defaultValue=""
                                >
                                    {catProduct.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </SelectControl>
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
                {data?.createProductByTier.id && showJoin &&
                    <JoinFactory productId={data?.createProductByTier.id} setOpenProductForm={setOpenProductForm} />
                }
            </div>
        </>
    )
}

export default AddAndEditProductTier
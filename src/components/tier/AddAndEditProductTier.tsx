import { Box, Button, Heading, Select, Stack, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import InputField from '../../components/InputField'
import { catProduct } from '../../utils/helpers'

interface Props {
    factoryId: number
    factoryName: string | undefined
    setOpenProductForm: (open: boolean) => void
}

const AddAndEditProductTier: React.FC<Props> = ({ factoryId, factoryName, setOpenProductForm }) => {
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
                    initialValues={{ factoryId, factoryName, title: "", text: "" }}
                    onSubmit={async (values) => {
                        console.log(values)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* <InputField
                                name="factoryId"
                                placeholder="factoryId"
                                label="ID บริษัทผู้ผลิต"
                                value={factoryId}
                            />
                            <Box mt="2" mb="2">
                                <InputField
                                    name="factoryName"
                                    placeholder="factoryName"
                                    label="ชื่อบริษัทที่ผลิต"
                                    value={factoryName}
                                />
                            </Box> */}
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

                            <Stack isInline justify="space-between" mt="7">
                                <Text fontWeight="semibold" fontSize="md" my={2} mr="7">
                                    Category
                                </Text>
                                <Select
                                    defaultValue="อิเล็กทรอนิกส์"
                                >
                                    <option style={{ display: "none" }}></option>
                                    {catProduct.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </Select>
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
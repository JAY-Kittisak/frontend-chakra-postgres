import React from 'react'
import { Box, Button, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import InputField from '../../components/InputField'
import { useJoinFactoryMutation } from '../../generated/graphql'

interface Props {
    productId: number
    setOpenProductForm: (open: boolean) => void
}

const JoinFactory: React.FC<Props> = ({ productId, setOpenProductForm }) => {
    const [, createJoinFactory] = useJoinFactoryMutation()
    return (
        <Box mt="3">
            <Heading as="h3" size="lg" color="blue.400" mb="3" mt="3">เพิ่มบริษัท</Heading>
            <Formik
                initialValues={{ productId, factoryId: 0 }}
                onSubmit={async (values) => {
                    console.log(values)
                    const { error } = await createJoinFactory({ input: values })
                    if (error) {
                        alert("แจ้ง IT support")
                    } else {
                        setOpenProductForm(false)
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            type="number"
                            name="productId"
                            value={productId}
                            label="Product ID ที่คุณสร้าง"
                        />
                        <Box mt={4}>
                            <InputField
                                type="number"
                                name="factoryId"
                                placeholder="เลขจดทะเบียนโรงงาน"
                                label="*เลขจดทะเบียนโรงงาน ที่เราผลิดให้"
                            />
                        </Box>
                        <Button
                            mt={10}
                            type="submit"
                            isLoading={isSubmitting}
                            bg="teal"
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default JoinFactory
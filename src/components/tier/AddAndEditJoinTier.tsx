import React from 'react'
import { Button, Heading, Box } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import InputField from '../../components/InputField'
import { useJoinFactoryMutation } from '../../generated/graphql'

interface Props {
    productId: number
    setOpenJoinForm: (open: boolean) => void
}

const AddAndEditJoinTier: React.FC<Props> = ({ productId, setOpenJoinForm }) => {
    const [, createJoinFactory] = useJoinFactoryMutation()
    return (
        <>
            <div
                className="backdrop"
                onClick={() => {
                    setOpenJoinForm(false)
                }}
            >
                {' '}
            </div>
            <div className="modal--tier modal--add-product">
                <div
                    className="modal-close"
                    onClick={() => {
                        setOpenJoinForm(false)
                    }}>
                    &times;
                </div>
                <Heading as="h3" size="lg" color="blue.400" mb="3">เพิ่มบริษัท</Heading>
                <Formik
                    initialValues={{ productId, factoryId: 0 }}
                    onSubmit={async (values) => {
                        console.log(values)
                        const { error } = await createJoinFactory({ input: values })
                        if (error) {
                            alert("แจ้ง IT support")
                        } else {
                            setOpenJoinForm(false)
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
            </div>
        </>
    )
}

export default AddAndEditJoinTier
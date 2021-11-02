import React, { useRef } from 'react'
import {
    Button,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import InputField from '../../components/InputField'
import { useJoinFactoryMutation } from '../../generated/graphql'

interface Props {
    productId: number
    Open: boolean
    setOpenJoinForm: (open: boolean) => void
}

const AddAndEditJoinTier: React.FC<Props> = ({ productId, setOpenJoinForm, Open }) => {
    const cancelRef = useRef();
    const [, createJoinFactory] = useJoinFactoryMutation()

    return (
        <>
            <Formik
                initialValues={{ productId, factoryId: 0 }}
                onSubmit={async (values) => {
                    console.log(values)
                    const { error } = await createJoinFactory({ input: values })
                    if (error) {
                        alert("แจ้ง IT support")
                    } else {
                        alert("บันทึกสำเร็จ กด F5 เพื่อทำการ Refresh หน้าเว็บ")
                        setOpenJoinForm(false)
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialog
                        isOpen={Open}
                        leastDestructiveRef={cancelRef.current}
                        onClose={() => setOpenJoinForm(false)}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="xl" fontWeight="bold">
                                    เพิ่มบริษัท
                                </AlertDialogHeader>
                                <ModalCloseButton />
                                <Form>
                                    <AlertDialogBody>
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
                                    </AlertDialogBody>
                                    <AlertDialogFooter justifyContent="center">
                                        <Button
                                            w="50%"
                                            type="submit"
                                            isLoading={isSubmitting}
                                            colorScheme="blue"
                                        >
                                            Submit
                                        </Button>
                                    </AlertDialogFooter>
                                </Form>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                )}
            </Formik>
        </>
    )
}

export default AddAndEditJoinTier
import React, { useRef } from 'react'
import {
    Button, AlertDialog, AlertDialogBody, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import InputField from '../InputField'
import { 
    useCreateSalesQuotationMutation,
    FieldError,
} from '../../generated/graphql';
import { toErrorMap } from "../../utils/toErrorMap";

interface Props {
    Open: boolean
    setOpen: () => void
    visitId: number
}

const AddQuotation: React.FC<Props> = ({ Open, setOpen, visitId }) => {
    const [, createSalesQuotation] = useCreateSalesQuotationMutation()
    const cancelRef = useRef();

    return (
        <AlertDialog
            size="sm"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
            isCentered
        >
            <Formik
                initialValues={{
                    visitId,
                    quotationCode: "",
                    value: 0,
                }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await createSalesQuotation({ input: values })
                    if (response.data?.createSalesQuotation.errors) {
                        setErrors(
                            toErrorMap(response.data?.createSalesQuotation.errors as FieldError[])
                        )
                    } else if (response.data?.createSalesQuotation.salesVisit) {
                        return setOpen()
                    }
                }}
            >{({ isSubmitting }) => (
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader textAlign='center' fontSize="lg" fontWeight="bold">
                            เพิ่มใบเสนอราคา
                        </AlertDialogHeader>
                        <ModalCloseButton />

                        <Form>
                            <AlertDialogBody textAlign='center'>
                                <InputField
                                    name="quotationCode"
                                    label="เลขที่ใบเสนอราคา :"
                                />
                                <InputField
                                    type="number"
                                    name="value"
                                    label="มูลค่า :"
                                />
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button
                                    isLoading={isSubmitting}
                                    colorScheme="teal"
                                    type="submit"
                                >
                                    Save
                                </Button>
                                <Button ml={3} ref={cancelRef.current} onClick={setOpen}>
                                    Cancel
                                </Button>
                            </AlertDialogFooter>
                        </Form>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            )}
            </Formik>
        </AlertDialog>
    )
}

export default AddQuotation
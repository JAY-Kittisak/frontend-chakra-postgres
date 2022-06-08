import React, { useRef } from 'react'
import {
    // Flex, Text, Select,
    Button, AlertDialog, AlertDialogBody, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, ModalCloseButton,
} from "@chakra-ui/react"
import { Form, Formik } from "formik"

import InputField from "../InputField"
import { selectMonth } from '../../utils/helpers'
import { useCreateSalesActualMutation } from '../../generated/graphql'

interface Props {
    Open: boolean;
    setOpen: () => void;
    branch: string | undefined
    salesRoleId: number
}

const todayNew = () => {
    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth()
    const yy = date.getFullYear()
    return `${dd} ${selectMonth[mm + 1]} ${yy}`;
}

const ActualCreateDialog: React.FC<Props> = ({ Open, setOpen, branch, salesRoleId }) => {
    const [, createActual ] = useCreateSalesActualMutation()
    const cancelRef = useRef()

    return (
        <AlertDialog
            size="md"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{ actual: 0 }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await createActual({ 
                        input : {
                            actual: values.actual,
                            salesRoleId
                        }
                    })

                    if (response.data?.createSalesActual) setOpen()
                    else setErrors({actual: "!Error ไม่สามารถบันทึกได้ โปรดแจ้งผู้ดูแลระบบ"})
                }}
            >{({ isSubmitting }) => (
                <AlertDialogOverlay>
                    <AlertDialogContent>
                            <AlertDialogHeader textAlign='center' fontSize="lg" fontWeight="bold">
                                บันทึกยอดขาย
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                            <AlertDialogBody>
                                <InputField
                                    type="number"
                                    name="actual"
                                    label={`ยอดขายของวันที่ ${todayNew()}`}
                                />
                            </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button
                                        colorScheme={branch === "ลาดกระบัง" ? "blue" : "green"}
                                        isLoading={isSubmitting}
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

export default ActualCreateDialog
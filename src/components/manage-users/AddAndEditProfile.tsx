import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box, Center, Button, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { Form, Formik } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { useUpdateUserMutation } from "../../generated/graphql";
import InputField from "../InputField";

interface Props {

}

const AddAndEditProfile: React.FC<Props> = () => {
    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const [, updateUser] = useUpdateUserMutation()

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef.current}
            onClose={onClose}
        >
            <Formik
                initialValues={{
                    fullNameTH: "",
                    fullNameEN: "",
                    nickName: "",
                    email: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await updateUser({ options: values });
                    if (response.data?.updateUser.errors) {
                        setErrors(toErrorMap(response.data.updateUser.errors));
                    } else if (response.data?.updateUser.user) {

                    }
                }}
            >
                {({ isSubmitting }) => (

                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                อัพโหลดรูปภาพของผู้ใช้
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                <Form>
                                    <InputField
                                        name="fullNameTH"
                                        label="ชื่อภาษาไทย"
                                    />
                                    <InputField
                                        name="fullNameEN"
                                        label="ชื่อภาษาอังกฤษ"
                                    />
                                    <InputField
                                        name="nickName"
                                        label="ชื่อเล่น"
                                    />
                                    <InputField
                                        name="email"
                                        label="Email"
                                    />
                                    <Center>
                                        <Button
                                            mt={4}
                                            type="submit"
                                            isLoading={isSubmitting}
                                            colorScheme="teal"
                                        >
                                            บันทึก
                                        </Button>
                                    </Center>
                                </Form>
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef.current} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" isLoading={isSubmitting} ml={3}>
                                    Submit
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                )}
            </Formik>
        </AlertDialog>
    )
}

export default AddAndEditProfile
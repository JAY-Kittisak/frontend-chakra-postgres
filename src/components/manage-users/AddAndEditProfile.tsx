import React, { useRef } from 'react'
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Form, Formik } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { useUpdateUserMutation, RegularUserFragment } from "../../generated/graphql";
import InputField from "../InputField";

interface Props {
    setOpen: () => void
    Open: boolean
    userToEdit: RegularUserFragment | null
}

const AddAndEditProfile: React.FC<Props> = ({ Open, setOpen, userToEdit }) => {
    const cancelRef = useRef()
    const [, updateUser] = useUpdateUserMutation()

    return (
        <AlertDialog
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    fullNameTH: userToEdit?.fullNameTH ? userToEdit.fullNameTH : "",
                    fullNameEN: userToEdit?.fullNameEN ? userToEdit.fullNameEN : "",
                    nickName: userToEdit?.nickName ? userToEdit.nickName : "",
                    email: userToEdit ? userToEdit.email : "",
                }}
                onSubmit={async (values, { setErrors }) => {

                    if (!userToEdit) {

                        const response = await updateUser({ options: values });
                        if (response.data?.updateUser.errors) {
                            setErrors(toErrorMap(response.data.updateUser.errors));
                        } else if (response.data?.updateUser.user) {
                            setOpen()
                        }
                    } else if (userToEdit) {

                        const { fullNameEN, fullNameTH, nickName, email } = userToEdit

                        const isNotEdited =
                            fullNameEN === values.fullNameEN &&
                            fullNameTH === values.fullNameTH &&
                            nickName === values.nickName &&
                            email === values.email
                        if (isNotEdited) return setOpen()

                        const response = await updateUser({ options: values });
                        if (response.data?.updateUser.errors) {
                            setErrors(toErrorMap(response.data.updateUser.errors));
                        } else if (response.data?.updateUser.user) {
                            setOpen()
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                อัพโหลดรูปภาพของผู้ใช้
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
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
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                    <Button ref={cancelRef.current} onClick={setOpen}>
                                    Cancel
                                </Button>
                                    <Button colorScheme="blue" isLoading={isSubmitting} type="submit" ml={3}>
                                        Save
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

export default AddAndEditProfile
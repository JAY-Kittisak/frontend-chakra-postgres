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
import InputField from "../InputField";
import { toErrorMap } from '../../utils/toErrorMap'
import { RegularGiveFragment, useCreateGiveMutation, FieldError } from "../../generated/graphql";

interface Props {
    Open: boolean
    setOpen: () => void
    giveToEdit: RegularGiveFragment | null
}

const AddAndEditGive: React.FC<Props> = ({ Open, setOpen, giveToEdit }) => {
    const cancelRef = useRef()
    const [, createGive] = useCreateGiveMutation()

    return (
        <AlertDialog
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    giveName: giveToEdit ? giveToEdit.giveName : "",
                    details: giveToEdit?.details ? giveToEdit.details : "",
                    price: giveToEdit?.price ? giveToEdit.price : 0,
                    inventory: giveToEdit?.inventory ? giveToEdit.inventory : 0,
                    category: giveToEdit?.category ? giveToEdit.category : "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    if (!giveToEdit) {

                        const response = await createGive({ input: values });
                        if (response.data?.createGive.errors) {
                            setErrors(toErrorMap(response.data.createGive.errors as FieldError[]))
                        } else if (response.data?.createGive.give) {
                            setOpen()
                            alert("AlertDialogs TEST.")
                        }

                    } else if (giveToEdit) {

                        const { giveName, details, price, inventory, category } = giveToEdit

                        const isNotEdited =
                            giveName === values.giveName &&
                            details === values.details &&
                            price === values.price &&
                            inventory === values.inventory &&
                            category === values.category

                        if (isNotEdited) return

                        const response = await createGive({ input: values });
                        if (response.data?.createGive.errors) {
                            console.log(response.data.createGive.errors)
                        } else if (response.data?.createGive.give) {
                            setOpen()
                            alert("AlertDialogs1 TEST.")
                        }

                    }

                    // const response = await updateUser({ options: values });
                    // const teten = values.price
                    // console.log(typeof (+teten), +teten)
                    // if (response.data?.updateUser.errors) {
                    //     setErrors(toErrorMap(response.data.updateUser.errors));
                    // } else if (response.data?.updateUser.user) {
                    //     setOpen()
                    // }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                เพิ่มของแจกลูกค้า
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
                                    <InputField
                                        name="giveName"
                                        label="Name"
                                    />
                                    <InputField
                                        name="details"
                                        label="Details"
                                    />
                                    <InputField
                                        type="number"
                                        name="price"
                                        label="Price"
                                    />
                                    <InputField
                                        type="number"
                                        name="inventory"
                                        label="Inventory"
                                    />
                                    <InputField
                                        name="category"
                                        label="Category"
                                    />
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef.current} onClick={setOpen} >
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

export default AddAndEditGive
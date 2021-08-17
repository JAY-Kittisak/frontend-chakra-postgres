import React, { useRef } from 'react'
import {
    Text,
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
import { SelectControl } from "../Selectfield"
import { catGive } from "../../utils/helpers"
import { toErrorMap } from '../../utils/toErrorMap'
import { RegularGiveFragment, useCreateGiveMutation, useUpdateGiveMutation, FieldError } from "../../generated/graphql";

interface Props {
    Open: boolean
    setOpen: () => void
    giveToEdit: RegularGiveFragment | null
}

const AddAndEditGive: React.FC<Props> = ({ Open, setOpen, giveToEdit }) => {
    const cancelRef = useRef()
    const [, createGive] = useCreateGiveMutation()
    const [, updateGive] = useUpdateGiveMutation()

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
                    if (values.category === "เลือกกลุ่มสินค้า") return alert("เลือก Category")

                    if (!giveToEdit) {

                        const response = await createGive({ input: values });
                        if (response.data?.createGive.errors) {
                            setErrors(toErrorMap(response.data.createGive.errors as FieldError[]))
                        } else if (response.data?.createGive.give) {
                            setOpen()
                        }

                    } else if (giveToEdit) {
                        const { id, giveName, details, price, inventory, category } = giveToEdit
                        const isNotEdited =
                            giveName === values.giveName &&
                            details === values.details &&
                            price === values.price &&
                            inventory === values.inventory &&
                            category === values.category

                        if (isNotEdited) return setOpen()

                        const response = await updateGive({ id, input: values });
                        if (response.data?.updateGive.errors) {
                            setErrors(toErrorMap(response.data.updateGive.errors as FieldError[]))
                        } else if (response.data?.updateGive.give) {
                            setOpen()
                        }
                    }
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
                                        placeholder="name"
                                        label="Name"
                                    />
                                    <InputField
                                        textarea
                                        name="details"
                                        placeholder="details..."
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
                                    <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="2">
                                        Category
                                    </Text>
                                    <SelectControl name="category">
                                        {catGive.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </SelectControl>
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
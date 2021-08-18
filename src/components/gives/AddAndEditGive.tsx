import React, { useState, useRef, ChangeEvent } from 'react'
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
    Input,
} from '@chakra-ui/react'
import { Form, Formik } from "formik";
import InputField from "../InputField";
import { SelectControl } from "../Selectfield"
import { catGive, fileType } from "../../utils/helpers"
import { toErrorMap } from '../../utils/toErrorMap'
import { RegularGiveFragment, useCreateGiveMutation, useUpdateGiveMutation, FieldError } from "../../generated/graphql";

interface Props {
    Open: boolean
    setOpen: () => void
    giveToEdit: RegularGiveFragment | null
}

const AddAndEditGive: React.FC<Props> = ({ Open, setOpen, giveToEdit }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [errorImage, setErrorImage] = useState(false)
    const [errMessage, setErrMessage] = useState<FieldError[]>()

    const cancelRef = useRef()

    const [, createGive] = useCreateGiveMutation()
    const [, updateGive] = useUpdateGiveMutation()


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || !files[0]) return

        const file = files[0]

        if (!fileType.includes(file.type)) {
            alert('Wrong file format, allow only "png" or "jpeg" or "jpg"')
            return
        }
        setSelectedFile(file)
    }

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

                    // if (selectedFile) {
                    //     const sizeImage = await selectedFile.size >= 100000
                    //     if (sizeImage) setErrorImage(true)
                    // }


                    if (!giveToEdit) {

                        const response = await createGive({ input: values, options: selectedFile });
                        if (response.data?.createGive.errors) {
                            setErrors(toErrorMap(response.data.createGive.errors as FieldError[]))
                            setErrMessage(response.data.createGive.errors as FieldError[])
                            setErrorImage(true)
                        } else if (response.data?.createGive.give) {
                            setErrorImage(false)
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

                                    <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="2">
                                        Add Image
                                    </Text>
                                    <Input type="file" p="1" onChange={handleFileChange} />
                                    {errorImage &&
                                        <>
                                            <Text color="yellow.400" p="3">
                                                Warning:!! ขนาดไฟล์ของคุณคือ {selectedFile?.size}
                                                KB. ซึ่งใหญ่เกิน 100000 KB.
                                            </Text>
                                            <Text color="red.400">
                                                {errMessage}
                                            </Text>
                                        </>
                                    }
                                    {selectedFile && (
                                        <Button
                                            colorScheme="teal"
                                            onClick={async () => {
                                                if (selectedFile.size >= 100000) {
                                                    setErrorImage(true)
                                                }

                                            }} ml={3}>
                                            Save
                                        </Button>
                                    )}
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



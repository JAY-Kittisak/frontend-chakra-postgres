import React, { useState, useRef } from "react";
import {
    Flex,
    Text,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../InputField";
import { SelectControl } from "../Selectfield";
import { catGive, fileType } from "../../utils/helpers";
import { toErrorMap } from "../../utils/toErrorMap";
import {
    RegularGiveCdcFragment,
    useCreateGiveCdcMutation,
    useUpdateGiveCdcMutation,
    FieldError,
} from "../../generated/graphql";

interface Props {
    Open: boolean;
    setOpen: () => void;
    giveToEdit: RegularGiveCdcFragment | null;
}

const AddAndEditGiveCdc: React.FC<Props> = ({ Open, setOpen, giveToEdit }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorImage, setErrorImage] = useState(false);

    const cancelRef = useRef();

    const [, createGive] = useCreateGiveCdcMutation();
    const [, updateGive] = useUpdateGiveCdcMutation();

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
                    if (values.category === "เลือกกลุ่มสินค้า") return alert("เลือก Category");
                    if (values.category === "") return alert("เลือก Category");

                    if (!giveToEdit) {
                        if (!selectedFile) return alert("เลือกรูปภาพที่ต้องการ Upload");

                        if (selectedFile.size >= 5000000) {
                            setErrorImage(true);
                        }

                        const response = await createGive({
                            input: values,
                            options: selectedFile,
                        });

                        if (response.data?.createGiveCdc.errors) {
                            setErrorImage(false);
                            setErrors(
                                toErrorMap(response.data.createGiveCdc.errors as FieldError[])
                            );
                        } else if (response.data?.createGiveCdc.give) {
                            setErrorImage(false);
                            setOpen();
                        }
                    } else if (giveToEdit) {
                        const { id, giveName, details, price, inventory, category } =
                            giveToEdit;
                        const isNotEdited =
                            giveName === values.giveName &&
                            details === values.details &&
                            price === values.price &&
                            inventory === values.inventory &&
                            category === values.category;

                        if (isNotEdited) return setOpen();

                        const response = await updateGive({ id, input: values });
                        if (response.data?.updateGiveCdc.errors) {
                            setErrors(
                                toErrorMap(response.data.updateGiveCdc.errors as FieldError[])
                            );
                        } else if (response.data?.updateGiveCdc.give) {
                            setOpen();
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
                                    <InputField name="giveName" placeholder="name" label="Name" />
                                    <InputField
                                        textarea
                                        name="details"
                                        placeholder="details..."
                                        label="Details"
                                    />
                                    <InputField type="number" name="price" label="Price" />
                                    <InputField
                                        type="number"
                                        name="inventory"
                                        label="Inventory"
                                    />
                                    <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="2">
                                        Category
                                    </Text>
                                    <SelectControl
                                        name="category"
                                        defaultValue="เลือกกลุ่มสินค้า"
                                    >
                                        {catGive.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </SelectControl>
                                    {!giveToEdit &&
                                        <Flex flexDir="column">
                                            <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="2">
                                                Image
                                            </Text>
                                            <input
                                                name="imageUrl"
                                                type="file"
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    if (!files || !files[0]) return;
                                                    const file = files[0];
                                                    if (!fileType.includes(file.type)) {
                                                        alert(
                                                            'Wrong file format, allow only "png" or "jpeg" or "jpg"'
                                                        );
                                                        return;
                                                    }
                                                    setSelectedFile(file);
                                                }}
                                            />
                                        </Flex>}
                                    {errorImage && (
                                        <>
                                            <Text color="yellow.400" p="3">
                                                Warning:!! ขนาดไฟล์ของคุณคือ {selectedFile?.size}
                                                KB. ซึ่งใหญ่เกิน 5000000 KB.
                                            </Text>
                                        </>
                                    )}
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef.current} onClick={setOpen}>
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="green"
                                        isLoading={isSubmitting}
                                        type="submit"
                                        ml={3}
                                    >
                                        Save
                                    </Button>
                                </AlertDialogFooter>
                            </Form>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                )}
            </Formik>
        </AlertDialog>
    );
};

export default AddAndEditGiveCdc;

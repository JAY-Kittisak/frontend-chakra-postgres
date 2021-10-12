import React, { useState, useRef } from "react";
import {
    Flex,
    Text,
    Button,
    Input,
    Icon,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Search2Icon } from "@chakra-ui/icons";
import { RegularStockItFragment, useCreateStockItMutation, FieldError, } from "../../generated/graphql";

import InputField from "../InputField";
import {
    fileType,
    locationStock,
    itemIt,
    brandItemIt,
    warrantyIt,
} from "../../utils/helpers";
import { toErrorMap } from "../../utils/toErrorMap";
import SelectControl from "../Selectfield";

interface Props {
    Open: boolean;
    setOpen: () => void;
    stockToEdit: RegularStockItFragment | null;
}

const AddAndEditStockIt: React.FC<Props> = ({ Open, setOpen, stockToEdit }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [
        errorImage,
        setErrorImage
    ] = useState(false);
    const [searchCat, setSearchCat] = useState("");
    // const [status, setStatus] = useState("");
    const cancelRef = useRef();

    const [, createStockIt] = useCreateStockItMutation();

    return (
        <AlertDialog
            size="4xl"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    itemName: stockToEdit ? stockToEdit.itemName : "",
                    details: stockToEdit ? stockToEdit.details : "",
                    location: stockToEdit ? stockToEdit.location : "Stock IT",
                    serialNum: stockToEdit ? stockToEdit.serialNum : "",
                    warranty: stockToEdit ? stockToEdit.warranty : "ประกัน 1 ปี",
                    price: stockToEdit ? stockToEdit.price : 0,
                    branch: stockToEdit ? stockToEdit.branch : "ลาดกระบัง",
                    brand: stockToEdit ? stockToEdit.brand : "MICROSOFT",
                    category: stockToEdit ? stockToEdit.category : "Battery UPS",
                }}
                onSubmit={async (values, { setErrors }) => {
                    // if (!stockToEdit) {
                        // if (!selectedFile) return alert("เลือกรูปภาพที่ต้องการ Upload");

                        // if (selectedFile.size >= 5000000) {
                        //     setErrorImage(true);
                        // }

                    const response = await createStockIt({
                        input: values,
                        // options: selectedFile,
                    });

                    if (response.data?.createStockIt.errors) {
                        setErrorImage(false);
                        setErrors(
                            toErrorMap(response.data.createStockIt.errors as FieldError[])
                        );
                        alert("errors");
                    } else if (response.data?.createStockIt.stockIt) {
                        setErrorImage(false);
                        setOpen();
                        alert("stockIt");
                    }
                    // }
                    //  else if (stockToEdit) {
                    //     const { id, details, price, category } = stockToEdit;
                    //     const isNotEdited =
                    //         details === values.details &&
                    //         price === values.price &&
                    //         category === values.category;

                    //     if (isNotEdited) return setOpen();

                    //     const response = await updateGive({ id, input: values });
                    //     if (response.data?.updateGive.errors) {
                    //         setErrors(
                    //             toErrorMap(response.data.updateGive.errors as FieldError[])
                    //         );
                    //     } else if (response.data?.updateGive.give) {
                    //         setOpen();
                    //     }
                    // }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Add item in stock IT.
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
                                    <Flex>
                                        <Flex flexDir="column" w="50%">
                                            <InputField
                                                name="itemName"
                                                placeholder="Item Name"
                                                label="Item Name"
                                            />
                                            <InputField
                                                textarea
                                                name="details"
                                                placeholder="details..."
                                                label="Details"
                                            />
                                            <InputField
                                                name="serialNum"
                                                placeholder="S/N"
                                                label="Serial Number"
                                            />
                                            <InputField
                                                name="price"
                                                placeholder="ราคา"
                                                label="Price"
                                            />

                                            {!stockToEdit && (
                                                <Flex flexDir="column">
                                                    <Text
                                                        fontWeight="semibold"
                                                        fontSize={["sm", "md"]}
                                                        mb="2"
                                                    >
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
                                                </Flex>
                                            )}
                                        </Flex>
                                        <Flex flexDir="column" w="50%" ml="5">
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                            >
                                                Location
                                            </Text>

                                            <SelectControl name="location">
                                                {locationStock.map((value, i) => (
                                                    <option key={i} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </SelectControl>

                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                            >
                                                Warranty
                                            </Text>

                                            <SelectControl name="warranty">
                                                {warrantyIt.map((value, i) => (
                                                    <option key={i} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </SelectControl>
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                            >
                                                Brand
                                            </Text>

                                            <SelectControl name="brand">
                                                {brandItemIt.map((value, i) => (
                                                    <option key={i} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </SelectControl>

                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                            >
                                                Branch
                                            </Text>

                                            <SelectControl name="branch">
                                                <option value="ลาดกระบัง">ลาดกระบัง</option>
                                                <option value="ชลบุรี">ชลบุรี</option>
                                            </SelectControl>

                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                            >
                                                Category
                                            </Text>
                                            <Flex p="1">
                                                {itemIt && (
                                                    <SelectControl name="category">
                                                        {itemIt
                                                            .filter((val) => {
                                                                if (searchCat === "") {
                                                                    return val;
                                                                } else if (
                                                                    val
                                                                        .toLowerCase()
                                                                        .includes(searchCat.toLowerCase())
                                                                ) {
                                                                    return val;
                                                                }
                                                                return false;
                                                            })
                                                            .map((val, i) => (
                                                                <option key={i} value={val}>
                                                                    {val}
                                                                </option>
                                                            ))}
                                                    </SelectControl>
                                                )}

                                                <Flex p="3">
                                                    <Icon as={Search2Icon} />
                                                </Flex>
                                                <Input
                                                    ml="-2"
                                                    w="150px"
                                                    className="searchInput"
                                                    type="text"
                                                    placeholder="Search..."
                                                    onChange={(event) => {
                                                        setSearchCat(event.target.value);
                                                    }}
                                                />
                                            </Flex>

                                            {errorImage && (
                                                <>
                                                    <Text color="yellow.400" p="3">
                                                        Warning:!! ขนาดไฟล์ของคุณคือ {selectedFile?.size}
                                                        KB. ซึ่งใหญ่เกิน 500000 KB.
                                                    </Text>
                                                </>
                                            )}
                                        </Flex>
                                    </Flex>
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

export default AddAndEditStockIt;

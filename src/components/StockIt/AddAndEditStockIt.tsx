import React, {
    useState,
    useRef
} from "react";
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
import {
    useCreateStockItMutation,
    FieldError,
    RegularStockItFragment,
    useUpdateStockItMutation
} from "../../generated/graphql";

import InputField from "../InputField";
import {
    fileType,
    locationStock,
    itemIt,
    brandItemIt,
    warrantyIt,
    crStatus
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

    const cancelRef = useRef();

    const [, createStockIt] = useCreateStockItMutation();
    const [, updateStockIt] = useUpdateStockItMutation();

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
                    detail: stockToEdit ? stockToEdit.detail : "",
                    location: stockToEdit ? stockToEdit.location : "Stock IT",
                    serialNum: stockToEdit ? stockToEdit.serialNum : "",
                    warranty: stockToEdit ? stockToEdit.warranty : "ประกัน 1 ปี",
                    price: stockToEdit ? stockToEdit.price : 0,
                    branch: stockToEdit ? stockToEdit.branch : "ลาดกระบัง",
                    brand: stockToEdit ? stockToEdit.brand : "MICROSOFT",
                    category: stockToEdit ? stockToEdit.category : "Battery UPS",
                    currentStatus: stockToEdit ? stockToEdit.currentStatus : "ว่าง",
                }}
                onSubmit={async (values, { setErrors }) => {
                    if (!stockToEdit) {
                        if (!selectedFile) return alert("เลือกรูปภาพที่ต้องการ Upload");

                        if (selectedFile.size >= 5000000) {
                            setErrorImage(true);
                        }

                        const response = await createStockIt({
                            input: values,
                            options: selectedFile,
                        });

                        if (response.data?.createStockIt.errors) {
                            setErrorImage(false);
                            setErrors(
                                toErrorMap(response.data.createStockIt.errors as FieldError[])
                            );
                        } else if (response.data?.createStockIt.stockIt) {
                            setErrorImage(false);
                            setOpen();
                        }
                    } else if (stockToEdit) {
                        const isNotEdited =
                            stockToEdit.itemName === values.itemName &&
                            stockToEdit.detail === values.detail &&
                            stockToEdit.location === values.location &&
                            stockToEdit.serialNum === values.serialNum &&
                            stockToEdit.warranty === values.warranty &&
                            stockToEdit.price === values.price &&
                            stockToEdit.branch === values.branch &&
                            stockToEdit.brand === values.brand &&
                            stockToEdit.category === values.category &&
                            stockToEdit.currentStatus === values.currentStatus

                        if (isNotEdited) return setOpen();

                        const response = await updateStockIt({ id: stockToEdit.id, input: values });
                        if (response.data?.updateStockIt.errors) {
                            setErrors(toErrorMap(response.data.updateStockIt.errors as FieldError[]));
                        } else if (response.data?.updateStockIt.stockIt) {
                            setOpen();
                        }

                    }
                }
                }
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
                                                name="detail"
                                                placeholder="detail..."
                                                label="Detail"
                                            />
                                            <InputField
                                                name="serialNum"
                                                placeholder="S/N"
                                                label="Serial Number"
                                            />
                                            {/* FIXME: ถ้าเป็น Number ต้องใส่ type="number" */}
                                            <InputField
                                                type="number"
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
                                            {itemIt && (
                                                <SelectControl name="category">
                                                    {itemIt.map((val, i) => (
                                                        <option key={i} value={val}>
                                                            {val}
                                                        </option>
                                                    ))}
                                                </SelectControl>
                                            )}
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                            >
                                                Current Status
                                            </Text>

                                            <SelectControl name="currentStatus">
                                                {crStatus.map((value, i) => (
                                                    <option key={i} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </SelectControl>
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

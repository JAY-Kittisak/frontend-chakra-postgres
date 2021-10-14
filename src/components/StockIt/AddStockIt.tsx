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
import { useCreateStockItMutation, FieldError, } from "../../generated/graphql";

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
}

const AddStockIt: React.FC<Props> = ({ Open, setOpen }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [
        errorImage,
        setErrorImage
    ] = useState(false);

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
                    itemName: "",
                    details: "",
                    location: "Stock IT",
                    serialNum: "",
                    warranty: "ประกัน 1 ปี",
                    price: 0,
                    branch: "ลาดกระบัง",
                    brand: "MICROSOFT",
                    category: "Battery UPS",
                }}
                onSubmit={async (values, { setErrors }) => {
                    if (!selectedFile) return alert("เลือกรูปภาพที่ต้องการ Upload");

                    if (selectedFile.size >= 5000000) {
                        setErrorImage(true);
                    }
                    console.table(values)

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
                                                name="details"
                                                placeholder="details..."
                                                label="Details"
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

export default AddStockIt;

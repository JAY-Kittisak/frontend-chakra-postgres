import React, {
    // useState,
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
    RegularStockItFragment,
    //  FieldError
} from "../../generated/graphql";

import {
    locationStock,
    itemIt,
    brandItemIt,
    warrantyIt,
    holdItem,
    catStatus,
} from "../../utils/helpers";
import InputField from "../InputField";
// import { toErrorMap } from "../../utils/toErrorMap";
import SelectControl from "../Selectfield";

interface Props {
    Open: boolean;
    setOpenEdit: () => void;
    stockToEdit: RegularStockItFragment | null;
}

const EditStockIt: React.FC<Props> = ({ Open, setOpenEdit, stockToEdit }) => {
    const cancelRef = useRef();


    return (
        <AlertDialog
            size="4xl"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpenEdit}
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
                    holdStatus: stockToEdit ? stockToEdit.holdStatus : "ว่าง",
                    status: stockToEdit ? stockToEdit.status : "New",
                    useById: stockToEdit ? stockToEdit.useById : 0,
                }}
                onSubmit={async (
                    values,
                    // { setErrors}
                ) => {
                    console.table(values)

                    // const response = await createStockIt({
                    //     input: values
                    // });

                    // if (response.data?.createStockIt.errors) {
                    //     setErrorImage(false);
                    //     setErrors(
                    //         toErrorMap(response.data.createStockIt.errors as FieldError[])
                    //     );
                    //     alert("errors");
                    // } else if (response.data?.createStockIt.stockIt) {
                    //     setErrorImage(false);
                    //     setOpenEdit();
                    //     alert("stockIt");
                    // }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Edit item in stock IT.
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
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                            >
                                                สถานะ Item
                                            </Text>
                                            <Flex justify="space-between">
                                                <SelectControl name="holdStatus">
                                                    {holdItem.map((value, i) => (
                                                        <option key={i} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </SelectControl>
                                                {stockToEdit?.holdStatus !== "ว่าง" && (
                                                    <Text
                                                        as="u"
                                                        w="500px"
                                                        fontWeight="semibold"
                                                        fontSize={["sm", "md"]}
                                                        my="2"
                                                        ml="3"
                                                    >
                                                        โดย {stockToEdit?.useBy?.departments}
                                                    </Text>
                                                )}
                                            </Flex>
                                            <InputField
                                                type="number"
                                                name="useById"
                                                placeholder="ID User"
                                                label="ID User ที่ใช้งาน Item นี้อยู่*(ไม่จำเป็นต้องใส่)"
                                            />
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
                                            <Flex flexDir="column" p="3" mt="4" bg="blue.400" rounded="7px" boxShadow="md">
                                                <Text
                                                    fontWeight="bold"
                                                    fontSize={["sm", "xl"]}
                                                    mb="2"
                                                    color="white"
                                                >
                                                    สถานะ Job
                                                </Text>
                                                <SelectControl name="status">
                                                    {catStatus.map((value, i) => (
                                                        <option key={i} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </SelectControl>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef.current} onClick={setOpenEdit}>
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
    )
}

export default EditStockIt
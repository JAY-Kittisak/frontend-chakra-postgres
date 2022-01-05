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
    FieldError,
    // RegularSalesRoleFragment,
    useCreateSalesRoleMutation
} from "../../generated/graphql";

import InputField from "../InputField";
import SelectControl from "../Selectfield";
// import {
//     locationStock,
//     itemIt,
//     brandItemIt,
//     warrantyIt,
//     crStatus
// } from "../../utils/helpers";
import { toErrorMap } from "../../utils/toErrorMap";
import { salesChannel } from "../../utils/helpers";
// import SelectControl from "../Selectfield";

interface Props {
    Open: boolean;
    setOpen: () => void;
    // stockToEdit: RegularStockItFragment | null;
}

const AddAndEditRole: React.FC<Props> = ({ Open, setOpen }) => {

    const cancelRef = useRef();
    const [, createSalesRole] = useCreateSalesRoleMutation();

    return (
        <AlertDialog
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    salesRole: "",
                    channel: "Cutting 1",
                    userId: 0,
                    branch: "ลาดกระบัง",
                    status: "ใช้งาน",
                }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values)
                    const response = await createSalesRole({
                        input: values,
                    });

                    if (response.data?.createSalesRole.errors) {
                        setErrors(
                            toErrorMap(response.data.createSalesRole.errors as FieldError[])
                        );
                    } else if (response.data?.createSalesRole.salesRoles) {
                        setOpen();
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay size="xs">
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                เพิ่ม/แก้ไขบทบาท Sales
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
                                    <Flex flexDir="column">
                                        <InputField
                                            name="salesRole"
                                            placeholder="Sales..."
                                            label="Sales Role"
                                        />
                                        <Flex className="plus-div-mgl">
                                            <InputField
                                                name="userId"
                                                placeholder="id..."
                                                label="User ID"
                                            />
                                            <Flex flexDir="column" w="100%">
                                                <Text
                                                    fontWeight="semibold"
                                                    fontSize={["sm", "md"]}
                                                    mb="2"
                                                    mt="3"
                                                >
                                                    Channel
                                                </Text>
                                                <SelectControl name="channel">
                                                    {salesChannel.map((item, i) => (
                                                        <option key={i} value={item}>{item}</option>
                                                    ))}
                                                </SelectControl>
                                            </Flex>
                                        </Flex>
                                        <Flex className="plus-div-mgl">
                                            <Flex flexDir="column" w="100%">
                                                <Text
                                                    fontWeight="semibold"
                                                    fontSize={["sm", "md"]}
                                                    mb="2"
                                                    mt="1"
                                                >
                                                    Branch
                                                </Text>
                                                <SelectControl name="branch">
                                                    <option value="ลาดกระบัง">ลาดกระบัง</option>
                                                    <option value="ชลบุรี">ชลบุรี</option>
                                                </SelectControl>
                                            </Flex>
                                            <Flex flexDir="column" w="100%">
                                                <Text
                                                    fontWeight="semibold"
                                                    fontSize={["sm", "md"]}
                                                    mb="2"
                                                    mt="1"
                                                >
                                                    Status
                                                </Text>
                                                <SelectControl name="status">
                                                    <option value="ใช้งาน">ใช้งาน</option>
                                                    <option value="ว่าง">ว่าง</option>
                                                </SelectControl>
                                            </Flex>
                                            {/* {!stockToEdit && (
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
                                            )} */}
                                        </Flex>
                                    </Flex>
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button
                                        colorScheme="green"
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                    <Button ml={3} ref={cancelRef.current} onClick={setOpen}>
                                        Cancel
                                    </Button>
                                </AlertDialogFooter>
                            </Form>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                )}
            </Formik>
        </AlertDialog >
    );
}

export default AddAndEditRole
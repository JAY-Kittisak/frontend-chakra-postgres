import React from "react";
import {
    Box,
    Button,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../../components/InputField";
import { useJoinFactoryMutation } from "../../generated/graphql";

interface Props {
    productId: number;
    setOpenProductForm: (open: boolean) => void;
}

const JoinFactory: React.FC<Props> = ({ productId, setOpenProductForm }) => {
    const [, createJoinFactory] = useJoinFactoryMutation();
    return (
        <Formik
            initialValues={{ productId, factoryId: 0 }}
            onSubmit={async (values) => {
                console.log(values);
                const { error } = await createJoinFactory({ input: values });
                if (error) {
                    alert("แจ้ง IT support");
                } else {
                    setOpenProductForm(false);
                    alert("ทำการบันทึกเรียบร้อยโปรด Reface หน้าเว็บหรือกด F5");
                }
            }}
        >
            {({ isSubmitting }) => (
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            เพิ่มบริษัทที่รับสินค้า
                        </AlertDialogHeader>

                        <ModalCloseButton />
                        <Form>
                            <AlertDialogBody>
                                <InputField
                                    type="number"
                                    name="productId"
                                    value={productId}
                                    label="Product ID ที่คุณสร้าง"
                                />
                                <Box mt={4}>
                                    <InputField
                                        type="number"
                                        name="factoryId"
                                        placeholder="เลขจดทะเบียนโรงงาน"
                                        label="*เลขจดทะเบียนโรงงาน ที่เราผลิดให้"
                                    />
                                </Box>
                            </AlertDialogBody>

                            <AlertDialogFooter>
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
    );
};

export default JoinFactory;

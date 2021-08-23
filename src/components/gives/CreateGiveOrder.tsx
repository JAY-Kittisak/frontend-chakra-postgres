import React, { useRef } from "react";
import {
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
import { useHistory } from "react-router-dom";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../InputField";
import { useCreateGiveOrderMutation, FieldError } from "../../generated/graphql";

interface Props {
    giveId: number
    amount: number
    Open: boolean;
    setOpen: () => void;
}

const CreateGiveOrder: React.FC<Props> = ({ Open, setOpen, giveId, amount }) => {
    const history = useHistory();
    const cancelRef = useRef();

    const [, createGiveOrder] = useCreateGiveOrderMutation()

    return (
        <AlertDialog
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    giveId,
                    amount,
                    customerId: 0,
                    customerDetail: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await createGiveOrder({ input: values });
                    if (response.data?.createGiveOrder.errors) {
                        setErrors(toErrorMap(response.data.createGiveOrder.errors as FieldError[]));
                    } else if (response.data?.createGiveOrder.giveOrder) {
                        setOpen()
                        history.push("/order-give/my-orders")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Create Order
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
                                    <InputField type="number" name="customerId" label="เลขจดทะเบียนโรงงาน (ไม่จำเป็น)" />
                                    <InputField textarea name="customerDetail" label="รายละเอียดการเบิกของ" />
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef.current} onClick={setOpen}>
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="blue"
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

export default CreateGiveOrder;

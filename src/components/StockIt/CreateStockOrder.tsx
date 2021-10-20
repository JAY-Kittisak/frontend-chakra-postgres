import React, { useRef } from 'react'
import {
    Box,
    Grid,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../InputField";
import { useCreateStockItOrderMutation, FieldError } from "../../generated/graphql";
import TextError from "../TextError";

interface Props {
    stockItId: number
    Open: boolean;
    setOpen: () => void;
}

const radioOptions = [
    { name: "เบิก", value: "เบิก" },
    { name: "ยืม", value: "ยืม" }
];

const CreateStockOrder: React.FC<Props> = ({ stockItId, Open, setOpen }) => {
    const history = useHistory();
    const cancelRef = useRef();

    const [, createStockItOr] = useCreateStockItOrderMutation()
    return (
        <AlertDialog
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    detail: "",
                    stockItId,
                    holdStatus: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await createStockItOr({ input: values });
                    if (response.data?.createStockItOrder.errors) {
                        setErrors(toErrorMap(response.data.createStockItOrder.errors as FieldError[]));
                    } else if (response.data?.createStockItOrder.stockItOrder) {
                        setOpen()
                        history.push("/stock-it/my-order")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                เบิก/ยืม อุปกรณ์ IT
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
                                    <Box h="40px" ml="10">
                                        <Grid
                                            templateColumns={["repeat(3, 1fr)"]}
                                            gap={6}
                                            role="group"
                                            aria-labelledby="my-radio-group"
                                            align="center"
                                        >
                                            {radioOptions.map((radio, index) => (
                                                <label key={index}>
                                                    <Field type="radio" name="holdStatus" value={radio.value} />
                                                    &nbsp; {radio.name}
                                                </label>
                                            ))}
                                        </Grid>
                                        <Box align="center" mb="-5">
                                            <ErrorMessage name="category" component={TextError} />
                                        </Box>
                                    </Box>
                                    <InputField textarea name="detail" label="รายละเอียด" />
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
    )
}

export default CreateStockOrder
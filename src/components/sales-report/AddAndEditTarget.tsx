import React, { useRef } from "react";
import {
    Flex, Text, Button, AlertDialog, AlertDialogBody, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
    FieldError,
    useCreateSalesTargetMutation
} from "../../generated/graphql";
import InputField from "../InputField";
import SelectControl from "../Selectfield";
import { toErrorMap } from "../../utils/toErrorMap";

interface Props {
    Open: boolean;
    setOpen: () => void;
    roleId: string
    branch: string | undefined
}

const AddAndEditTarget: React.FC<Props> = ({ Open, setOpen, branch, roleId }) => {
    const cancelRef = useRef();
    const selectYear = [2021, 2022, 2023, 2024, 2025]
    const [, createTarget] = useCreateSalesTargetMutation()
    return (
        <AlertDialog
            size="xs"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    year: 2021,
                    commission: 0,
                    strategy: 0,
                }}
                onSubmit={async (values, { setErrors }) => {
                    if (!branch) {
                        return alert('Error! branch')
                    }
                    const response = await createTarget({
                        input: {
                            year: +values.year,
                            commission: values.commission,
                            strategy: values.strategy,
                            branch,
                            salesRoleId: +roleId
                        }
                    });

                    if (response.data?.createSalesTarget.errors) {
                        setErrors(
                            toErrorMap(response.data.createSalesTarget.errors as FieldError[])
                        );
                    } else if (response.data?.createSalesTarget.salesTargets) {
                        setOpen();
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay size="xs">
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Target ประจำปี
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
                                    <Flex flexDir="column">
                                        <Flex flexDir="column" w="100%">
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                                mt="3"
                                            >
                                                {"ปี (ค.ศ.)"}
                                            </Text>
                                            <SelectControl name="year">
                                                {selectYear.map((item, i) => (
                                                    <option key={i} value={item}>{item}</option>
                                                ))}
                                            </SelectControl>
                                        </Flex>
                                        <InputField
                                            type="number"
                                            name="commission"
                                            label="Commission Target"
                                        />
                                        <InputField
                                            type="number"
                                            name="strategy"
                                            label="Strategy Target"
                                        />
                                    </Flex>
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button
                                        colorScheme={branch === "ลาดกระบัง" ? "blue" : "green"}
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
    )
}

export default AddAndEditTarget
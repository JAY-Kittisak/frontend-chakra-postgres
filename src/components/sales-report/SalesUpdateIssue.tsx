import React, {useState, useRef } from "react";
import {
    Flex, Text, Button, AlertDialog, AlertDialogBody, AlertDialogFooter,Select,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
    useUpdateSalesIssueMutation
} from "../../generated/graphql";
import InputField from "../InputField";
import { probSelect,catIssueStatus } from "../../utils/helpers";

interface Props {
    Open: boolean;
    setOpen: () => void;
    issueId: string
    branch: string | undefined
}

const SalesUpdateIssue: React.FC<Props> = ({ Open, setOpen, branch, issueId }) => {
    const cancelRef = useRef();

    const [rate, setRate] = useState("น้อยกว่า 30%");
    const [status, setStatus] = useState("PROPOSED");

    const [, updateSalesIssue] = useUpdateSalesIssueMutation()
    
    return (
        <AlertDialog
            size="xs"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    value: 0
                }}
                onSubmit={async (values) => {
                    if (!branch) {
                        return alert('Error! branch')
                    }
                    const response = await updateSalesIssue({
                        input: {
                            id: +issueId,
                            rate,
                            status,
                            issueValue: values.value
                        }
                    });

                    if (response.data?.updateSalesIssue) return setOpen();
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay size="xs">
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Update Issue
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
                                    <Flex flexDir="column">
                                        <Flex flexDir="column">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                                mt="2"
                                        >
                                            Prob :
                                        </Text>
                                        <Select onChange={(e) => {
                                            setRate(e.target.value)
                                        }}>
                                                {probSelect.map((value, i) => (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </Select>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                                mt="2"
                                        >
                                            Status :
                                        </Text>
                                        <Select onChange={(e) => {
                                            setStatus(e.target.value)
                                        }}>
                                            {catIssueStatus.map((value, i) => (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </Select>
                                    </Flex>
                                        <InputField
                                            type="number"
                                            name="value"
                                            label="มูลค่า"
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

export default SalesUpdateIssue
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

interface Props {
    Open: boolean;
    setOpen: () => void;
    issueId: string
    branch: string | undefined
    currentPrice: number
}

const SalesUpdateIssue: React.FC<Props> = ({ Open, setOpen, branch, issueId, currentPrice }) => {
    const cancelRef = useRef();

    const [rate, setRate] = useState("น้อยกว่า 30");
    const [status, setStatus] = useState("Proposed");

    const [, updateSalesIssue] = useUpdateSalesIssueMutation()
    
    return (
        <AlertDialog
            size="xl"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    value: currentPrice
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
                                            Success Rate :
                                        </Text>
                                        <Select onChange={(e) => setRate(e.target.value)}>
                                                <option value='น้อยกว่า 30'>
                                                    น้อยกว่า 30% (ได้เป็นหัวเรื่อง)
                                                </option>
                                                <option value='มากกว่า 30'>
                                                    มากกว่า 30% (ได้เสนอเป็นหัวเรื่อง ประมาณการ issue ได้)
                                                </option>
                                                <option value='มากกว่า 50'>
                                                    มากกว่า 50% (ได้เสนอราคา แต่ยังไม่ได้ PO)
                                                </option>
                                                <option value='มากกว่า 90'>
                                                    มากกว่า 90% (ได้ PO แล้ว แต่รอเปิด Invoice)
                                                </option>
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
                                        <Select onChange={(e) => setStatus(e.target.value)}>
                                            <option value='Proposed'>
                                                Proposed (นำเสนอ ยังไม่เป็นหัวเรื่องที่ชัดเจน ยังไม่สามารถใส่มูลค่าประมาณการได้)
                                            </option>
                                            <option value='Issued'>
                                                Issued (ได้ออกมาเป็น หัวเรื่องแล้ว สามารถใส่มูลค่าประมาณการได้)
                                            </option>
                                            <option value='Demo'>
                                                Demo (สามารถระบุรุ่น และต้นทุนการ test ได้)
                                            </option>
                                            <option value='Test'>
                                                Test (สามารถระบุรุ่น และต้นทุนการ test ได้)
                                            </option>
                                            <option value='Quoted'>
                                                Quoted (ได้เสนอราคาเรียบร้อยแล้ว)
                                            </option>
                                            <option value='Purchased'>
                                                Purchased (สามารถระบุวันที่ PO ได้)
                                            </option>
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
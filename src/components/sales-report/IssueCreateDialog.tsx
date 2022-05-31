import React, { useState, useRef } from 'react'
import {
    Flex, Text, Select, Button, AlertDialog, AlertDialogBody, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import InputField from '../InputField'
import { 
    useCreateSalesIssueMutation,
    useJoinVisitMutation,
    FieldError,
    useSalesBrandsQuery,
} from '../../generated/graphql';
import { toErrorMap } from "../../utils/toErrorMap";

interface Props {
    Open: boolean;
    setOpen: () => void;
    visitId: number
    branch: string | undefined
}

const IssueCreateDialog: React.FC<Props> = ({ Open, setOpen, branch, visitId }) => {
    const [brand, setBrand] = useState("3M");
    const [category, setCategory] = useState("One shot");
    const [status, setStatus] = useState("Proposed");
    const [rate, setRate] = useState("น้อยกว่า 30");
    const [closedStatus, setClosedStatus] = useState("Pending");
    const [failReason, setFailReason] = useState("Pending");

    const [, createIssue] = useCreateSalesIssueMutation()
    const [, joinVisit] = useJoinVisitMutation();
    const [{ data }] = useSalesBrandsQuery()

    const cancelRef = useRef();

    console.log('IssueCreateDialog ID', visitId)

    return (
        <AlertDialog
            size="3xl"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    detail: '',
                    issueValue: 0,
                    forecastDate: '',
                    units: 0,
                    model: '',
                    size: '',
                    closedDate: 'Pending',
                }}
                onSubmit={async (values, { setErrors }) => {
                    const sumArr = {
                        ...values,
                        brand,
                        category,
                        status,
                        rate,
                        closedStatus,
                        failReason,
                    }
                    const response = await createIssue({ input: sumArr });
                    if (response.data?.createSalesIssue.errors) {
                        setErrors(
                            toErrorMap(response.data.createSalesIssue.errors as FieldError[])
                            );
                    } else if (response.data?.createSalesIssue.salesIssues) {
                        const issueId = response.data?.createSalesIssue.salesIssues[0].id
                        
                        if (issueId) {
                            const responseVisit = await joinVisit({ input: {
                                visitId,
                                issueId,
                            }})
                            if (responseVisit.error?.message) {
                                return alert(responseVisit.error?.message)
                            } else if (responseVisit.data?.joinVisit) {
                                return setOpen()
                            }
                        }
                    }
                }}
            >{({ isSubmitting }) => (
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader textAlign='center' fontSize="lg" fontWeight="bold">
                            Create New Issue
                        </AlertDialogHeader>
                        <ModalCloseButton />

                        <Form>
                            <AlertDialogBody>
                                {/* รายละเอียด */}
                                <InputField
                                    textarea
                                    name="detail"
                                    label="รายละเอียด :"
                                />
                                {/* มูลค่าการเสนอราคา */}
                                <Flex className="flex-div" justify="space-between">
                                    <InputField
                                        type="number"
                                        name="issueValue"
                                        label="มูลค่าการนำเสนอ :"
                                    />
                                    <InputField type="date" name="forecastDate" label="วันที่คาดว่าจะปิดงาน :" />
                                </Flex>

                                {/* Brand */}
                                <Flex className="flex-div" justify="space-between">
                                        <Flex flexDir="column" w="50%">
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                                mt="2"
                                            >
                                                Brand :
                                            </Text>
                                            <Select onChange={(e) => setBrand(e.target.value)}>
                                                {data?.salesBrands?.map((value) => (
                                                    <option key={value.id} value={value.brand}>
                                                        {value.brand}
                                                    </option>
                                                ))}
                                            </Select>
                                        </Flex>
                                    <Flex flexDir="column" w="50%">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                            mt="2"
                                        >
                                            Category :
                                        </Text>
                                        <Select onChange={(e) => setCategory(e.target.value)}>
                                                <option value='One shot'>
                                                    One shot (กรอกจำนวนที่จะซื้อครั้งนั้นๆ)
                                                </option>
                                                <option value='Repeat Standard'>
                                                    Repeat Standard (กรอกจำนวนที่จะซื้อต่อเดือน)
                                                </option>
                                                <option value='Repeat Special'>
                                                    Repeat Special (กรอกจำนวนที่จะซื้อต่อเดือน)
                                                </option>
                                        </Select>
                                    </Flex>
                                </Flex>

                                {/* Units */}
                                <Flex className="flex-div" justify="space-between">
                                    <InputField
                                        type="number"
                                        name="units"
                                        label="Units :"
                                    />
                                    <InputField
                                        name="model"
                                        label="Model :"
                                    />
                                </Flex>
                                
                                {/* Size */}
                                <Flex className="flex-div" justify="space-between">
                                    <Flex w="50%">
                                        <InputField
                                            name="size"
                                            label="Size :"
                                        />
                                    </Flex>
                                    <Flex flexDir="column" w="50%">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                            mt="3"
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
                                </Flex>
                                
                                {/* Success rate */}
                                <Flex className="flex-div" justify="space-between">
                                    <Flex flexDir="column" w="100%">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                            mt="3"
                                        >
                                            Success rate :
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
                                    <InputField type="date" name="closedDate" label="วันที่ปิด issued :" />
                                </Flex>

                                {/* Closed status : */}
                                <Flex className="flex-div" justify="space-between">
                                    <Flex flexDir="column" w="50%">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                            mt="3"
                                        >
                                            Closed status :
                                        </Text>
                                        <Select onChange={(e) => setClosedStatus(e.target.value)}>
                                                <option value='Pending'>
                                                    Pending
                                                </option>
                                                <option value='Success 1'>
                                                    Success 1 (ได้ PO เต็มตามเสนอราคา)
                                                </option>
                                                <option value='Success 2'>
                                                    Success 2 (ได้ PO บางส่วน)
                                                </option>
                                                <option value='Fail 1'>
                                                    Fail 1 (ไม่ได้เสนอราคา)
                                                </option>
                                                <option value='Fail 2'>
                                                    Fail 2 (ไม่ได้ PO)
                                                </option>
                                        </Select>
                                    </Flex>
                                    <Flex flexDir="column" w="50%">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                            mt="3"
                                        >
                                            Fail reason :
                                        </Text>
                                        <Select onChange={(e) => setFailReason(e.target.value)}>
                                                <option value='Pending'>
                                                    Pending
                                                </option>
                                                <option value='ด้านราคา'>
                                                    ด้านราคา (แพ้ด้วยเรื่องราคา)
                                                </option>
                                                <option value='ด้านคุณภาพ'>
                                                    ด้านคุณภาพ (แพ้ด้วยเรื่องคุณภาพสินค้า)
                                                </option>
                                                <option value='ด้าน stock'>
                                                    ด้าน stock (แพ้ด้วยเรื่องสินค้าไม่มีพร้อมส่ง)
                                                </option>
                                                <option value='ด้านการบริการ'>
                                                    ด้านการบริการ
                                                </option>
                                        </Select>
                                    </Flex>
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

        </AlertDialog>
    )
}

export default IssueCreateDialog
import React, { useState, useEffect } from 'react'
import {
    Flex, Text, Divider, Input, Select, Button
} from '@chakra-ui/react'
import { Form, Formik } from "formik"
import { useHistory } from "react-router";

import {
    useCreateSalesVisitMutation,
    FieldError,
    useMeQuery
} from '../generated/graphql';
import InputField from '../components/InputField'
import SelectCustomerJsr from '../components/sales-report/SelectCustomerJsr';
import SelectCustomerCdc from '../components/sales-report/SelectCustomerCdc';
import { toErrorMap } from '../utils/toErrorMap';

type CatJobPurpose = "สร้างหัวเรื่องใหม่" | "ติดตามหัวเรื่องเดิม" | "ติดตามใบเสนอราคา"
const catJobPurpose: CatJobPurpose[] = ["สร้างหัวเรื่องใหม่", "ติดตามหัวเรื่องเดิม", "ติดตามใบเสนอราคา"]

interface Props { }

const SalesVisitCreate: React.FC<Props> = () => {
    const [customerID, setCustomerID] = useState<number | undefined>(undefined);
    const [customerData, setCustomerData] = useState<
        { code: string, prefix: string, name: string } | undefined
    >(undefined);

    const [customer, setCustomer] = useState("");
    const [changeInput, setChangeInput] = useState(true);
    const [jobPurpose, setJobPurpose] = useState(catJobPurpose[0])
    const [customerType, setCustomerType] = useState("New customer 1")

    const [{ data: me }] = useMeQuery()
    const [, createVisit] = useCreateSalesVisitMutation()

    const history = useHistory();

    useEffect(() => {
        setCustomer('')
        if (customerData) {
            setChangeInput(true)
            setCustomer(customerData.prefix + " " + customerData.name)
        }
    }, [customerData])

    return (
        <Flex flexDir="column" px="5" overflowY="auto" h="95vh">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="green.600"
            >
                บันทึกการเข้าพบลูกค้า
            </Text>

            <Divider orientation="horizontal" />
            <Formik
                initialValues={{
                    visitDate: '',
                    quotationNo: 'ว่าง',
                    value: 0,
                    contactName: '',
                    position: '',
                    department: ''
                }}
                onSubmit={async (values, { setErrors }) => {
                    if (customer === '') return alert('โปรดใส่ชื้อบริษัท')

                    const sumArr = {
                        ...values,
                        customer,
                        jobPurpose,
                        customerType
                    }
                    const response = await createVisit({ input: sumArr })
                    if (response.data?.createSalesVisit.errors) {
                        setErrors(
                            toErrorMap(response.data.createSalesVisit.errors as FieldError[])
                        )
                    } else if (response.data?.createSalesVisit.salesVisit) {
                        const newId = response.data.createSalesVisit.salesVisit.id
                        history.push(`/sales-report/visit/${newId}`)
                    }
                }}
            >{({ isSubmitting }) => (
                <Form>
                    <Flex>
                        <Flex
                            flexDir="column"
                            w="50%"
                            mt="8"
                            boxShadow="xl"
                            borderRadius="md"
                            align="center"
                        >
                            <Text fontSize="2xl" fontWeight="bold">
                                บันทึกข้อมูล
                            </Text>
                            <Flex flexDir="column" w="90%" mb="5">

                                {/* ชื่อบริษัท... */}
                                <Flex flexDir="column">
                                    <Text
                                        fontSize={["sm", "md"]}
                                        mb="2"
                                        mt="2"
                                    >
                                        <span className='font-w-semibold'>ชื่อบริษัท : </span>
                                        {!customerID && <span className='error'>พิมพ์หรือเลือกตัวเลือกด้านขวา*</span>}
                                        {changeInput && <span>{customer}</span>}
                                    </Text>
                                    <Input
                                        disabled={!!customerID}
                                        defaultValue={customer}
                                        onChange={(e) => {
                                            setChangeInput(false)
                                            setCustomer(e.target.value)
                                        }}
                                    />
                                </Flex>

                                {/* วันที่ */}
                                <Flex className="flex-div" justify="space-between">
                                    <Flex flexDir="column" w="100%">
                                        <InputField type="date" name="visitDate"
                                            label="วันที่ไปหาลูกค้า :" />
                                    </Flex>
                                    <Flex flexDir="column" w="100%">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                            mt="3"
                                        >
                                            วัตถุประสงค์การเข้า :
                                        </Text>
                                        <Select onChange={(e) => setJobPurpose(e.target.value as CatJobPurpose)}>
                                            {catJobPurpose.map((value, i) => (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </Select>
                                    </Flex>
                                </Flex>

                                {/* เลขที่ใบเสนอราคา */}
                                {jobPurpose === 'ติดตามใบเสนอราคา' && (
                                    <>
                                        <InputField
                                            name="quotationNo"
                                            label="เลขที่ใบเสนอราคา :"
                                        />
                                        <InputField
                                            type='number'
                                            name="value"
                                            label="มูลค่าการเสนอราคา :"
                                        />
                                    </>
                                )}

                                {/* ข้อมูลการติดต่อ */}
                                <Flex className="flex-div" justify="space-between">
                                    <InputField
                                        name="contactName"
                                        label="ชื่อผู้ติดต่อ :"
                                    />
                                    <InputField
                                        name="position"
                                        label="ตำแหน่งผู้ติดต่อ :"
                                    />
                                </Flex>

                                {/* ประเภทลูกค้า */}
                                <Text
                                    fontWeight="semibold"
                                    fontSize={["sm", "md"]}
                                    mb="2"
                                    mt="3"
                                >
                                    ประเภทลูกค้า :
                                </Text>
                                <Select onChange={(e) => setCustomerType(e.target.value)}>
                                    <option value="New customer 1">New customer 1 (ใหม่เลย)</option>
                                    <option value="New customer 2">New customer 2 (ลูกค้าในฐานเดิม แต่เป็น issue ที่ทำขึ้นมาใหม่)</option>
                                    <option value="Existing customer">Existing customer (ลูกค้าเดิม)</option>
                                </Select>

                                {/* แผนกผู้ติดต่อ */}
                                <InputField
                                    name="department"
                                    label="แผนกผู้ติดต่อ :"
                                />

                                <Button
                                    mt="10"
                                    colorScheme="green"
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    SAVE
                                </Button>
                            </Flex>
                        </Flex>

                        {me?.me?.branch === 0 ? (
                            <SelectCustomerJsr
                                setCustomerID={setCustomerID}
                                setCustomerData={setCustomerData}
                                orderCustomerId={undefined}
                                addedId={undefined}
                            />
                        ) : (
                            <SelectCustomerCdc
                                setCustomerID={setCustomerID}
                                setCustomerData={setCustomerData}
                                orderCustomerId={undefined}
                                addedId={undefined}
                            />
                        )}

                    </Flex>
                </Form>
            )}

            </Formik>
        </Flex>
    )
}

export default SalesVisitCreate
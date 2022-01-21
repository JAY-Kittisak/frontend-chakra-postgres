import React, { useState,useEffect } from 'react'
import {
    Flex, Text, Divider, Button, Select, Input,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader,
    PopoverBody, PopoverArrow, PopoverCloseButton,
} from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import { useHistory } from "react-router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import InputField from '../components/InputField';
import { useIsAuth } from '../utils/uselsAuth';
import { 
    useCreateSalesIssueMutation, 
    FieldError, 
    useSalesBrandsQuery, 
    useMeQuery 
} from '../generated/graphql';

import { toErrorMap } from "../utils/toErrorMap";
import { selectMonth,probSelect,catIssueStatus } from '../utils/helpers';
import SelectCustomerJsr from '../components/sales-report/SelectCustomerJsr';
import SelectCustomerCdc from '../components/sales-report/SelectCustomerCdc';

interface Props { }

const categorySelect = [
    "Automation",
    "Marposs",
    "Mi",
    "Others",
    "Program",
    "Project",
    "SmallTool",
];

const SalesIssueCreate: React.FC<Props> = () => {
    useIsAuth();

    const [category, setCategory] = useState("Automation");
    const [prob, setProb] = useState("น้อยกว่า 30%");
    const [status, setStatus] = useState("PROPOSED");
    const [brand, setBrand] = useState("3M");

    const [dateEnd, setDateEnd] = useState(new Date());
    const [completionDate, setCompletionDate] = useState("");
    const [dateStart, setDateStart] = useState(new Date());
    const [visitDate, setVisitDate] = useState("");

    const [customerID, setCustomerID] = useState<number | undefined>(undefined);
    const [customerData, setCustomerData] = useState<
        { code: string, prefix: string, name: string } | undefined
    >(undefined);

    const [customer, setCustomer] = useState("");
    const [changeInput, setChangeInput] = useState(true);

    const [, createIssue] = useCreateSalesIssueMutation()
    const [{ data }] = useSalesBrandsQuery()
    const [{ data: me }] = useMeQuery()

    const history = useHistory();

    const onChangeEnd = (date: Date) => {
        setDateEnd(date);
        const dd = date.getDate()
        const mm = date.getMonth()
        const yy = date.getFullYear()
        setCompletionDate(`${dd} ${selectMonth[mm + 1]} ${yy}`);
    };

    const onChangeStart = (visit: Date) => {
        setDateStart(visit);
        const dd = visit.getDate()
        const mm = visit.getMonth()
        const yy = visit.getFullYear()
        setVisitDate(`${dd} ${selectMonth[mm + 1]} ${yy}`);
    };

    useEffect(() => {
        setCustomer('')
        if (customerData) {
            setChangeInput(true)
            setCustomer(customerData.prefix + " " + customerData.name)
        }
    }, [customerData])

    console.log(customer);

    return (
        <Flex flexDir="column" px="5" overflowY="auto" h="95vh">
            <Flex justify="space-between">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    Issue
                </Text>
            </Flex>

            <Divider orientation="horizontal" />
            <Formik
                initialValues={{
                    quotationNo: "ยังไม่มีข้อมูล",
                    detail: "",
                    value: 0,
                    contact: "",
                }}
                onSubmit={async (values, { setErrors }) => {

                    const sumArr = {
                        ...values,
                        customer,
                        visitDate,
                        completionDate,
                        brand,
                        category,
                        prob,
                        status
                    };
                    const response = await createIssue({ input: sumArr });
                    if (response.data?.createSalesIssue.errors) {
                        setErrors(
                            toErrorMap(response.data.createSalesIssue.errors as FieldError[])
                        );
                    } else if (response.data?.createSalesIssue.salesIssues) {
                        const newId = response.data.createSalesIssue.salesIssues[0].id;
                        history.push(`/sales-report/issue/${newId}`);
                    }
                    console.log(sumArr)
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
                                    <Flex flexDir="column">
                                        <Text
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                            mt="2"
                                        >
                                            <span className='font-w-semibold'>Customer : </span>
                                            {!customerID && <span className='error'>พิมพ์หรือเลือกตัวเลือกด้านขวา*</span>}
                                            {changeInput && <span>{customer}</span>}
                                        </Text>
                                        <Input
                                            disabled={!!customerID}
                                            defaultValue={customer}
                                            placeholder='ชื่อบริษัท...'
                                            onChange={(e) => {
                                                setChangeInput(false)
                                                setCustomer(e.target.value)
                                            }}
                                        />
                                    </Flex>
                                    <Flex className="flex-div" justify="space-between">
                                        <Flex flexDir="column" mt="1" w="50%">
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                                mt="2"
                                            >
                                                Customer visit date :
                                            </Text>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button
                                                        w="100%"
                                                        rightIcon={<ChevronDownIcon />}
                                                        variant='outline'
                                                        color={visitDate ? "" : "gray"}
                                                        fontWeight={visitDate ? "" : "light"}
                                                    >
                                                        {visitDate ? visitDate : "วันที่ไปหาลูกค้า"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent w="400px">
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader >เลือกวันที่</PopoverHeader>
                                                    <PopoverBody fontSize="13px" ml="3">
                                                        <Calendar onChange={onChangeStart} value={dateEnd} />
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                        </Flex>
                                        <Flex flexDir="column" mt="1" w="50%">
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mb="2"
                                                mt="2"
                                            >
                                                Completion date :
                                            </Text>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <Button
                                                        w="100%"
                                                        rightIcon={<ChevronDownIcon />}
                                                        variant='outline'
                                                        color={completionDate ? "" : "gray"}
                                                        fontWeight={completionDate ? "" : "light"}
                                                    >
                                                        {completionDate ? completionDate : "วันที่จะจบงานนี้"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent w="400px">
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader >เลือกวันที่</PopoverHeader>
                                                    <PopoverBody fontSize="13px" ml="3">
                                                        <Calendar onChange={onChangeEnd} value={dateStart} />
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                        </Flex>
                                    </Flex>
                                <Flex className="flex-div" justify="space-between">
                                    <InputField
                                        name="quotationNo"
                                        placeholder="เลขที่ใบเสนอราคา..."
                                        label="Quotation No. :"
                                    />
                                    <InputField
                                        type="number"
                                        name="value"
                                        placeholder="มูลค่า..."
                                        label="Value :"
                                    />
                                </Flex>
                                <InputField
                                    textarea
                                    name="detail"
                                    placeholder="รายละเอียด..."
                                    label="Detail :"
                                />
                                <InputField
                                    textarea
                                    name="contact"
                                    placeholder="ข้อมูลการติดต่อ..."
                                    label="Contact :"
                                />

                                <Flex justify="space-between">
                                        <Flex flexDir="column" w="45%">
                                            {/* <Flex flexDir="column"
                                                w="150px"> */}
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
                                    <Flex flexDir="column" w="45%">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                                mt="2"
                                        >
                                            Category :
                                        </Text>
                                        <Select onChange={(e) => {
                                            setCategory(e.target.value)
                                        }}>
                                                {categorySelect.map((value, i) => (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </Select>
                                    </Flex>
                                </Flex>


                                <Flex justify="space-between">
                                    <Flex flexDir="column" w="45%">
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                                mt="2"
                                        >
                                            Prob :
                                        </Text>
                                        <Select onChange={(e) => {
                                            setProb(e.target.value)
                                        }}>
                                                {probSelect.map((value, i) => (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </Select>
                                    </Flex>
                                    <Flex flexDir="column" w="45%">
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
                                </Flex>
                                <Flex>
                                    <Button
                                        mt="10"
                                        w='100%'
                                        colorScheme="green"
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        save
                                    </Button>
                                </Flex>
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
        </Flex >
    )
}

export default SalesIssueCreate
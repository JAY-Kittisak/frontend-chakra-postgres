import React, { useEffect, useState } from 'react'
import { Flex, Text, Divider, Button, Select } from '@chakra-ui/react'
import { Form, Formik } from "formik";
import { useHistory } from "react-router";

import SelectCustomer from "../components/resell/SelectCustomer";
import InputField from '../components/InputField';
import { catStatus } from '../utils/helpers';
import { useIsAuth } from '../utils/uselsAuth';
import { useCreateSalesIssueMutation, FieldError } from '../generated/graphql';
import { toErrorMap } from "../utils/toErrorMap";

interface Props { }

const SalesRole = [
    "Mitutoyo",
    "Imada",
    "Teclock",
    "Fuji Tool",
];
const Category = [
    "Automation",
    "Marposs",
    "Mi",
    "Others",
    "Program",
    "Project",
    "SmallTool",
];
const Prob = [
    "น้อยกว่า 30%",
    "มากกว่า 30%",
    "มากกว่า 50%",
    "มากกว่า 90%",
];

const SalesIssueCreate: React.FC<Props> = () => {
    useIsAuth();

    const [customer, setCustomer] = useState("");
    const [category, setCategory] = useState("Automation");
    const [prob, setProb] = useState("น้อยกว่า 30%");
    const [status, setStatus] = useState("New");

    const [customerID, setCustomerID] = useState<number | undefined>(undefined);
    const [customerData, setCustomerData] = useState<
        { code: string; name: string } | undefined
    >(undefined);

    const [, createIssue] = useCreateSalesIssueMutation()

    const history = useHistory();

    useEffect(() => {
        if (customerData?.name) {
            setCustomer(customerData.name)
        }
    }, [customerData])

    return (
        <Flex flexDir="column" px="5">
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
                    quotationNo: "",
                    brandId: 2,
                    detail: "",
                    value: 0,
                    contact: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    if (!customerID) {
                        return alert("โปรดเลือก Customer");
                    }

                    const sumArr = {
                        ...values,
                        customer,
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
                            p="6"
                            mt="8"
                            boxShadow="xl"
                            borderRadius="md"
                            align="center"
                        >
                            <Text fontSize="2xl" fontWeight="bold">
                                บันทึกข้อมูล
                            </Text>
                            <Flex flexDir="column" w="80%" mb="5">

                                <Flex>
                                    <Text
                                        fontWeight="semibold"
                                        fontSize="lg"
                                        mb="2"
                                        mt="3"
                                    >
                                        Customer :
                                    </Text>
                                    &nbsp;
                                    {customerData?.code ? (
                                        <>
                                            <Text fontWeight="semibold" fontSize="md" mb="2" mt="3">
                                                {customerData.code}
                                            </Text>
                                            &nbsp;
                                            <Text fontWeight="semibold" fontSize="md" mb="2" mt="3">
                                                {customerData.name}
                                            </Text>
                                        </>
                                    ) : (
                                        <Text color="gray" fontSize="md" mb="2" mt="3">
                                            โปรดเลือกตัวเลือกด้านขวา...
                                        </Text>
                                    )}
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
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md"]}
                                            mb="2"
                                            mt="3"
                                        >
                                            Brand :
                                        </Text>
                                        <Select onChange={(e) => {
                                            console.log(e.target.value)
                                        }}>
                                            {SalesRole.map((value, i) => (
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
                                            mt="3"
                                        >
                                            Category :
                                        </Text>
                                        <Select onChange={(e) => {
                                            setCategory(e.target.value)
                                        }}>
                                            {Category.map((value, i) => (
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
                                            mt="3"
                                        >
                                            Prob :
                                        </Text>
                                        <Select onChange={(e) => {
                                            setProb(e.target.value)
                                        }}>
                                            {Prob.map((value, i) => (
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
                                            mt="3"
                                        >
                                            Status :
                                        </Text>
                                        <Select onChange={(e) => {
                                            setStatus(e.target.value)
                                        }}>
                                            {catStatus.map((value, i) => (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </Select>
                                    </Flex>
                                </Flex>
                                <Button
                                    mt="10"
                                    w="100%"
                                    colorScheme="green"
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Flex>
                        </Flex>
                        <SelectCustomer
                            setCustomerID={setCustomerID}
                            setCustomerData={setCustomerData}
                            orderCustomerId={undefined}
                            resellId={undefined}
                            addedId={undefined}
                            setAlertSuccess={() => undefined}
                            setAlertWarning={() => undefined}
                        />
                    </Flex>
                </Form>
            )}
            </Formik>
        </Flex >
    )
}

export default SalesIssueCreate
import React, { useState } from 'react'
import { Flex, Text, Divider, Button, Select } from '@chakra-ui/react'
import { Form, Formik } from "formik";
import { useHistory } from "react-router";

import SelectCustomer from "../components/resell/SelectCustomer";
import InputField from '../components/InputField';
import { catUserRole } from '../utils/helpers';
import { useIsAuth } from '../utils/uselsAuth';

interface Props { }

const SalesRole = [
    "Sales01",
    "Sales02",
    "Sales03",
    "Sales04",
    "Sales05",
    "Sales06",
    "Sales07",
    "Sales08",
    "Sales09",
    "Sales10",
    "Sales11",
];

const SalesActualCreate: React.FC<Props> = () => {
    useIsAuth();

    const [customerID, setCustomerID] = useState<number | undefined>(undefined);
    const [customerData, setCustomerData] = useState<
        { code: string; name: string } | undefined
    >(undefined);
    const [selectBranch, setSelectBranch] = useState("ลาดกระบัง");

    const history = useHistory();

    return (
        <Flex flexDir="column">
            <Flex justify="space-between">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    ยอดขาย
                </Text>
            </Flex>

            <Divider orientation="horizontal" />
            <Formik
                initialValues={{
                    title: "",
                    detail: "",
                    actual: 0
                }}
                onSubmit={async (
                    values
                    // , { setErrors }
                ) => {
                    console.log(values, customerID, selectBranch)
                    history.push(`/sales-report/role-manage/${1}`);
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
                                บันทึกข้อมูลการขาย
                            </Text>
                            <Flex flexDir="column" w="80%" mb="5">
                                <InputField
                                    name="title"
                                    placeholder="หัวเรื่อง..."
                                    label="หัวเรื่อง :"
                                />
                                <InputField
                                    textarea
                                    name="detail"
                                    placeholder="รายละเอียด..."
                                    label="รายละเอียดการผลิต :"
                                />
                                <InputField
                                    type="number"
                                    name="actual"
                                    placeholder="actual..."
                                    label="ยอดขาย :"
                                />
                                <Flex>
                                    <Text
                                        fontWeight="semibold"
                                        fontSize="lg"
                                        mb="2"
                                        mt="3"
                                    >
                                        ผู้ซื้อ :
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
                                <Text
                                    fontWeight="semibold"
                                    fontSize={["sm", "md"]}
                                    mb="2"
                                    mt="3"
                                >
                                    เลือก Sales ผู้ขาย :
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
                                <Text
                                    fontWeight="semibold"
                                    fontSize={["sm", "md"]}
                                    mb="2"
                                    mt="3"
                                >
                                    สาขา :
                                </Text>
                                <Select onChange={(e) => setSelectBranch(e.target.value)}>
                                    {catUserRole.map((value, i) => (
                                        <option key={i} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </Select>
                                <Button
                                    mt="5"
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
        </Flex>
    )
}

export default SalesActualCreate
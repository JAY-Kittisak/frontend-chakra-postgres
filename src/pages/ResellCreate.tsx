import React, { useState, useEffect } from "react";
import { Text, Flex, Button, Divider, Select } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { Form, Formik } from "formik";

import { useIsAuth } from "../utils/uselsAuth";
import {
    useCreateResellMutation,
    useMeQuery,
    FieldError,
} from "../generated/graphql";
import InputField from "../components/InputField";
import SelectCustomer from "../components/resell/SelectCustomer";
import { toErrorMap } from "../utils/toErrorMap";

interface Props { }

type SelectMaker = "YAMAWA" | "MOLDINO";
// SelectMaker[]
const catMaker: Array<SelectMaker> = ["YAMAWA", "MOLDINO"];

type TypeY = "ต๊าปประเภท A" | "ต๊าปประเภท B" | "ต๊าปประเภท C";
const catYamawa: TypeY[] = ["ต๊าปประเภท A", "ต๊าปประเภท B", "ต๊าปประเภท C"];
type TypeM = "หัวกัดประเภท D" | "หัวกัดประเภท E" | "หัวกัดประเภท F";
const catMoldino: Array<TypeM> = [
    "หัวกัดประเภท D",
    "หัวกัดประเภท E",
    "หัวกัดประเภท F",
];

const ResellCreate: React.FC<Props> = () => {
    useIsAuth();
    const [maker, setMaker] = useState("YAMAWA");
    const [catIndex, setCatIndex] = useState(0);
    const [category, setCategory] = useState("ต๊าปประเภท A");
    const [categorySelect, setCategorySelect] = useState<TypeY[] | TypeM[]>(
        catYamawa
    );

    const [customerID, setCustomerID] = useState<number | undefined>(undefined);
    const [customerData, setCustomerData] = useState<
        { code: string; name: string } | undefined
    >(undefined);

    const history = useHistory();

    const [{ data }] = useMeQuery();
    const [, createResell] = useCreateResellMutation();

    useEffect(() => {
        if (maker === "YAMAWA") {
            setCategorySelect(catYamawa);
            setCategory(catYamawa[catIndex])
        } else {
            setCategorySelect(catMoldino);
            setCategory(catMoldino[catIndex])
        }
    }, [maker, catIndex]);

    return (
        <Flex flexDir="column" px="5">
            <Flex justify="space-between">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    Resell
                </Text>
                {(((data?.me?.departments === "Sales" ||
                    data?.me?.departments === "SaleCo") &&
                    data?.me?.position === "หัวหน้างาน") ||
                    data?.me?.position === "GM") && (
                        <Button
                            ml="10"
                        colorScheme="orange"
                            color="white"
                            onClick={() => {
                                history.push("/resell/report");
                            }}
                        >
                            Report
                        </Button>
                    )}
            </Flex>
            <Divider orientation="horizontal" />

            <Formik
                initialValues={{
                    title: "",
                    detail: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    if (!customerID) {
                      return alert("โปรดเลือก Customer");
                  }

                  const sumArr = { ...values, orderId: customerID, maker, category };
                  const response = await createResell({ input: sumArr });
                  if (response.data?.createResell.errors) {
                        setErrors(
                            toErrorMap(response.data.createResell.errors as FieldError[])
                        );
                    } else if (response.data?.createResell.resells) {
                      const newId = response.data.createResell.resells[0].id;
                        history.push("/resell/step2/" + newId);
                    }
                }}
            >
                {({ isSubmitting }) => (
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
                                    บันทึกรายละเอียด
                                </Text>
                                <Flex flexDir="column" w="80%" mb="5">
                                    <Flex>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize="lg"
                                            mb="2"
                                            mt="3"
                                        >
                                            บริษัท :
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
                                                <Text color="red" fontSize="md" mb="2" mt="3">
                                                    โปรดเลือกตัวเลือกด้านขวา*
                                            </Text>
                                        )}
                                    </Flex>
                                    <Text
                                        fontWeight="semibold"
                                        fontSize={["sm", "md"]}
                                        mb="2"
                                        mt="3"
                                    >
                                        Maker :
                                    </Text>
                                    <Select onChange={(e) => setMaker(e.target.value)}>
                                        {catMaker.map((value, i) => (
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
                                        ประเภทสินค้า :
                                    </Text>
                                    <Select onChange={(e) => {
                                        setCategory(e.target.value)
                                        setCatIndex(e.target.selectedIndex)
                                    }}>
                                        {categorySelect.map((value, i) => (
                                            <option key={i} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </Select>
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
                                    <Button
                                        mt="5"
                                        w="100%"
                                        colorScheme="green"
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        Next
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
    );
};

export default ResellCreate;

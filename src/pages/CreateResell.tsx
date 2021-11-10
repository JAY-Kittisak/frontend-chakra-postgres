import React, { useState } from "react";
import {
    Text,
    Flex,
    Button,
    Divider,
    Table,
    Tbody,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { Form, Formik } from "formik";

import { useIsAuth } from "../utils/uselsAuth";
import { useMeQuery } from "../generated/graphql";
import ResellItem from "../components/resell/ResellItem";
import InputField from "../components/InputField";
import SelectCompany from "../components/resell/SelectCompany";


interface Props { }

type ValuesDemo = {
    maker: string;
    title: string;
    detail: string;
    orderById: number;
    resellId: number;
}

const CreateResell: React.FC<Props> = () => {
    useIsAuth();

    const [myArray, updateMyArray] = useState<ValuesDemo[]>([]);

    const history = useHistory();

    const [{ data }] = useMeQuery();

    return (
        <Flex flexDir="column">
            <Flex>
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    Resell
                </Text>
                {(data?.me?.position === "หัวหน้างาน" ||
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
                    maker: "Yamawa หรือ moldino",
                    title: "",
                    detail: "",
                    orderById: 0,
                    resellId: 0
                }}
                onSubmit={async (
                    values,
                    // { setErrors }
                ) => {
                    console.log(values.maker)
                    updateMyArray(arr => [...arr, values]);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Flex>
                            <Flex
                                flexDir="column"
                                w="60%"
                                p="6"
                                mt="8"
                                boxShadow="xl"
                                borderRadius="md"
                                align="center"
                                bg="white"
                            >

                                <Text fontSize="2xl" fontWeight="bold">
                                    บันทึกรายละเอียด
                                </Text>
                                <Flex flexDir="column" w="80%" mb="5" >
                                    <InputField
                                        name="orderById"
                                        placeholder="บริษัท.."
                                        label="บริษัท :"
                                    />
                                    <InputField
                                        name="maker"
                                        placeholder="YAMAWA"
                                        label="Maker :"
                                    />

                                    <InputField
                                        name="title"
                                        placeholder="ชื่อ Product..."
                                        label="ชื่อ Product :"
                                    />

                                    <InputField
                                        textarea
                                        name="detail"
                                        placeholder="รายละเอียด..."
                                        label="รายละเอียดการผลิต :"
                                    />

                                    <Flex w="50%">
                                        <InputField
                                            type="number"
                                            name="resellId"
                                            placeholder="ขายให้กับบริษัท..."
                                            label="ขายให้กับบริษัท :"
                                        />
                                        <Button
                                            ml="5"
                                            mt="10"
                                            colorScheme="green"
                                        >
                                            + เพิ่ม
                                        </Button>
                                    </Flex>

                                    <Button
                                        mt="5"
                                        w="100%"
                                        colorScheme="green"
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        Save
                                    </Button>

                                </Flex>
                            </Flex>
                            <SelectCompany />
                        </Flex>
                    </Form>
                )}
            </Formik>


            <Table
                borderRadius="md"
                boxShadow="xl"
                my="10"
                variant="simple"
                colorScheme="blackAlpha"
            >
                <Thead>
                    <Tr bg="#028174">
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                        >
                            ชื่อ maker
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                        >
                            ชื่อ Product
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                        >
                            รายละเอียดการผลิต
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                            w="10%"
                        >
                            สาขา
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                            w="20%"
                        >
                            บริษัทที่สั่งซื้อ
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                            w="20%"
                        >
                            ขายต่อให้กับ
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {myArray.map((item, i) => (
                        <ResellItem key={i} item={item} />
                    ))}
                </Tbody>
            </Table>
        </Flex>
    );
};

export default CreateResell;

import React from "react";
import {
    Text,
    Flex,
    Button,
    Divider,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { Form, Formik } from "formik";

import { useIsAuth } from "../utils/uselsAuth";
import { useMeQuery } from "../generated/graphql";
import InputField from "../components/InputField";
import SelectCustomer from "../components/resell/SelectCustomer";
import SelectControl from "../components/Selectfield";

interface Props { }

type SelectMaker = "YAMAWA" | "MOLDINO"
// SelectMaker[]
const catMaker: Array<SelectMaker> = ["YAMAWA", "MOLDINO"]

const ResellCreate: React.FC<Props> = () => {
    useIsAuth();

    // const [, updateMyArray] = useState<ValuesDemo[]>([]);

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
                    customerCode: "",
                    maker: "YAMAWA",
                    title: "",
                    detail: "",
                    category: ""
                }}
                onSubmit={async (
                    values,
                    // { setErrors }
                ) => {
                    // updateMyArray(arr => [...arr, values]);
                    console.table(values)
                    history.push("/resell/step2");
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
                                        name="customerCode"
                                        placeholder="Customer code..."
                                        label="Customer Code :"
                                    />

                                    <Text
                                        fontWeight="semibold"
                                        fontSize={["sm", "md"]}
                                        mb="2"
                                        mt="3"
                                    >
                                        Maker :
                                    </Text>

                                    <SelectControl name="maker">
                                        {catMaker.map((value, i) => (
                                            <option key={i} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </SelectControl>

                                    <InputField
                                        name="title"
                                        placeholder="หัวเรื่อง.."
                                        label="หัวเรื่อง :"
                                    />
                                    <InputField
                                        textarea
                                        name="detail"
                                        placeholder="รายละเอียด..."
                                        label="รายละเอียดการผลิต :"
                                    />
                                    <InputField
                                        name="category"
                                        placeholder="ประเภท..."
                                        label="ประเภท :"
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
                            <SelectCustomer />
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Flex>
    );
};

export default ResellCreate;

import React, { useState } from "react";
import { Flex, Text, Divider, Button, Box, Grid } from "@chakra-ui/react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useHistory } from "react-router";

import InputField from "../components/InputField";
import { useCreateJobItMutation, FieldError } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from '../utils/uselsAuth'
import TextError from "../components/TextError";

interface Props { }

const radioOptions = [
    { name: "Altas", value: "altas" },
    { name: "Hardware", value: "hardware" },
    { name: "Software", value: "software" },
    { name: "Network", value: "network" },
    { name: "Email", value: "email" },
    { name: "UPS", value: "ups" },
    { name: "โทรศัพท์", value: "โทรศัพท์" },
];

const CreateJobIT: React.FC<Props> = () => {
    useIsAuth()
    const [date, setDate] = useState(new Date());

    const [, createJobIt] = useCreateJobItMutation()

    const history = useHistory();

    const onChange = (date: Date) => {
        setDate(date);
    };

    let desiredDate = date.toDateString().split(" ")

    const dateToArray = { ...desiredDate }

    const newDate = new Date()

    return (
        <Flex flexDir="column">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
                แจ้งงาน IT
            </Text>

            <Divider orientation="horizontal" />

            <Flex flexDir="column" align="center">
                <Formik
                    initialValues={{
                        category: "",
                        titled: "",
                    }}
                    onSubmit={async (values, { setErrors }) => {

                        if (date.toLocaleDateString() < newDate.toLocaleDateString()) return alert("ย้อนเวลาไม่ได้")

                        const obj = { desiredDate: date.toLocaleDateString() }
                        const mergeObj = { ...values, ...obj }

                        const response = await createJobIt({ input: mergeObj });
                        if (response.data?.createJobIT.errors) {
                            setErrors(toErrorMap(response.data.createJobIT.errors as FieldError[]));
                        } else if (response.data?.createJobIT.jobIT) {
                            history.push("/job-it/me")
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Box
                                w="600px"
                                p="10"
                                bg="#fff"
                                rounded="7px"
                                boxShadow="xl"
                                mb="3"
                            >
                                <Text fontSize="xl" mb="2">เลือกประเภท :</Text>
                                <Grid
                                    ml="10"
                                    templateColumns={["repeat(3, 1fr)"]}
                                    gap={6}
                                    role="group"
                                    aria-labelledby="my-radio-group"
                                >
                                    {radioOptions.map((radio, index) => (
                                        <label key={index}>
                                            <Field type="radio" name="category" value={radio.value} />
                                            &nbsp; {radio.name}
                                        </label>
                                    ))}
                                </Grid>
                                <Box align="center" mb="-5">
                                    <ErrorMessage name="category" component={TextError} />
                                </Box>
                            </Box>

                            <Box
                                w="600px"
                                p="5"
                                bg="#fff"
                                rounded="7px"
                                boxShadow="xl"
                                mb="3"
                            >
                                <InputField
                                    textarea
                                    name="titled"
                                    placeholder="รายละเอียด..."
                                    label="รายละเอียด :"
                                />
                            </Box>

                            <Box w="600px" p="3" bg="#fff" rounded="7px" boxShadow="xl" mb="3">
                                <Text fontSize="2xl" mb="1">วันที่ต้องการ : {date.toLocaleDateString()}</Text>
                                <Box w="100%" p="2" bg="#006EDC" rounded="7px" boxShadow="xl">
                                    <Flex>
                                        <Flex flexDir="column" bg="#006EDC" w="250px" p="10" align="center">
                                            <Text fontSize="5xl" fontWeight="bold" color="white">
                                                {dateToArray[1]}
                                            </Text>
                                            <Text fontSize="6xl" fontWeight="bold" color="white">
                                                {dateToArray[2]}
                                            </Text>
                                            <Text fontSize="4xl" fontWeight="bold" color="white">
                                                {dateToArray[3]}
                                            </Text>
                                        </Flex>
                                        <Calendar onChange={onChange} value={date} />
                                    </Flex>
                                </Box>
                            </Box>

                            <Button
                                w="100%"
                                colorScheme="green"
                                isLoading={isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Flex>
        </Flex>
    );
};

export default CreateJobIT;

import React, { useState } from "react";
import { Flex, Text, Divider, Button, Box, Grid } from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import InputField from "../components/InputField";

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

const JobIT: React.FC<Props> = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (date: Date) => {
        setDate(date);
    };

    let desiredDate = date.toDateString().split(" ")

    const dateToArray = { ...desiredDate }

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
                    onSubmit={async (values) => {
                        console.log(values);
                        console.log("desiredDate ==> ", date.toLocaleDateString());
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

export default JobIT;

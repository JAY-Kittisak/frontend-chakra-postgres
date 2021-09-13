import React from 'react'
import { Flex, Text, Divider, Button, Box } from '@chakra-ui/react'
import { Form, Formik, Field } from "formik";

import InputField from "../components/InputField";

interface Props { }

const JobIT: React.FC<Props> = () => {
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
            <Divider mt={1} mb={5} orientation="horizontal" />


            <Flex
                justifyContent="center"
                bg="#eee"
                h="100%"
                p="10"
                rounded="7px"
            >
                <Box
                    w="600px"
                    p="10"
                    bg="#fff"
                    rounded="7px"
                    boxShadow="xl"
                >
                    <Formik
                        initialValues={{
                            category: "",
                            titled: "",
                            desiredDate: "",
                        }}
                        onSubmit={async () => { }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Text fontSize="xl">
                                    ประเภท
                                </Text>
                                <Flex role="group" aria-labelledby="my-radio-group">
                                    <label>
                                        <Field
                                            type="radio"
                                            name="category"
                                            value="Altas"
                                        />
                                        Altas
                                    </label>

                                    <label>
                                        <Field
                                            type="radio"
                                            name="category"
                                            value="hardware"
                                        />
                                        hardware
                                    </label>

                                    <label>
                                        <Field
                                            type="radio"
                                            name="category"
                                            value="software"
                                        />
                                        software
                                    </label>
                                </Flex>

                                <InputField
                                    textarea
                                    name="titled"
                                    placeholder="รายละเอียด..."
                                    label="รายละเอียด"
                                />

                                <Button
                                    w="100%"
                                    mt="5"
                                    colorScheme="green"
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex>
        </Flex >
    )
}

export default JobIT
import React from "react";
import { Flex, Text, Divider, Button, Grid, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import InputField from "../components/InputField";
import {
    useCreateGiveCatMutation,
    useGiveCategoriesQuery,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { FieldError } from "../generated/graphql";
import Spinner from "../components/Spinner";

interface Props { }

const ManageGiveCategory: React.FC<Props> = () => {
    const [, createGiveCat] = useCreateGiveCatMutation();
    const [{ data, fetching }] = useGiveCategoriesQuery();

    return (
        <>
            <Flex>
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    bgGradient="linear(to-l, #7928CA,#FF0080)"
                    bgClip="text"
                >
                    เพิ่มกลุ่มสินค้าใหม่
                </Text>

                <Formik
                    initialValues={{
                        catName: "",
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await createGiveCat({ catName: values.catName });
                        if (response.data?.createGiveCat.errors) {
                            setErrors(
                                toErrorMap(response.data.createGiveCat.errors as FieldError[])
                            );
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Flex my="-1" ml="5" mb="2">
                                <InputField
                                    name="catName"
                                    placeholder="เพิ่มกลุ่มสินค้า..."
                                    label=""
                                />
                                <Button
                                    mt="2"
                                    ml="2"
                                    w="100%"
                                    colorScheme="green"
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Flex>
            <Divider orientation="horizontal" />
            {fetching && (
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            )}
            <Grid templateColumns={["repeat(5, 1fr)"]} gap={6} w="600px" mt="3">
                {data?.giveCategories &&
                    data.giveCategories.map((cat) => (
                        <Flex
                            w="250px"
                            flexDir="column"
                            align="center"
                            rounded="7px"
                            boxShadow="md"
                            p="3"
                            ml="5"
                            bg="#eee"
                            key={cat.id}
                        >
                            <Stack isInline>
                                <Text isTruncated>{cat.catName}</Text>
                            </Stack>
                        </Flex>
                    ))}
            </Grid>
        </>
    );
};

export default ManageGiveCategory;

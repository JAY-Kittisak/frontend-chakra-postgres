import React, { useRef } from 'react'
import {
    Button, Text, Box, Grid, AlertDialog, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from "@chakra-ui/react";
import { Form, Formik, Field, ErrorMessage } from "formik";

import TextError from "../TextError";
import { FieldError, useUpdateRolesMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

interface Props {
    userId: number
    userName: string
    open: boolean
    setOpen: () => void;
}

const radioOptions = [
    { name: "Client ลาดกระบัง", value: "client-LKB" },
    { name: "Client ชลบุรี่", value: "client-CDC" },
    { name: "Admin", value: "admin" },
    { name: "Supper Admin", value: "superAdmin" },
];

const positionOptions = [
    { name: "หัวหน้างาน", value: "หัวหน้างาน" },
    { name: "พนังงานทั่วไป", value: "พนังงานทั่วไป" },
    { name: "General Manager", value: "GM" },
];

const radioBranch = [
    { name: "ลาดกระบัง", value: "0" },
    { name: "ชลบุรี่", value: "1" },
];

const UpdateRoles: React.FC<Props> = ({ userId, userName, open, setOpen }) => {
    const cancelRef = useRef();
    const [, updateRoles] = useUpdateRolesMutation()

    return (
        <AlertDialog
            isOpen={open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    newRoles: "",
                    newPosition: "",
                    newBranch: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values.newBranch)
                    const response = await updateRoles({
                        id: userId,
                        newRoles: values.newRoles,
                        newPosition: values.newPosition,
                        newBranch: values.newBranch
                    });
                    if (response.data?.updateRoles.errors) {
                        setErrors(toErrorMap(response.data.updateRoles.errors as FieldError[]));
                    } else if (response.data?.updateRoles.user) {
                        setOpen()
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Update Roles and Position &nbsp;
                                <Text as="u" color="red.600">
                                    {userName}
                                </Text>
                            </AlertDialogHeader>
                            <Form>
                                <AlertDialogBody>

                                    <Text fontSize="xl" my="2">New Branch :</Text>
                                    <Grid
                                        templateColumns={["repeat(2, 1fr)"]}
                                        gap={6}
                                        role="group"
                                        aria-labelledby="my-radio-group"
                                        rounded="7px"
                                        boxShadow="base"
                                        p="6"
                                        bg="white"
                                    >
                                        {radioBranch.map((radio, index) => (
                                            <label key={index}>
                                                <Field type="radio" name="newBranch" value={radio.value} />
                                                &nbsp; {radio.name}
                                            </label>
                                        ))}
                                    </Grid>

                                    <Text fontSize="xl" mb="2">New Roles :</Text>
                                    <Grid
                                        templateColumns={["repeat(2, 1fr)"]}
                                        gap={6}
                                        role="group"
                                        aria-labelledby="my-radio-group"
                                        rounded="7px"
                                        boxShadow="base"
                                        p="6"
                                        bg="white"
                                    >
                                        {radioOptions.map((radio, index) => (
                                            <label key={index}>
                                                <Field type="radio" name="newRoles" value={radio.value} />
                                                &nbsp; {radio.name}
                                            </label>
                                        ))}
                                    </Grid>

                                    <Text fontSize="xl" my="2">New Position :</Text>
                                    <Grid
                                        templateColumns={["repeat(2, 1fr)"]}
                                        gap={6}
                                        role="group"
                                        aria-labelledby="my-radio-group"
                                        rounded="7px"
                                        boxShadow="base"
                                        p="6"
                                        bg="white"
                                    >
                                        {positionOptions.map((radio, index) => (
                                            <label key={index}>
                                                <Field type="radio" name="newPosition" value={radio.value} />
                                                &nbsp; {radio.name}
                                            </label>
                                        ))}
                                    </Grid>
                                    <Box align="center" mt="3">
                                        <ErrorMessage name="newRoles" component={TextError} />
                                        <ErrorMessage name="newPosition" component={TextError} />
                                        <ErrorMessage name="newBranch" component={TextError} />
                                    </Box>

                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button
                                        colorScheme="green"
                                        isLoading={isSubmitting}
                                        type="submit"
                                        mr="3"
                                    >
                                        Save
                                    </Button>
                                    <Button ref={cancelRef.current} onClick={setOpen}>
                                        Cancel
                                    </Button>
                                </AlertDialogFooter>
                            </Form>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                )}
            </Formik>
        </AlertDialog>
    )
}

export default UpdateRoles
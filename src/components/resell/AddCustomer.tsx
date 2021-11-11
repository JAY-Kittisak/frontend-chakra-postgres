import React, { useState, useRef } from 'react'
import {
    Flex,
    Text,
    Button,
    Select,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from '../InputField';
import {
    useAmphuresPvIdQuery,
    useDistrictsApIdQuery,
    useQueryProvincesQuery
} from '../../generated/graphql';
import Spinner from '../Spinner';

interface Props {
    open: boolean;
    setOpen: () => void;
}

const AddCustomer: React.FC<Props> = ({ open, setOpen }) => {
    const [provinceId, setProvinceId] = useState(1)
    const [amphureId, setAmphureId] = useState(1)
    const [districtId, setDistrictId] = useState("พระบรมมหาราชวัง")

    const cancelRef = useRef();

    const [{ data, fetching }] = useQueryProvincesQuery()
    const [{ data: amphures }] = useAmphuresPvIdQuery({
        variables: {
            id: provinceId,
        },
    })
    const [{ data: districts }] = useDistrictsApIdQuery({
        variables: {
            id: amphureId,
        },
    })

    // const onChangeProvince = (id: number) => {
    //     setProvinceId(id)
    // }
    console.log("งงควยไรสัส", districtId)
    return (
        <AlertDialog
            size="xl"
            isOpen={open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <Formik
                initialValues={{
                    customerCode: "",
                    customerName: "",
                }}
                onSubmit={async (values) => {
                    console.log("values", values)
                    // console.log("provincesId", provincesId)
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Add New Customer
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <Form>
                                <AlertDialogBody>
                                    {fetching ? (
                                        <Flex justify="center" mt="5">
                                            <Spinner color="grey" height={30} width={30} />
                                            <Text fontSize="xl">
                                                &nbsp; Loading...
                                            </Text>
                                        </Flex>
                                    ) : (
                                        <>
                                            <Flex flexDir="column">
                                                <Flex>
                                                    <Flex mr="5">
                                                        <InputField
                                                            name="customerCode"
                                                            placeholder="Code..."
                                                            label="Customer Code"
                                                        />
                                                    </Flex>
                                                    <InputField
                                                        name="customerName"
                                                        placeholder="Name..."
                                                        label="Customer Name"
                                                    />
                                                </Flex>
                                            </Flex>

                                            <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="3">
                                                Provinces
                                            </Text>
                                            <Select
                                                onChange={(e) => setProvinceId(+e.target.value)}
                                            >
                                                {data?.queryProvinces.map((val) => (
                                                    <option key={val.id} value={val.id}>
                                                        {val.name_th}
                                                    </option>
                                                ))}
                                            </Select>

                                            <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="3">
                                                Amphures
                                            </Text>
                                            <Select
                                                onChange={(e) => setAmphureId(+e.target.value)}
                                            >
                                                {amphures?.amphuresPvId.map((val) => (
                                                    <option key={val.id} value={val.id}>
                                                        {val.name_th}
                                                    </option>
                                                ))}
                                            </Select>

                                            <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="3">
                                                Districts
                                            </Text>
                                            <Select
                                                onChange={(e) => setDistrictId(e.target.value)}
                                            >
                                                {districts?.districtsApId.map((val) => (
                                                    <option key={val.id} value={val.name_th}>
                                                        {val.name_th}
                                                    </option>
                                                ))}
                                            </Select>
                                        </>
                                    )}

                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef.current} onClick={setOpen}>
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="green"
                                        isLoading={isSubmitting}
                                        type="submit"
                                        ml={3}
                                    >
                                        Save
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

export default AddCustomer
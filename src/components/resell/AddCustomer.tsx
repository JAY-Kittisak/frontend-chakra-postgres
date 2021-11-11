import React, { useState, useRef } from 'react'
import {
    Flex,
    Text,
    Button,
    Select,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Input,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
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
    const [amphureId, setAmphureId] = useState(0)
    const [item, setItem] = useState({
        province: "กรุงเทพมหานคร",
        amphure: "",
        district: ""
    })
    const [districtIndex, setDistrictIndex] = useState<number | undefined>(undefined)

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

    const onChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Error e.nativeEvent.target.selectedIndex
        let index = e.target.selectedIndex
        let label = (e.target[index] as HTMLOptionElement).text
        setItem({ ...item, [e.target.name]: label })
        setProvinceId(+e.target.value)
    }
    const onChangeAmphure = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let index = e.target.selectedIndex
        let label = (e.target[index] as HTMLOptionElement).text
        setItem({ ...item, [e.target.name]: label })

        setAmphureId(+e.target.value)
    }

    const onChangeDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let index = e.target.selectedIndex
        let label = (e.target[index] as HTMLOptionElement).text
        setItem({ ...item, [e.target.name]: label })
        setDistrictIndex(index)
    }

    console.log("districtIndex", districtIndex)

    console.log("งงควยไรสัส", item)
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
                            <AlertDialogHeader fontSize="xl" fontWeight="bold" align="center">
                                Add New Customer
                            </AlertDialogHeader>

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
                                                <Flex flexDir="column" mt="-3">
                                                <Flex>
                                                    <Flex mr="5">
                                                        <InputField
                                                            name="customerCode"
                                                                placeholder="Code"
                                                            label="Customer Code"
                                                        />
                                                    </Flex>
                                                    <InputField
                                                        name="customerName"
                                                            placeholder="Name"
                                                        label="Customer Name"
                                                    />
                                                </Flex>
                                            </Flex>
                                                <Flex>
                                                    <Flex w="50%" flexDir="column">
                                                        <Text mr="3" fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="2">
                                                            Phone
                                                        </Text>
                                                        <InputGroup>
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                children={<PhoneIcon color="green" />}
                                                            />
                                                            <Input type="tel" placeholder="Phone number" />
                                                        </InputGroup>
                                                    </Flex>
                                                    <Flex ml="5" w="50%" flexDir="column">
                                                        <Text mr="3" fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="2">
                                                            Email
                                                        </Text>
                                                        <InputGroup>
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                children={<AtSignIcon color="green.700" />}
                                                            />
                                                            <Input type="tel" placeholder="Email" />
                                                        </InputGroup>
                                                    </Flex>
                                                </Flex>

                                                <Flex>
                                                    <Flex w="50%" flexDir="column">
                                                        <Text mr="3" fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="3">
                                                            Provinces
                                                        </Text>
                                                        <Select
                                                            mt="1"
                                                            name="province"
                                                            onChange={(e) => onChangeProvince(e)}
                                                        >
                                                            {data?.queryProvinces.map((val, i) => (
                                                                <option key={i} value={val.id}>
                                                                    {val.name_th}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    </Flex>
                                                    <Flex ml="5" w="50%" flexDir="column">
                                                        <Text mr="3" fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="3">
                                                            Amphures
                                                        </Text>
                                                        <Select
                                                            mt="1"
                                                            name="amphure"
                                                            onChange={(e) => onChangeAmphure(e)}
                                                        >
                                                            {amphures?.amphuresPvId.map((val, i) => (
                                                                <option key={i} value={val.id}>
                                                                    {val.name_th}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    </Flex>
                                                </Flex>

                                                <Flex>
                                                    <Flex w="50%" flexDir="column">
                                                        <Text mr="5" fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="3">
                                                            Districts
                                                        </Text>
                                                        <Select
                                                            mt="1"
                                                            name="district"
                                                            onChange={(e) => onChangeDistrict(e)}
                                                        >
                                                            {districts?.districtsApId.map((val, i) => (
                                                                <option key={i} value={val.id}>
                                                                    {val.name_th}
                                                                </option>
                                                            ))}
                                                        </Select>
                                                    </Flex>
                                                    {districtIndex &&
                                                        <Flex ml="5" w="50%" flexDir="column">
                                                            <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="1" mt="3">
                                                                รหัสไปรษณีย์
                                                            </Text>
                                                            <Box
                                                                mt="2"
                                                                w="100%"
                                                                boxShadow="base"
                                                                p="1"
                                                                rounded="md"
                                                                bg="white"
                                                            >
                                                                <Text ml="3" fontSize="lg">
                                                                    {districts?.districtsApId[districtIndex].zip_code}
                                                                </Text>
                                                            </Box>
                                                        </Flex>
                                                    }
                                                </Flex>
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
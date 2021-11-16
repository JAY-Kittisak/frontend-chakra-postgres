import React, { useState, useRef, useEffect } from "react";
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
    Input,
    InputGroup,
    InputLeftElement,
    FormLabel
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";

import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../InputField";
import {
    useAmphuresPvIdQuery,
    useCreateCustomerMutation,
    useDistrictsApIdQuery,
    useQueryProvincesQuery,
    FieldError
} from "../../generated/graphql";
import Spinner from "../Spinner";

interface Props {
    open: boolean;
    setOpen: () => void;
}

const AddCustomer: React.FC<Props> = ({ open, setOpen }) => {
    const [provinceId, setProvinceId] = useState(1);
    const [amphureId, setAmphureId] = useState(0);

    const [item, setItem] = useState({
        province: "กรุงเทพมหานคร",
        amphure: "",
        district: "",
        phone: "",
        email: "",
    });
    const [zipCode, setZipCode] = useState({
        zipCode: 0
    });

    const [districtIndex, setDistrictIndex] = useState(0);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [err, setErr] = useState("");

    const cancelRef = useRef();

    const [{ data, fetching }] = useQueryProvincesQuery();
    const [{ data: amphures }] = useAmphuresPvIdQuery({
        variables: {
            id: provinceId,
        },
    });
    const [{ data: districts }] = useDistrictsApIdQuery({
        variables: {
            id: amphureId,
        },
    });

    const [, createCustomer] = useCreateCustomerMutation()

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const REGEX_PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (REGEX_PHONE.test(e.target.value)) {
            setItem({ ...item, [e.target.name]: e.target.value });
            setInvalidPhone(false);
        } else {
            setInvalidPhone(true);
        }
        if (e.target.value.length === 1) {
            if (+e.target.value !== 0) {
                e.target.value = "";
                return e.preventDefault();
            }
        }
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const REGEX_EMAIL =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (REGEX_EMAIL.test(e.target.value)) {
            setItem({ ...item, [e.target.name]: e.target.value });
            setInvalidEmail(false);
        } else {
            setInvalidEmail(true);
        }
    };

    const onChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //FIXME: Error e.nativeEvent.target.selectedIndex
        let index = e.target.selectedIndex;
        let label = (e.target[index] as HTMLOptionElement).text;
        setItem({ ...item, [e.target.name]: label });
        setProvinceId(+e.target.value);
    };
    const onChangeAmphure = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let index = e.target.selectedIndex;
        let label = (e.target[index] as HTMLOptionElement).text;
        setItem({ ...item, [e.target.name]: label });
        setAmphureId(+e.target.value);
    };

    const onChangeDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let index = e.target.selectedIndex;
        let label = (e.target[index] as HTMLOptionElement).text;

        setItem({ ...item, [e.target.name]: label });
        setZipCode({
            zipCode: districts?.districtsApId
                ? districts.districtsApId[districtIndex].zip_code
                : 0
        })

        setDistrictIndex(index);
    };

    useEffect(() => {
        if (districts?.districtsApId.length === 0) {
            setItem({ ...item, district: "" });
            setZipCode({ zipCode: 0 })
        }
    }, [districts?.districtsApId, setItem]) // eslint-disable-line react-hooks/exhaustive-deps

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
                    address: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    const sumArr = { ...values, ...item, ...zipCode };

                    const response = await createCustomer({ input: sumArr })
                    if (response.data?.createCustomer.errors) {
                        setErr(response.data.createCustomer.errors[0].field)
                        setErrors(toErrorMap(response.data.createCustomer.errors as FieldError[]));
                    } else if (response.data?.createCustomer.customers) {
                        setOpen()
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="xl" fontWeight="bold" align="center">
                                Add New Customer
                            </AlertDialogHeader>

                            <Form>
                                <AlertDialogBody minH="250px">
                                    {fetching ? (
                                        <Flex justify="center" mt="5">
                                            <Spinner color="grey" height={30} width={30} />
                                            <Text fontSize="xl">&nbsp; Loading...</Text>
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
                                                            label="ชื่อบริษัท"
                                                    />
                                                </Flex>
                                            </Flex>
                                                <Flex>
                                                    <Flex w="50%" flexDir="column">
                                                        <Text
                                                            mr="3"
                                                            fontWeight="semibold"
                                                            fontSize={["sm", "md"]}
                                                            mb="1"
                                                            mt="2"
                                                        >
                                                            เบอร์โทรศัพท์
                                                        </Text>
                                                        <InputGroup>
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                children={
                                                                    <PhoneIcon
                                                                        color={invalidPhone ? "crimson" : "gray.400"}
                                                                    />
                                                                }
                                                            />
                                                            <Input
                                                                // maxLength="11"
                                                                // isDisabled={!invalid}
                                                                isInvalid={invalidPhone}
                                                                errorBorderColor="crimson"
                                                                type="number"
                                                                name="phone"
                                                                placeholder="Phone number"
                                                                onChange={(e) => onChangePhone(e)}
                                                            />
                                                        </InputGroup>
                                                    </Flex>
                                                    <Flex ml="5" w="50%" flexDir="column">
                                                        <Text
                                                            mr="3"
                                                            fontWeight="semibold"
                                                            fontSize={["sm", "md"]}
                                                            mb="1"
                                                            mt="2"
                                                        >
                                                            อีเมล์
                                                        </Text>
                                                        <InputGroup>
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                children={
                                                                    <AtSignIcon
                                                                        color={invalidEmail ? "crimson" : "gray.400"}
                                                                    />
                                                                }
                                                            />
                                                            <Input
                                                                isInvalid={invalidEmail}
                                                                errorBorderColor="crimson"
                                                                name="email"
                                                                placeholder="Email"
                                                                onChange={(e) => onChangeEmail(e)}
                                                            />
                                                        </InputGroup>
                                                    </Flex>
                                                </Flex>

                                                <Flex flexDir="column">
                                                    <Flex>
                                                        <InputField
                                                            name="address"
                                                            placeholder="Address"
                                                            label="ที่อยู่"
                                                        />
                                                        <Flex flexDir="column" ml="5" w="530px">
                                                            <FormLabel fontWeight="semibold" mt="3">
                                                                รหัสไปรษณีย์
                                                            </FormLabel>
                                                            <Input isDisabled={zipCode.zipCode === 0} placeholder="Zip code" value={zipCode.zipCode} />
                                                        </Flex>
                                                    </Flex>
                                                </Flex>

                                                <Flex>
                                                    <Flex w="50%" flexDir="column">
                                                        <Text
                                                            mr="3"
                                                            fontWeight="semibold"
                                                            fontSize={["sm", "md"]}
                                                            mb="1"
                                                            mt="3"
                                                        >
                                                            จังหวัด
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
                                                        <Text
                                                            mr="3"
                                                            fontWeight="semibold"
                                                            fontSize={["sm", "md"]}
                                                            mb="1"
                                                            mt="3"
                                                        >
                                                            อำเภอ
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
                                                <Flex justify="center">
                                                    <Flex w="50%" flexDir="column" >
                                                        <Text
                                                            mr="5"
                                                            fontWeight="semibold"
                                                            fontSize={["sm", "md"]}
                                                            mb="1"
                                                            mt="3"
                                                        >
                                                            ตำบล
                                                        </Text>
                                                        <Select
                                                            isDisabled={districts?.districtsApId.length === 0}
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
                                                        <Text mt="3" color="red" align="center">
                                                            {(err === "district" || err === "amphure") && "โปรดเลือก อำเภอและตำบล"}
                                                        </Text>
                                                    </Flex>
                                                    {/* <Flex ml="5" w="50%" flexDir="column">
                                                            <Text
                                                                fontWeight="semibold"
                                                                fontSize={["sm", "md"]}
                                                                mb="1"
                                                                mt="3"
                                                            >
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
                                                                    {
                                                                        districts?.districtsApId[districtIndex]
                                                                            .zip_code
                                                                    }
                                                                </Text>
                                                            </Box>
                                                        </Flex> */}
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
    );
};

export default AddCustomer;

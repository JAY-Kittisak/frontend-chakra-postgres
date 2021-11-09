import React, { useState, useEffect } from "react";
import {
    Text,
    Flex,
    Button,
    Divider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Select
} from "@chakra-ui/react";
import { ChevronDownIcon, CalendarIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useHistory } from "react-router";

import { useIsAuth } from '../utils/uselsAuth'
import InputField from "../components/InputField";
import SelectControl from "../components/Selectfield";
import { catLeave, LeaveType } from "../utils/helpers";
import { toErrorMap } from "../utils/toErrorMap";
import ViewQuota from "../components/leave/ViewQuota";
import { useCreateLeaveMutation, useMeQuery, FieldError } from "../generated/graphql";

const catDate = [
    "0 วัน", "0.5 วัน", "1 วัน", "2 วัน", "3 วัน", "4 วัน", "5 วัน", "6 วัน", "7 วัน", "8 วัน", "9 วัน",
    "10 วัน", "11 วัน", "12 วัน", "13 วัน", "14 วัน", "15 วัน", "16 วัน", "17 วัน", "18 วัน", "19 วัน",
    "20 วัน", "21 วัน", "22 วัน", "23 วัน", "24 วัน", "25 วัน", "26 วัน", "27 วัน", "28 วัน", "29 วัน", "30 วัน", "31 วัน",
];

const catHour = ["0 ช.ม.", "0.5 ช.ม.", "1 ช.ม.", "2 ช.ม.", "3 ช.ม.", "4 ช.ม."];

interface Props { }

const CreateLeave: React.FC<Props> = () => {
    useIsAuth()
    const [dateBegin, setDateBegin] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [dateBeginStr, setDateBeginStr] = useState("");
    const [dateEndStr, setDateEndStr] = useState("");

    const [title, setTitle] = useState<LeaveType>("ลากิจ");
    const [maternity, setMaternity] = useState("");

    const history = useHistory()

    const [{ data }] = useMeQuery()
    const [, createLeave] = useCreateLeaveMutation()

    const onChangeBegin = (dateBegin: Date) => {
        setDateBegin(dateBegin);
        setDateBeginStr(dateBegin.toLocaleDateString());
    };
    const onChangeEnd = (dateEnd: Date) => {
        setDateEnd(dateEnd);
        setDateEndStr(dateEnd.toLocaleDateString());
    };

    useEffect(() => {
        if (title === "ลาคลอดบุตร") {
            setMaternity("90 วัน")
        } else {
            setMaternity("")
        }
    }, [title])

    return (
        <Flex flexDir="column">
            <Flex>
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    ลางานออนไลน์
                </Text>
                {data?.me?.position === "หัวหน้างาน" && (
                    <Button
                        ml="10"
                        colorScheme="orange"
                        color="white"
                        onClick={() => {
                            history.push("/leave/approval")
                        }}>
                        อนุมัติลาให้ลูกน้อง
                    </Button>
                )}
            </Flex>
            <Divider orientation="horizontal" />

            <Formik
                initialValues={{
                    detail: "",
                    sumDate: "0 วัน",
                    sumHour: "0 ช.ม.",
                }}
                onSubmit={async (values, { setErrors }) => {
                    let valueDate = values.sumDate
                    let valueHour = values.sumHour
                    if (maternity) {
                        valueDate = maternity
                        valueHour = "0"
                    }

                    const response = await createLeave({
                        input: {
                            title: title,
                            detail: values.detail,
                            sumDate: valueDate.split(" ")[0],
                            sumHour: valueHour.split(" ")[0],
                            dateBegin: dateBeginStr,
                            dateEnd: dateEndStr,
                        }
                    })

                    if (response.data?.createLeave.errors) {
                        setErrors(toErrorMap(response.data.createLeave.errors as FieldError[]));
                    } else if (response.data?.createLeave.leave) {
                        history.push("/leave/me")
                    } else if (response.error) {
                        alert(" Error! โปรดใส่ข้อมูลให้ครบถ้วน หรือ โปรดแจ้ง IT")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Flex justify="center">
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
                                    คำขอ อนุมัติลางาน
                                </Text>
                                <Flex flexDir="column" w="80%" mb="5">



                                    <Text fontWeight="semibold" fontSize={["sm", "md"]} mb="2">
                                        ประเภทการลา :
                                    </Text>
                                    <Select
                                        size="md"
                                        variant="outline"
                                        value={title}
                                        icon={<ChevronDownIcon />}
                                        onChange={(e) => setTitle(e.target.value as LeaveType)}
                                    >
                                        {catLeave.map((value, i) => (
                                            <option key={i} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </Select>

                                    <InputField
                                        textarea
                                        name="detail"
                                        placeholder="รายละเอียด..."
                                        label="รายละเอียด/เหตุผลการลา :"
                                    />

                                    {maternity ? (
                                        <>
                                            <Text
                                                fontWeight="semibold"
                                                fontSize={["sm", "md"]}
                                                mt="3"
                                            >
                                                จำนวนวัน :
                                            </Text>
                                            <Flex w="200px" boxShadow="base" borderRadius="md">

                                                <Text
                                                    fontWeight="semibold"
                                                    fontSize={["sm", "md"]}
                                                    mt="2"
                                                    mb="1"
                                                    ml="5"
                                                >
                                                    90 วัน
                                                </Text>
                                            </Flex>
                                        </>
                                    ) : (
                                        <Flex justify="space-between">
                                            <Flex flexDir="column" minW="250px">
                                                <Text
                                                    fontWeight="semibold"
                                                    fontSize={["sm", "md"]}
                                                    mb="2"
                                                >
                                                    จำนวนวัน :
                                                </Text>
                                                <SelectControl name="sumDate">
                                                    {catDate.map((value, i) => (
                                                        <option key={i} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </SelectControl>
                                            </Flex>
                                            <Flex w="50%">
                                                <Flex flexDir="column" minW="250px">
                                                    <Text
                                                        fontWeight="semibold"
                                                        fontSize={["sm", "md"]}
                                                        mb="2"
                                                    >
                                                        จำนวนชั่วโมงที่ลา :
                                                    </Text>
                                                    <SelectControl name="sumHour">
                                                        {catHour.map((value, i) => (
                                                            <option key={i} value={value}>
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </SelectControl>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    )}
                                    <Flex>
                                        <Flex flexDir="column" w="50%">
                                            <Text fontWeight="semibold" my="3">
                                                ตั้งแต่วันที่ :{" "}
                                            </Text>
                                            <Flex>
                                                <Flex w="200px" boxShadow="base" borderRadius="md">
                                                    <Text p="2" color={dateBeginStr ? "" : "gray.400"}>
                                                        {dateBeginStr ? dateBeginStr : "เดือน/วันที่/ปี"}
                                                    </Text>
                                                </Flex>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button colorScheme="blackAlpha" color="white">
                                                            <CalendarIcon />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        <PopoverHeader>Begin Date</PopoverHeader>
                                                        <PopoverBody>
                                                            <Calendar
                                                                onChange={onChangeBegin}
                                                                value={dateBegin}
                                                            />
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Popover>
                                            </Flex>
                                        </Flex>
                                        <Flex flexDir="column" w="50%">
                                            <Text fontWeight="semibold" my="3">
                                                ถึงวันที่ :{" "}
                                            </Text>
                                            <Flex>
                                                <Flex w="200px" boxShadow="base" borderRadius="md">
                                                    <Text p="2" color={dateEndStr ? "" : "gray.400"}>
                                                        {dateEndStr ? dateEndStr : "เดือน/วันที่/ปี"}
                                                    </Text>
                                                </Flex>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button colorScheme="blackAlpha" color="white">
                                                            <CalendarIcon />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        <PopoverHeader>End Date</PopoverHeader>
                                                        <PopoverBody>
                                                            <Calendar
                                                                onChange={onChangeEnd}
                                                                value={dateEnd}
                                                            />
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Popover>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                <Button
                                    mt="5"
                                    w="50%"
                                    colorScheme="green"
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Flex>
                            <ViewQuota />
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Flex>
    );
};

export default CreateLeave;

import React, { useState } from "react";
import {
    Text,
    Flex,
    Box,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
    setStatus: (status: string) => void;
    arrayStatus: (number | undefined)[];
    arrayCat: (number | undefined)[];
    setDateBeginStrTo: (date: string) => void;
    setDateEndStrTo: (date: string) => void;
    graph: boolean
}

const ViewStatus: React.FC<Props> = ({
    setStatus,
    arrayStatus,
    arrayCat,
    setDateBeginStrTo,
    setDateEndStrTo,
    graph
}) => {
    const [dateBegin, setDateBegin] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    const [dateBeginStr, setDateBeginStr] = useState("");
    const [dateEndStr, setDateEndStr] = useState("");

    const dataCh = [
        {
            name: "Altas",
            value: arrayCat[0],
        },
        {
            name: "Hardware",
            value: arrayCat[1],
        },
        {
            name: "Software",
            value: arrayCat[2],
        },
        {
            name: "Network",
            value: arrayCat[3],
        },
        {
            name: "Email",
            value: arrayCat[4],
        },
        {
            name: "UPS",
            value: arrayCat[5],
        },
        {
            name: "โทรศัพท์",
            value: arrayCat[6],
        },
    ];

    const onChangeBegin = (dateBegin: Date) => {
        setDateBegin(dateBegin);
        setDateBeginStr(dateBegin.toDateString());
        setDateBeginStrTo(dateBegin.toDateString());
    };
    const onChangeEnd = (dateEnd: Date) => {
        setDateEnd(dateEnd);
        setDateEndStr(dateEnd.toDateString());
        setDateEndStrTo(dateEnd.toDateString());
    };
    return (
        <Flex flexDir="column" h={graph ? "700px" : "410px"} boxShadow="md" ml="5" rounded="lg" p="3">
            <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                Job Status
            </Text>
            <Box h={graph ? "100%" : "200px"} ml="-10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={dataCh}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#87CEFA" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
            <Flex w="100%" flexDir="column">
                <Flex flexDir="row" mb="3" mx="2" justify="center">
                    <Flex>
                    <Flex
                        w="25%"
                        color="cyan.600"
                        _hover={{ bgGradient: "linear(to-t, cyan.100, cyan.600)", textColor: "white" }}
                        cursor="pointer"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        h="100px"
                        p="3"
                        mr="3"
                        align="center"
                        onClick={() => setStatus("New")}
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {arrayStatus[0]}
                        </Text>
                        <Text fontSize="xs" fontWeight="bold">
                            New
                        </Text>
                    </Flex>

                    <Flex
                        w="25%"
                        color="orange"
                        _hover={{ bgGradient: "linear(to-t, orange.200, orange)", textColor: "white" }}
                        cursor="pointer"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        h="100px"
                        p="3"
                        mr="3"
                        align="center"
                        onClick={() => setStatus("Wait Approve")}
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {arrayStatus[1]}
                        </Text>
                        <Text fontSize="xs" fontWeight="bold">
                            WaitApprove
                        </Text>
                    </Flex>
                    <Flex
                        w="25%"
                        color="green"
                        _hover={{ bgGradient: "linear(to-t, green.200, green)", textColor: "white" }}
                        cursor="pointer"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        h="100px"
                        p="3"
                        mr="3"
                        align="center"
                        onClick={() => setStatus("Success")}
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {arrayStatus[2]}
                        </Text>
                        <Text fontSize="xs" fontWeight="bold">
                            Success
                        </Text>
                    </Flex>
                    <Flex
                        w="25%"
                        color="red"
                        _hover={{ bgGradient: "linear(to-t, red.200, red)", textColor: "white" }}
                        cursor="pointer"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        p="3"
                        align="center"
                        onClick={() => setStatus("Impossible")}
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {arrayStatus[3]}
                        </Text>
                        <Text fontSize="xs" fontWeight="bold">
                            Impossible
                        </Text>
                    </Flex>
                    </Flex>
                </Flex>
                <Flex justify="space-between">
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                mr="1"
                                bg="teal"
                                color="white"
                                _hover={{ bgColor: "green" }}
                                rightIcon={<ChevronDownIcon />}
                            >
                                {dateBeginStr ? dateBeginStr : "Begin"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Begin Date</PopoverHeader>
                            <PopoverBody>
                                <Calendar onChange={onChangeBegin} value={dateBegin} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger>
                            <Button
                                bg="orange.500"
                                color="white"
                                _hover={{ bgColor: "red" }}
                                rightIcon={<ChevronDownIcon />}
                            >
                                {dateEndStr ? dateEndStr : "End"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>End Date</PopoverHeader>
                            <PopoverBody>
                                <Calendar onChange={onChangeEnd} value={dateEnd} />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ViewStatus;

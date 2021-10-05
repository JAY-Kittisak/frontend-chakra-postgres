import React, { useState } from "react";
import {
    Text,
    Flex,
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
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
}

const ViewStatus: React.FC<Props> = ({
    setStatus,
    arrayStatus,
    arrayCat,
    setDateBeginStrTo,
    setDateEndStrTo,
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
        <Flex
            flexDir="column"
            w="375px"
            h="410px"
            boxShadow="md"
            ml="5"
            rounded="lg"
            p="3"
        >
            <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                Job Status
            </Text>
            <Box h="200px" ml="-10">
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
            <Flex flexDir="column">
                <Flex flexDir="row" mb="3">
                    <Flex
                        color="cyan.600"
                        _hover={{ bgColor: "cyan.600", textColor: "white" }}
                        cursor="pointer"
                        w="100px"
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
                        <Text fontSize="xs" fontWeight="bold" >
                            New
                        </Text>
                    </Flex>

                    <Flex
                        color="orange"
                        _hover={{ bgColor: "orange", textColor: "white" }}
                        cursor="pointer"
                        w="100px"
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
                        color="green"
                        _hover={{ bgColor: "green", textColor: "white" }}
                        cursor="pointer"
                        w="100px"
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
                        color="red"
                        _hover={{ bgColor: "red", textColor: "white" }}
                        cursor="pointer"
                        w="100px"
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
                <Flex justifyContent="space-between">
                    <Flex mr="1">
                        <Menu>
                            <MenuButton
                                _hover={{ bgColor: "#00FA9A" }}
                                color="white"
                                bg="green"
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                            >
                                {dateBeginStr ? dateBeginStr : "Start"}
                            </MenuButton>
                            <MenuList>
                                <Calendar onChange={onChangeBegin} value={dateBegin} />
                            </MenuList>
                        </Menu>
                    </Flex>
                    <Flex ml="1">
                        <Menu>
                            <MenuButton
                                _hover={{ bgColor: "#FF6347" }}
                                color="white"
                                bg="red"
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                            >
                                {dateEndStr ? dateEndStr : "End"}
                            </MenuButton>
                            <MenuList>
                                <Calendar onChange={onChangeEnd} value={dateEnd} />
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ViewStatus;

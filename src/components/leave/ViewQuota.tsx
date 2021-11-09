import React, { useCallback, useEffect, useState } from "react";
import { Text, Flex, Box, Stack } from "@chakra-ui/react";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useLeavesQuery } from "../../generated/graphql";
import Spinner from "../Spinner";

interface Props { }

const ViewQuota: React.FC<Props> = () => {
    const [colorIndexPersonal, setColorIndexPersonal] = useState<number | undefined>(
        undefined
    );
    const [colorIndexSick, setColorIndexSick] = useState<number | undefined>(undefined);
    const [activeIndex, setActiveIndex] = useState(2);

    const [{ data, fetching }] = useLeavesQuery({
        variables: {
            createBy: true,
        },
    });

    let personalDate = 0;
    let personalHour = 0;

    let sickDate = 0;
    let sickHour = 0;

    let otherDate = 0;
    let otherHour = 0;

    if (data?.leaves) {
        const approve = data.leaves.filter(val => val.status === "อนุมัติแล้ว")

        const personal = approve.filter((val) => val.title === "ลากิจ");
        personalDate = personal
            .map((val) => val.sumDate)
            .reduce((accumulator, currentValue) => {
                return +accumulator + +currentValue;
            }, 0);
        personalHour = personal
            .map((val) => val.sumHour)
            .reduce((accumulator, currentValue) => {
                return +accumulator + +currentValue;
            }, 0);

        const sick = approve.filter((val) => val.title === "ลาป่วย");
        sickDate = sick
            .map((val) => val.sumDate)
            .reduce((accumulator, currentValue) => {
                return +accumulator + +currentValue;
            }, 0);
        sickHour = sick
            .map((val) => val.sumHour)
            .reduce((accumulator, currentValue) => {
                return +accumulator + +currentValue;
            }, 0);

        const other = approve.filter(
            (val) => val.title !== "ลากิจ" && val.title !== "ลาป่วย"
        );
        otherDate = other
            .map((val) => val.sumDate)
            .reduce((accumulator, currentValue) => {
                return +accumulator + +currentValue;
            }, 0);
        otherHour = other
            .map((val) => val.sumHour)
            .reduce((accumulator, currentValue) => {
                return +accumulator + +currentValue;
            }, 0);
    }

    const personalQuota = 6;
    const sickQuota = 5;

    const dataCh = [
        {
            name: "ลากิจ",
            quota: personalQuota,
            action: personalDate,
        },
        {
            name: "ลาป่วย",
            quota: sickQuota,
            action: sickDate,
        },
        {
            name: "ลาอื่นๆ",
            quota: 6,
            action: otherDate,
        },
    ];
    const activeItem = dataCh[activeIndex];

    useEffect(() => {
        if (personalDate >= personalQuota) {
            setColorIndexPersonal(0);
        } else {
            setColorIndexPersonal(undefined);
        }

        if (sickDate >= sickQuota) {
            setColorIndexSick(1);
        } else {
            setColorIndexSick(undefined);
        }
    }, [personalQuota, personalDate, sickDate, sickQuota]);

    const handleClick = useCallback(
        (_, index: number) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <Flex
            flexDir="column"
            w="30%"
            p="6"
            mt="8"
            ml="3"
            bg="white"
            boxShadow="xl"
            borderRadius="md"
        >
            <Flex justify="center">
                <Text fontSize="2xl" fontWeight="bold">
                    จำนวนวันคงเหลือ
                </Text>
            </Flex>
            {fetching ? (
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={30} width={30} />
                    <Text fontWeight="bold" fontSize="xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            ) : (
                <>
                    <Stack isInline mt={3} justify="space-between">
                        <Text>ลากิจ : {personalQuota} วัน </Text>
                        <Text>
                            ใช้ไปแล้ว {personalDate} วัน {personalHour} ชั่วโมง
                        </Text>
                    </Stack>
                    <Stack isInline mt={1} justify="space-between">
                        <Text>ลาป่วย : {sickQuota} วัน </Text>
                        <Text>
                            ใช้ไปแล้ว {sickDate} วัน {sickHour} ชั่วโมง
                        </Text>
                    </Stack>
                    <Text mt={1}>
                        ลาอื่นๆ : {otherDate} วัน {otherHour} ชั่วโมง
                    </Text>
                    <Flex justify="center">
                        <Text mt={1}>
                            รวม : {personalDate + sickDate + otherDate} วัน{" "}
                            {personalHour + sickHour + otherHour} ชั่วโมง
                        </Text>
                    </Flex>
                        <Box h="200px" ml="-10" mt="10">
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
                                    <Bar dataKey="quota" onClick={handleClick}>
                                        {dataCh.map((_, index) => (
                                            <Cell
                                                cursor="pointer"
                                                fill={
                                                    index === activeIndex
                                                        ? "#bebebe"
                                                        : "#5ecf64"
                                                }
                                                key={`cell-${index}`}
                                            />
                                        ))}
                                    </Bar>

                                    <Bar dataKey="action" onClick={handleClick}>
                                        {dataCh.map((_, index) => (
                                            <Cell
                                                cursor="pointer"
                                                fill={
                                                    index === activeIndex
                                                        ? "#bebebe"
                                                        : index === colorIndexSick
                                                            ? "#d81515"
                                                            : index === colorIndexPersonal
                                                                ? "#d81515"
                                                                : "#80f035"
                                                }
                                                key={`cell-${index}`}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        <Flex mt={3} justify="center" fontSize="xl" >
                            {activeItem.name} : {activeItem.quota} วัน
                            ใช้ไปแล้ว <Text fontSize="xl" fontWeight="bold" color="red">&nbsp;{activeItem.action}&nbsp;</Text> วัน
                        </Flex>
                </>
            )}
        </Flex>
    );
};

export default ViewQuota;

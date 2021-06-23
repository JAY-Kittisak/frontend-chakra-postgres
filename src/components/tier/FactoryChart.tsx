import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Badge, Box, Text, Stack, Icon, Button, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { Factory } from "../../generated/graphql";

interface Props {
    industrialEstate: Factory[] | undefined
    industrialEstateSelect: string
}

const FactoryChart: React.FC<Props> = ({ industrialEstate, industrialEstateSelect }) => {
    const { toggleColorMode } = useColorMode()
    const bg = useColorModeValue("gray.200", "gray.700")
    const color = useColorModeValue("blue", "gray")
    const colorW = useColorModeValue("white", "white")

    const [switchX, setSwitchX] = useState<(number | undefined)[]>([])

    useEffect(() => {
        if (industrialEstateSelect === "All") {
            let arraySwitchX = []
            const resultK = industrialEstate?.filter((estate) => {
                return estate.industrialEstate === "แก่งคอย"
            }).length
            const resultH = industrialEstate?.filter((estate) => {
                return estate.industrialEstate === "แหลมฉบัง"
            }).length
            const resultHr = industrialEstate?.filter((estate) => {
                return estate.industrialEstate === "เหมราชอีสเทิร์นซีบอร์ด"
            }).length
            const resultAss = industrialEstate?.filter((estate) => {
                return estate.industrialEstate === "เอเซีย (สุวรรณภูมิ)"
            }).length
            const resultAs = industrialEstate?.filter((estate) => {
                return estate.industrialEstate === "เอเซีย"
            }).length
            const resultHr4 = industrialEstate?.filter((estate) => {
                return estate.industrialEstate === "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4"
            }).length
            arraySwitchX = [resultK, resultH, resultHr, resultAss, resultAs, resultHr4]
            setSwitchX(arraySwitchX)
        }

        if (!(industrialEstateSelect === "All")) {
            let arraySwitchX = []
            const result = industrialEstate?.filter((estate) => {
                return estate.industrialEstate === industrialEstateSelect
            }).length
            arraySwitchX = [result]
            setSwitchX(arraySwitchX)
        }

        // if (industrialEstateSelect === "แหลมฉบัง") {
        //     let arraySwitchX = []
        //     const result = industrialEstate?.filter((estate) => {
        //         return estate.industrialEstate === industrialEstateSelect
        //     }).length
        //     arraySwitchX = [result]
        //     setSwitchX(arraySwitchX)
        // }
        // if (industrialEstateSelect === "เหมราชอีสเทิร์นซีบอร์ด") {
        //     let arraySwitchX = []
        //     const result = industrialEstate?.filter((estate) => {
        //         return estate.industrialEstate === industrialEstateSelect
        //     }).length
        //     arraySwitchX = [result]
        //     setSwitchX(arraySwitchX)
        // }
        // if (industrialEstateSelect === "เอเซีย (สุวรรณภูมิ)") {
        //     let arraySwitchX = []
        //     const result = industrialEstate?.filter((estate) => {
        //         return estate.industrialEstate === industrialEstateSelect
        //     }).length
        //     arraySwitchX = [result]
        //     setSwitchX(arraySwitchX)
        // }
        // if (industrialEstateSelect === "เอเซีย") {
        //     let arraySwitchX = []
        //     const result = industrialEstate?.filter((estate) => {
        //         return estate.industrialEstate === industrialEstateSelect
        //     }).length
        //     arraySwitchX = [result]
        //     setSwitchX(arraySwitchX)
        // }
        // if (industrialEstateSelect === "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4") {
        //     let arraySwitchX = []
        //     const result = industrialEstate?.filter((estate) => {
        //         return estate.industrialEstate === industrialEstateSelect
        //     }).length
        //     arraySwitchX = [result]
        //     setSwitchX(arraySwitchX)
        // }

    }, [industrialEstateSelect, industrialEstate])

    const xAxis = industrialEstate?.map((estate) => {
        return estate;
    })
        .filter(
            (item, pos, self) =>
                self.findIndex((v) => v.industrialEstate === item.industrialEstate) ===
                pos
        )
        .map((estate) => {
            return estate.industrialEstate
        })


    const data = {
        labels: xAxis,
        datasets: [
            {
                label: "My Balance",
                fill: false,
                lineTension: 0.5,
                backgroundColor: ["#db86b2", "#FFCD56", "#36A2EB", "#26c96f", "#8577d4"],
                borderColor: "#ffffff",
                borderCapStyle: "butt",
                borderDashOffset: 0.0,
                borderJoinStyle: "#B57295",
                pointBorderColor: "#B57295",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#24111b",
                pointHoverBorderColor: "#B57295",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: switchX
            },
        ],
    };

    const options = {
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    borderDash: [3, 3],
                },
                // beginAtZero: true, // this works
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <>
            <Box w="50%" rounded="10px" boxShadow="sm" bg={bg} mr="2">
                <Box w="300px" ml="150">
                    <Doughnut type="doughnut" data={data} options={options} />
                </Box>
                <Box p={5}>
                    <Stack isInline align="baseline">
                        <Badge variant="solid" colorScheme="pink" rounded="full" px={2}>
                            NEW!
                        </Badge>
                        <Badge variant="solid" colorScheme={color} rounded="full" px={2}>
                            ทดสอบ!
                        </Badge>
                        <Text
                            textTransform="uppercase"
                            fontSize="sm"
                            colorScheme={color}
                            letterSpacing="wide"
                        >
                            2 Hours &bull; 12 lectures
                        </Text>
                    </Stack>
                    <Text as="h2" fontWeight="semibold" fontSize="xl" my={2} color="pink.500">
                        นิคมอุตสาหกรรม
                    </Text>
                    <Text isTruncated fontWeight="light" fontSize="md">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui commodi,
                        <br />
                        numquam similique incidunt quam earum sit delectus. Repellat eum cumque,
                        harum quas beatae accusantium perspiciatis voluptas libero repudiandae,
                        veritatis alias.
                    </Text>
                    <Stack isInline justify="space-between">
                        <Text fontWeight="semibold" fontSize="lg">
                            $20
                        </Text>
                        <Box d="flex">
                            <Box as="span">
                                {Array(4)
                                    .fill("")
                                    .map((_, i) => (
                                        <Icon as={StarIcon} color="yellow.500" key={i} />
                                    ))}
                                <Icon as={StarIcon} mr="2" />
                            </Box>
                            <Text as="h3" fontWeight="light" fontSize="lg">
                                34 Reviews
                            </Text>
                        </Box>
                    </Stack>
                    <Box textAlign="center">
                        <Button
                            colorScheme={color}
                            size="lg"
                            mt={3}
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _active={{ boxShadow: "lg" }}
                            onClick={toggleColorMode}
                        >
                            <Text color={colorW}>
                                เพิ่มโรงงานใหม่
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>


            <Box w="50%" rounded="10px" boxShadow="sm" bg={bg} mr="5">
                <Bar type="bar" data={data} options={options} />
                <Box p={5}>
                    <Stack isInline align="baseline">
                        <Badge variant="solid" colorScheme="pink" rounded="full" px={2}>
                            NEW!
                        </Badge>
                        <Badge variant="solid" colorScheme={color} rounded="full" px={2}>
                            ทดสอบ!
                        </Badge>
                        <Text
                            textTransform="uppercase"
                            fontSize="sm"
                            colorScheme={color}
                            letterSpacing="wide"
                        >
                            2 Hours &bull; 12 lectures
                        </Text>
                    </Stack>
                    <Text as="h2" fontWeight="semibold" fontSize="xl" my={2} color="pink.500">
                        ประเภทธุรกิจ
                    </Text>
                    <Text isTruncated fontWeight="light" fontSize="md">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui commodi,
                        <br />
                        numquam similique incidunt quam earum sit delectus. Repellat eum cumque,
                        harum quas beatae accusantium perspiciatis voluptas libero repudiandae,
                        veritatis alias.
                    </Text>
                    <Stack isInline justify="space-between">
                        <Text fontWeight="semibold" fontSize="lg">
                            $20
                        </Text>
                        <Box d="flex">
                            <Box as="span">
                                {Array(4)
                                    .fill("")
                                    .map((_, i) => (
                                        <Icon as={StarIcon} color="yellow.500" key={i} />
                                    ))}
                                <Icon as={StarIcon} mr="2" />
                            </Box>
                            <Text as="h3" fontWeight="light" fontSize="lg">
                                34 Reviews
                            </Text>
                        </Box>
                    </Stack>
                    <Box textAlign="center">
                        <Button
                            colorScheme={color}
                            size="lg"
                            mt={3}
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _active={{ boxShadow: "lg" }}
                            onClick={toggleColorMode}
                        >
                            <Text color={colorW}>
                                เพิ่มโรงงานใหม่
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default FactoryChart;

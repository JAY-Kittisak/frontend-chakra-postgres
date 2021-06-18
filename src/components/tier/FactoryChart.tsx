import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Badge, Box, Text, Stack, Icon, Button, Flex, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Factory } from '../../generated/graphql'

const data = {
    labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    datasets: [
        {
            label: "My Balance",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "#db86b2",
            borderColor: "#B57295",
            borderCapStyle: "butt",
            borderDashOffset: 0.0,
            borderJoinStyle: "#B57295",
            pointBorderColor: "#B57295",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#B57295",
            pointHoverBorderColor: "#B57295",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [500, 300, 400, 500, 800, 650, 700, 690, 1000, 1200, 1050, 1300],
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



interface Props {
    dataFactory: Factory[] | undefined
}

const FactoryChart: React.FC<Props> = ({ dataFactory }) => {
    const { toggleColorMode } = useColorMode()
    const bg = useColorModeValue("gray.200", "gray.700")
    const color = useColorModeValue("blue", "gray")
    const colorW = useColorModeValue("white", "white")

    console.log("ก่อน filter ===>>> ", dataFactory)

    const filterIndustrialEstate = dataFactory?.filter(data => {
        return data.industrialEstate === "แก่งคอย"
    })


    console.log("หลัง filterIndustrialEstate ===>>> ", filterIndustrialEstate)
    return (
        <Flex>
            <Box w="32%" rounded="10px" boxShadow="sm" bg={bg} mr="5">
                <Line type="line" data={data} options={options} />
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
                    <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                        Introduction
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


            <Box w="32%" rounded="10px" boxShadow="sm" bg={bg} mr="5">
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
                    <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                        Introduction
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
                                ข้อมูลการผลิต
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>


            <Box w="32%" rounded="10px" boxShadow="sm" bg={bg}>
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
                    <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                        Introduction
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
                                สินค้าที่ผลิต
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}

export default FactoryChart;

import React from 'react'
import {
    Flex, Text, Divider, Image, Table,
    Tbody, Th, Thead, Tr, Td,
} from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


import { useUserByIdQuery } from '../generated/graphql';
import Spinner from '../components/Spinner';

interface Props { }

const UserDetail: React.FC<Props> = () => {

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useUserByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    const dataChart = [
        {
            subject: 'STR',
            A: 99,
            B: 30,
            fullMark: 99,
        },
        {
            subject: 'AGI',
            A: 30,
            B: 99,
            fullMark: 99,
        },
        {
            subject: 'VIT',
            A: 99,
            B: 40,
            fullMark: 99,
        },
        {
            subject: 'INT',
            A: 25,
            B: 50,
            fullMark: 99,
        },
        {
            subject: 'DEX',
            A: 20,
            B: 99,
            fullMark: 99,
        },
        {
            subject: 'LUK',
            A: 40,
            B: 40,
            fullMark: 99,
        },
    ];
    return (
        <Flex flexDir="column">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                User Detail
            </Text>
            <Divider mt={1} mb={2} orientation="horizontal" />
            {fetching ? (
                <Flex justify="center">
                    <Spinner color="grey" height={50} width={50} />
                    <Text
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        my={2}
                    >
                        {" "}
                        &nbsp; Loading...
                    </Text>
                </Flex>
            ) : !data?.userById ? (
                <Flex justify="center">
                    <Text
                        color="orange.600"
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        my={2}
                    >
                        แจ้งเตือน: คุณไม่สามารถเข้าถึงข้อมูลนี้ได้
                    </Text>
                </Flex>
            ) : (
                <>
                    <Flex justify="space-between">
                        <Flex flexDir="column">
                            <Text ml="6" fontWeight="bold" fontSize="xl">{data?.userById.fullNameTH}</Text>
                            <Text ml="6" fontWeight="bold" fontSize="xl">{data?.userById.position}</Text>
                            <Text ml="6" fontWeight="bold" fontSize="xl">{data?.userById.branch === 0 ? "ลาดกระบัง" : "ชลบุรี"}</Text>
                        </Flex>
                        {data?.userById.imageUrl && (
                            <Image boxSize='200px' src={data.userById.imageUrl} alt='Dan Abramov' />
                        )}
                    </Flex>
                    <Flex
                        mx="2"
                        p="5"
                        h="500px"
                        rounded="7px"
                        boxShadow="md"
                    >
                        <Flex justify="space-between">
                            <Flex flexDir="column">
                                <Text ml="6" fontSize="xl">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex repellendus vel,
                                    delectus quia illo voluptatem porro.
                                    Dolorum fugiat veritatis soluta commodi sed cupiditate,
                                    voluptatem quia aspernatur sequi, saepe porro odit!
                                </Text>

                                <Table boxShadow="base" variant="striped" colorScheme="blackAlpha">
                                    <Thead>
                                        <Tr bg="#1379ec">
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                Full Mark
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                Group A
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                Group B
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                            >
                                                Subject
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataChart.map((val, i) => (
                                            <Tr key={i}>
                                                <Td w="40%">{val.fullMark}</Td>
                                                <Td w="20%">{val.A}</Td>
                                                <Td w="20%">{val.B}</Td>
                                                <Td w="20%">{val.subject}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>


                            </Flex>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataChart}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="Mike" dataKey="A" stroke="#1379ec" fill="#64c9e2" fillOpacity={0.6} />
                                    <Radar name="king" dataKey="B" stroke="#0AB68B" fill="#7be4ca" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </Flex>
                    </Flex>
                </>
            )}
        </Flex>
    )
}

export default UserDetail
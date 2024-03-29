import {
    Box, Divider, Flex, Heading, IconButton, Select, Stack, Table, Tbody, Text, Th, Thead,
    Tr, useColorModeValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import FactoryChart from "../components/tier/FactoryChart";
import FactoryItem from "../components/tier/FactoryItem";
import { Factory, useFactoriesQuery } from "../generated/graphql";
import { factoryTab } from "../utils/helpers";
import Spinner from "../components/Spinner";


interface Props { }

type Display = "none" | "hide" | "show";

const Factories: React.FC<Props> = () => {
    const bg = useColorModeValue("gray.100", "gray.700")
    const [display, changeDisplay] = useState<Display>("hide");
    const [{ data: factoryAll }] = useFactoriesQuery();
    const [industrialEstateSelect, setIndustrialEstateSelect] = useState("All");
    const [industrialEstate, setIndustrialEstate] = useState<
        Factory[] | undefined
    >(undefined);



    useEffect(() => {
        if (!factoryAll) return
        if (industrialEstateSelect === "All") {
            const filterIndustrialEstate = factoryAll.factories.filter((data) => {
                return data;
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }
        if (industrialEstateSelect === "แก่งคอย") {
            const filterIndustrialEstate = factoryAll.factories.filter((data) => {
                return data.industrialEstate === "แก่งคอย";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "แหลมฉบัง") {
            const filterIndustrialEstate = factoryAll.factories.filter((data) => {
                return data.industrialEstate === "แหลมฉบัง";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "เหมราชอีสเทิร์นซีบอร์ด") {
            const filterIndustrialEstate = factoryAll.factories.filter((data) => {
                return data.industrialEstate === "เหมราชอีสเทิร์นซีบอร์ด";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "เอเซีย (สุวรรณภูมิ)") {
            const filterIndustrialEstate = factoryAll.factories.filter((data) => {
                return data.industrialEstate === "เอเซีย (สุวรรณภูมิ)";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "เอเซีย") {
            const filterIndustrialEstate = factoryAll.factories.filter((data) => {
                return data.industrialEstate === "เอเซีย";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4") {
            const filterIndustrialEstate = factoryAll.factories.filter((data) => {
                return data.industrialEstate === "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }
    }, [
        industrialEstateSelect,
        setIndustrialEstateSelect,
        factoryAll,
    ]);

    const estate = industrialEstate
        ?.map((data) => data)
        .filter(
            (item, pos, self) =>
                self.findIndex((v) => v.industrialEstate === item.industrialEstate) ===
                pos
        )
        .map(data => <Text as="ins" color="orange" key={data.id}>{data.industrialEstate}</Text>)

    return (
        <Flex flexDir="column" p="5" pb="10" overflow="auto" h="96vh">
            <Stack isInline justify="space-between">
                <Box mb="5" w="20%">
                    <Text as="h2" fontWeight="semibold" fontSize={["sm", "sm", "lg", "xl"]} my={2}>
                        นิคมอุตสาหกรรม
                    </Text>
                    <Select
                        fontSize={["sm", "sm", "lg", "xl"]}
                        defaultValue="All"
                        onChange={(e) => setIndustrialEstateSelect(e.target.value)}
                    >
                        <option style={{ display: "none" }}></option>
                        {factoryTab.map((tab) => (
                            <option key={tab} value={tab}>
                                {tab}
                            </option>
                        ))}
                    </Select>
                </Box>
                <Box>
                    {industrialEstateSelect === "All" ? (
                        <Heading as="h4" fontSize={["md", "md", "md", "lg"]}>จำนวนโรงงานภายในประเทศทั้งหมด</Heading>
                    ) : (
                            <Heading as="h4" fontSize={["xs", "sm", "md", "lg"]}>จำนวนโรงงานในนิคมอุตสาหกรรม "{estate}"</Heading>
                    )}
                    <Heading color="orange" textAlign="right" mt="2" >
                        {industrialEstate?.length}
                        <Text color="gray" fontSize={["xs", "sm", "sm", "sm"]}>โรงงาน</Text>
                    </Heading>
                </Box>
            </Stack>

            <Flex flexDir="column">
                {display === "show" ? (
                    <Flex mb="2">
                        <FactoryChart
                            industrialEstate={industrialEstate}
                            industrialEstateSelect={industrialEstateSelect}
                        />
                    </Flex>
                ) : null}
                <Flex align="center">
                    <Divider />
                    <IconButton
                        aria-label=""
                        icon={display === "show" ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => {
                            if (display === "show") {
                                changeDisplay("none");
                            } else {
                                changeDisplay("show");
                            }
                        }}
                    />
                    <Divider />
                </Flex>
            </Flex>

            <Box w="100%" rounded="20px" bg={bg} p={10} mt="3">
            {!industrialEstate ? (
                    <Flex align="center">
                        <Divider />
                        <Spinner color="grey" height={30} width={30} /><Heading>&nbsp;Loading...</Heading>
                        <Divider />
                    </Flex>
                ) : (
                        <Flex w="100%" overflowX="auto">
                            <Table variant="striped" colorScheme="grey">
                                <Thead>
                                    <Tr>
                                        <Th textAlign="center" fontSize="md" w="15%">เลขจดทะเบียน</Th>
                                        <Th textAlign="center" fontSize="md" w="15%">companyName</Th>
                                        <Th textAlign="center" fontSize="md" w="15%">industrialEstate</Th>
                                        <Th textAlign="center" fontSize="md" w="15%">businessType</Th>
                                        <Th textAlign="center" fontSize="md" w="30%">description</Th>
                                        <Th textAlign="center" fontSize="md" w="10%">ดูรายละเอียด</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {!industrialEstate ? (
                                        <div>Loading...</div>
                                    ) : (
                                        industrialEstate.map((factory) => (
                                            <FactoryItem key={factory.id} factory={factory} />
                                        ))
                                    )}
                                </Tbody>
                            </Table>
                        </Flex>
            )}
            </Box>
        </Flex>
    );
};

export default Factories;

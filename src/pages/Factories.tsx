import {
    Box, Divider, Flex, Heading, IconButton, Select, Stack, Table, Tbody, Text, Tfoot, Th, Thead,
    Tr, useColorModeValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Layout from "../components/Layout";
import FactoryChart from "../components/tier/FactoryChart";
import FactoryItem from "../components/tier/FactoryItem";
import { Factory, useFactoriesQuery } from "../generated/graphql";
import { factoryTab } from "../utils/helpers";
import { useIsAuth } from "../utils/uselsAuth";


interface Props { }

type Display = "none" | "hide" | "show";

const Factories: React.FC<Props> = () => {
    useIsAuth()
    const bg = useColorModeValue("gray.200", "gray.700")
    const [display, changeDisplay] = useState<Display>("hide");
    const [{ data: factoryAll }] = useFactoriesQuery();
    const [industrialEstateSelect, setIndustrialEstateSelect] = useState("All");
    const [industrialEstate, setIndustrialEstate] = useState<
        Factory[] | undefined
    >(undefined);

    useEffect(() => {
        if (industrialEstateSelect === "All") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data;
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }
        if (industrialEstateSelect === "แก่งคอย") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data.industrialEstate === "แก่งคอย";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "แหลมฉบัง") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data.industrialEstate === "แหลมฉบัง";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "เหมราชอีสเทิร์นซีบอร์ด") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data.industrialEstate === "เหมราชอีสเทิร์นซีบอร์ด";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "เอเซีย (สุวรรณภูมิ)") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data.industrialEstate === "เอเซีย (สุวรรณภูมิ)";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "เอเซีย") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data.industrialEstate === "เอเซีย";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data.industrialEstate === "เหมราชอีสเทิร์นซีบอร์ด แห่งที่ 4";
            });
            return setIndustrialEstate(filterIndustrialEstate);
        }
    }, [
        industrialEstateSelect,
        setIndustrialEstateSelect,
        factoryAll?.factories,
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
        <Layout variant="regular">
            <Stack isInline justify="space-between">
                <Box mb="5" w="20%">
                    <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                        นิคมอุตสาหกรรม
                    </Text>
                    <Select
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
                        <Heading as="h4" size="lg">จำนวนโรงงานภายในประเทศทั้งหมด</Heading>
                    ) : (
                        <Heading as="h4" size="lg">จำนวนโรงงานในนิคมอุตสาหกรรม "{estate}"</Heading>
                    )}
                    <Heading color="orange" textAlign="right" mt="2" >
                        {industrialEstate?.length}
                        <Text color="gray" fontSize="sm">โรงงาน</Text>
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
                        icon={display === "show" ? <FiChevronUp /> : <FiChevronDown />}
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

            {/* <FactoryChart /> */}
            <Box w="100%" rounded="20px" bg={bg} p={10} mt="3">


            {!industrialEstate ? (
                    <Flex align="center">
                        <Divider />
                        <Heading>Loading...</Heading>
                        <Divider />
                    </Flex>
                ) : (
                    <Table variant="striped" colorScheme="teal">
                        <Thead>
                            <Tr>
                                <Th>companyName</Th>
                                <Th>industrialEstate</Th>
                                <Th>companyName</Th>
                                <Th>description</Th>
                                    <Th>ดูรายละเอียด</Th>
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
                            <Tfoot>
                                <Tr>
                                    <Th>companyName</Th>
                                    <Th>industrialEstate</Th>
                                <Th>businessType</Th>
                                <Th>description</Th>
                                <Th>ดูรายละเอียด</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
            )}
            </Box>
        </Layout>
    );
};

export default Factories;

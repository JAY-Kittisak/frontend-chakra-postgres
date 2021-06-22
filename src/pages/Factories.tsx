import React, { useState, useEffect } from "react";
import {
    Flex,
    Tbody,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tfoot,
    Heading,
    Divider,
    Text,
    Box,
    Select,
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import FactoryItem from "../components/tier/FactoryItem";
import FactoryChart from "../components/tier/FactoryChart";
import { useFactoriesQuery } from "../generated/graphql";
import { Factory } from "../generated/graphql";
import { factoryTab } from "../utils/helpers";

interface Props { }

const Factories: React.FC<Props> = () => {
    const [{ data: factoryAll }] = useFactoriesQuery()
    const [industrialEstateSelect, setIndustrialEstateSelect] = useState("All")
    const [industrialEstate, setIndustrialEstate] = useState<Factory[] | undefined>(undefined)

    console.log("industrialEstate", industrialEstate)

    useEffect(() => {
        if (industrialEstateSelect === "All") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data;
            });
      // console.log("activeTab === แก่งคอย🚀", filterIndustrialEstate)
            return setIndustrialEstate(filterIndustrialEstate);
        }
        if (industrialEstateSelect === "แก่งคอย") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data.industrialEstate === "แก่งคอย";
            });
            // console.log("activeTab === แก่งคอย🚀", filterIndustrialEstate)
            return setIndustrialEstate(filterIndustrialEstate);
        }

        if (industrialEstateSelect === "แหลมฉบัง") {
            const filterIndustrialEstate = factoryAll?.factories.filter((data) => {
                return data.industrialEstate === "แหลมฉบัง";
            });
      // console.log("activeTab === แหลมฉบัง🚀", filterIndustrialEstate)
            return setIndustrialEstate(filterIndustrialEstate);
        }
    }, [industrialEstateSelect, setIndustrialEstateSelect, factoryAll?.factories]);


    // TODO:result🚀 (2) ["แก่งคอย", "แหลมฉบัง"]
    // const result = factoryAll?.factories
    //     .map((estate) => {
    //         return estate;
    //     })
    //     .filter(
    //         (item, pos, self) =>
    //             self.findIndex((v) => v.industrialEstate === item.industrialEstate) ===
    //             pos
    //     )
    //     .map((estate) => {
    //         return estate.industrialEstate;
    //     });
    // console.log("result🚀", result);

    useEffect(() => {
        fetchData(industrialEstateSelect)
        console.log('ล่าง', industrialEstateSelect)
    }, [industrialEstateSelect])

    const fetchData = (industrialEstateSelect: string | Factory[] | undefined) => {
        if (industrialEstateSelect) {
            console.log('fetchData ', industrialEstateSelect)
        }
    }

    return (
        <Layout variant="regular">
            <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                นิคมอุตสาหกรรม
            </Text>
            <Box mb="5" w="20%">
                <Select
                    defaultValue="All"
                    onChange={(e) => setIndustrialEstateSelect(e.target.value)}
                >
                    <option style={{ display: 'none' }} ></option>
                    {factoryTab.map((tab) => (
                        <option key={tab} value={tab}>
                            {tab}
                        </option>
                    ))}
                </Select>
            </Box>

            {/* <FactoryChart /> */}
            {!industrialEstate ? (
                            <Flex align="center">
                                <Divider />
                                <Heading>Loading...</Heading>
                                <Divider />
                            </Flex>
                        ) : (
                            <Table variant="striped" colorScheme="teal">
                                <TableCaption placement="top">
                                    <Heading>จำนวนโรงงานภายในประเทศทั้งหมด</Heading>
                            <Heading color="orange">
                                {industrialEstate.length}
                            </Heading>
                        </TableCaption>
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
        </Layout>
    );
};

export default Factories;

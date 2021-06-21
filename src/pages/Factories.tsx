import React, { useState, useEffect } from 'react'
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
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";

import Layout from '../components/Layout'
import FactoryItem from '../components/tier/FactoryItem'
import FactoryChart from '../components/tier/FactoryChart'
import { useFactoriesQuery } from '../generated/graphql';
import { Factory } from '../generated/graphql'

import {
    FactoryTab
} from '../utils/helpers';

interface Props { }

const Factories: React.FC<Props> = () => {
    const [industrialEstate, setIndustrialEstate] = useState<Factory[] | undefined>(undefined)
    const [activeTab, setActiveTab] = useState<FactoryTab>("All")
    const [{ data: factoryAll }] = useFactoriesQuery()
    // const { loading, setLoading, error, setError } = useAsyncCall()

    // console.log("factoryAll =>>>>>>>>>>🚀", factoryAll)

    useEffect(() => {
        if (activeTab === "แก่งคอย") {
            const filterIndustrialEstate = factoryAll?.factories.filter(data => {
                return data.industrialEstate === "แก่งคอย"
            })
            // console.log("activeTab === แก่งคอย🚀", filterIndustrialEstate)
            return setIndustrialEstate(filterIndustrialEstate)
        }

        if (activeTab === "แหลมฉบัง") {
            const filterIndustrialEstate = factoryAll?.factories.filter(data => {
                return data.industrialEstate === "แหลมฉบัง"
            })
            // console.log("activeTab === แหลมฉบัง🚀", filterIndustrialEstate)
            return setIndustrialEstate(filterIndustrialEstate)
        }
    }, [activeTab, setIndustrialEstate, factoryAll?.factories])


    return (
        <Layout variant='regular'>
            {/* <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                นิคมอุตสาหกรรม
            </Text>
            <Box mb="5" w="100%">
                <Select
                    defaultValue={activeTab ? activeTab : undefined}
                >
                    <option style={{ display: 'none' }}></option>
                    {factoryTab.map((tab) => (
                        <option key={tab} value={tab}>
                            {tab}
                        </option>
                    ))}
                </Select>
            </Box> */}

            <FactoryChart industrialEstate={industrialEstate} />

            <Tabs variant="enclosed" marginBottom="7" marginTop="5">
                <TabList>
                    {/* {factoryTabs.map((tab) => (
                    <Tab key={tab}>{tab}</Tab>
                ))} */}
                    <Tab onClick={() => setActiveTab('All')}>ALL</Tab>
                    <Tab onClick={() => setActiveTab('แก่งคอย')}>แก่งคอย</Tab>
                    <Tab onClick={() => setActiveTab('แหลมฉบัง')}>แหลมฉบัง</Tab>
                    {/* <Tab>ALL</Tab>
                    <Tab>แก่งคอย</Tab>
                    <Tab>แหลมฉบัง</Tab> */}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {!factoryAll ? (
                            <Flex align="center">
                                <Divider />
                                <Heading>Loading...</Heading>
                                <Divider />
                            </Flex>
                        ) : (
                            <Table variant="striped" colorScheme="teal">
                                <TableCaption placement="top">
                                    <Heading>จำนวนโรงงานภายในประเทศทั้งหมด</Heading>
                                        <Heading color="orange">{factoryAll?.factories.length}</Heading>
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
                                        {!factoryAll.factories ? (
                                        <div>Loading...</div>
                                    ) : (
                                                factoryAll?.factories.map((factory) => <FactoryItem key={factory.id} factory={factory} />)
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
                    </TabPanel>

                    {/* "แก่งคอย"*/}
                    {/* <TabPanel>
                        {!factoryAll ? (
                            <Flex align="center">
                                <Divider />
                                <Heading>Loading...</Heading>
                                <Divider />
                            </Flex>
                        ) : (
                            <Table variant="striped" colorScheme="teal">
                                <TableCaption placement="top">
                                        <Heading>จำนวนโรงงาน"แก่งคอย"ทั้งหมด</Heading>
                                        <Heading color="orange">{industrialEstate?.length}</Heading>
                                </TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>companyName</Th>
                                        <Th>industrialEstate</Th>
                                        <Th>companyName</Th>
                                        <Th>description</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {!industrialEstate ? (
                                        <div>Loading...</div>
                                    ) : (
                                        industrialEstate.map((factory) => <FactoryItem key={factory.id} factory={factory} />)
                                    )}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>companyName</Th>
                                        <Th>industrialEstate</Th>
                                        <Th>businessType</Th>
                                        <Th isNumeric>description</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        )}
                    </TabPanel> */}

                    {/* ""แหลมฉบัง""*/}
                    {/* <TabPanel>
                        {!factoryAll ? (
                            <Flex align="center">
                                <Divider />
                                <Heading>Loading...</Heading>
                                <Divider />
                            </Flex>
                        ) : (
                            <Table variant="striped" colorScheme="teal">
                                <TableCaption placement="top">
                                    <Heading>จำนวนโรงงาน"แหลมฉบัง"ทั้งหมด</Heading>
                                    <Heading color="orange">{industrialEstate?.length}</Heading>
                                </TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>companyName</Th>
                                        <Th>industrialEstate</Th>
                                        <Th>companyName</Th>
                                        <Th>description</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {!industrialEstate ? (
                                        <div>Loading...</div>
                                    ) : (
                                                industrialEstate.map((factory) => <FactoryItem key={factory.id} factory={factory} />)
                                    )}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>companyName</Th>
                                        <Th>industrialEstate</Th>
                                        <Th>businessType</Th>
                                        <Th isNumeric>description</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        )}
                    </TabPanel> */}
                </TabPanels>
            </Tabs>
        </Layout>
    )
}

export default Factories
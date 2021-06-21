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
    Select,
    Text,
    Box
} from "@chakra-ui/react";

import Layout from '../components/Layout'
import FactoryItem from '../components/tier/FactoryItem'
import FactoryChart from '../components/tier/FactoryChart'
import { Factory } from '../generated/graphql'
import { factories } from '../data/DataFactory'

import {
    FactoryTab,
    factoryTab
} from '../utils/helpers';

interface Props { }

const Factories: React.FC<Props> = () => {
    const [industrialEstate, setIndustrialEstate] = useState<Factory[] | undefined>(undefined)
    const [activeTab, setActiveTab] = useState<FactoryTab>("All")

    // console.log("factoryAll =>>>>>>>>>>🚀", factories)

    useEffect(() => {
        if (activeTab === "แก่งคอย") {
            const filterIndustrialEstate = factories.filter(data => {
                return data.industrialEstate === "แก่งคอย"
            })
            // console.log("activeTab === แก่งคอย🚀", filterIndustrialEstate)
            return setIndustrialEstate(filterIndustrialEstate)
        }

        if (activeTab === "แหลมฉบัง") {
            const filterIndustrialEstate = factories.filter(data => {
                return data.industrialEstate === "แหลมฉบัง"
            })
            // console.log("activeTab === แหลมฉบัง🚀", filterIndustrialEstate)
            return setIndustrialEstate(filterIndustrialEstate)
        }
    }, [activeTab, setIndustrialEstate])


    return (
        <Layout variant='regular'>

            <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                นิคมอุตสาหกรรม
            </Text>
            <Box mb="5">
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
            </Box>

            <FactoryChart industrialEstate={industrialEstate} />

            <Tabs variant="enclosed" marginBottom="7" marginTop="5">
                <TabList>
                    <Tab onClick={() => setActiveTab('All')}>ALL</Tab>
                    <Tab onClick={() => setActiveTab('แก่งคอย')}>แก่งคอย</Tab>
                    <Tab onClick={() => setActiveTab('แหลมฉบัง')}>แหลมฉบัง</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {!factories ? (
                            <Flex align="center">
                                <Divider />
                                <Heading>Loading...</Heading>
                                <Divider />
                            </Flex>
                        ) : (
                            <Table variant="striped" colorScheme="teal">
                                <TableCaption placement="top">
                                    <Heading>จำนวนโรงงานภายในประเทศทั้งหมด</Heading>
                                        <Heading color="orange">{factories.length}</Heading>
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
                                        {!factories ? (
                                        <div>Loading...</div>
                                    ) : (
                                                factories.map((factory) => <FactoryItem key={factory.id} factory={factory} />)
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
                    </TabPanel>

                    {/* "แก่งคอย"*/}
                    <TabPanel>
                        {!industrialEstate ? (
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
                    </TabPanel>

                    {/* ""แหลมฉบัง""*/}
                    <TabPanel>
                        {!industrialEstate ? (
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
                    </TabPanel>

                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Layout>
    )
}

export default Factories
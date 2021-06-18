import React from 'react'
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
    TabPanel
} from "@chakra-ui/react";

import Layout from '../components/Layout'
import FactoryItem from '../components/tier/FactoryItem'
import FactoryChart from '../components/tier/FactoryChart'
import { useFactoriesQuery } from '../generated/graphql';

interface Props { }

const Factories: React.FC<Props> = () => {
    // const [dataKk, setDataKk] = useState()
    const [{ data: factoryAll }] = useFactoriesQuery()

    console.log("factoryAll =>>>>>>>>>>", factoryAll)

    // const filterIndustrialEstate = factoryAll?.factories.filter(data => {
    //     return data.industrialEstate === "แก่งคอย"
    // })

    return (
        <Layout variant='regular'>
            <FactoryChart dataFactory={factoryAll?.factories} />

            <Tabs variant="enclosed" marginBottom="7" marginTop="5">
                <TabList>
                    <Tab>ALL</Tab>
                    <Tab
                    // onClick={() => setDataKk(filterIndustrialEstate)}
                    >แก่งคอย</Tab>
                    <Tab>แหลมฉบัง</Tab>
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
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {!factoryAll ? (
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
                                        <Th isNumeric>description</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        )}
                    </TabPanel>

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
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {!factoryAll ? (
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
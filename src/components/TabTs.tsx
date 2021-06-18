import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import TestQuery from "./chart/TestQuery"
// import { FactoryTab } from '../utils/helpers'

interface Props {
}

const TabTs: React.FC<Props> = () => {
    return (
        <Tabs variant="enclosed" marginBottom="7">
            <TabList>
                <Tab>ALL</Tab>
                <Tab>แก่งคอย</Tab>
                <Tab>แหลมฉบัง</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <TestQuery />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default TabTs
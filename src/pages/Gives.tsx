import React from "react";
import {
    Grid,
    Text,
    Flex,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import GiveItem from "../components/gives/GiveItem";
import {
    useGivesCdcQuery,
    useGivesQuery,
} from "../generated/graphql";
import GiveItemCdc from "../components/gives/GiveItemCdc";

interface Props { }

const Gives: React.FC<Props> = () => {
    const [{ data, fetching }] = useGivesQuery();
    const [{ data: dataCdc, fetching: fetchingCdc }] = useGivesCdcQuery();

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
                ของแจกลูกค้า
            </Text>

            {(fetching || fetchingCdc) && (
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            )}

            <Tabs align="end" variant="enclosed" mt="-8">
                <TabList>
                    <Tab>ลาดกระบัง</Tab>
                    <Tab>ชลบุรี</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {!data?.gives ? (
                            <Flex justify="center" mt="5">
                                <Text fontWeight="bold" fontSize="2xl">
                                    No. Data
                                </Text>
                            </Flex>
                        ) : (
                            <Grid templateColumns={["repeat(5, 1fr)"]} gap={6}>
                                {data.gives.map((give) => (
                                    <GiveItem key={give.id} give={give} />
                                ))}
                            </Grid>
                        )}
                    </TabPanel>

                    <TabPanel>
                        {!dataCdc?.givesCdc ? (
                            <Flex justify="center" mt="5">
                                <Text fontWeight="bold" fontSize="2xl">
                                    No. Data
                                </Text>
                            </Flex>
                        ) : (
                            <Grid templateColumns={["repeat(5, 1fr)"]} gap={6}>
                                {dataCdc.givesCdc.map((give) => (
                                    <GiveItemCdc key={give.id} give={give} />
                                ))}
                                </Grid>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export default Gives;

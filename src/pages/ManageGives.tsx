import React, { useState } from "react";
import {
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorMode,
    Button,
    Center,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import AdminGiveItem from "../components/gives/AdminGiveItem";
import AdminGiveItemCdc from "../components/gives/AdminGiveItemCdc";
import AddAndEditGive from "../components/gives/AddAndEditGive";
import AddAndEditGiveCdc from "../components/gives/AddAndEditGiveCdc";
import { useDialog } from "../components/dialogs/useDialog";
import {
    useGivesQuery,
    RegularGiveFragment,
    RegularGiveCdcFragment,
    useGivesCdcQuery,
} from "../generated/graphql";

interface Props { }

const ManageGives: React.FC<Props> = () => {
    const [{ data, fetching }] = useGivesQuery();
    const [{ data: dataCdc, fetching: fetchingCdc }] = useGivesCdcQuery();
    const { isOpen, setIsOpen } = useDialog();
    const { isOpenCdc, setIsOpenCdc } = useDialog();
    const [giveToEdit, setGiveToEdit] = useState<RegularGiveFragment | null>(
        null
    );
    const [giveToEditCdc, setGiveToEditCdc] =
        useState<RegularGiveCdcFragment | null>(null);

    const { colorMode } = useColorMode();

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
            >
                Manages Give
            </Text>

            <Tabs align="end" variant="enclosed" mt="-8">
                <TabList>
                    <Tab>ลาดกระบัง</Tab>
                    <Tab>ชลบุรี</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex flexDir="column">
                            {fetching ? (
                                <Center>
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
                                </Center>
                            ) : (
                                <>
                                    <Center mb="5">
                                        <Button
                                            colorScheme={colorMode === "light" ? "green" : "blue"}
                                            boxShadow="sm"
                                            onClick={() => {
                                                setGiveToEdit(null);
                                                setIsOpen(true);
                                            }}
                                        >
                                            <Text color="white" as="u" ml="1">
                                                เพิ่มของแจก
                                            </Text>
                                        </Button>
                                        {isOpen && (
                                            <AddAndEditGive
                                                Open={true}
                                                setOpen={() => setIsOpen(false)}
                                                giveToEdit={giveToEdit}
                                            />
                                        )}
                                    </Center>

                                        {/* // <Text key={order.id}>{order.give.giveName}</Text> */}
                                        <Flex w="100%" overflowX="auto" rounded="7px" boxShadow="xl">
                                            <Table
                                                variant="striped"
                                                colorScheme={colorMode === "light" ? "green" : "blue"}
                                            >
                                                <Thead>
                                                    <Tr bg={colorMode === "light" ? "#028174" : "#3E54D3"}>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="20%"
                                                        >
                                                            Image
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="10%"
                                                        >
                                                            ราคาต่อหน่วย
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="10%"
                                                        >
                                                            จำนวนใน Stock
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="15%"
                                                        >
                                                            ประเภท
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="20%"
                                                        >
                                                            วันที่สร้าง
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="20%"
                                                        >
                                                            Manage
                                                        </Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {data?.gives &&
                                                        data.gives.map((give) => (
                                                            <AdminGiveItem
                                                                key={give.id}
                                                                give={give}
                                                                setOpen={() => setIsOpen(true)}
                                                                setGiveToEdit={setGiveToEdit}
                                                        />
                                                    ))}
                                            </Tbody>
                                        </Table>
                                    </Flex>
                                </>
                            )}
                        </Flex>
                    </TabPanel>

                    {/* -------------------------------------------CDC------------------------------------------------------------------------------------- */}

                    <TabPanel>
                        <Flex flexDir="column">
                            {fetchingCdc ? (
                                <Center>
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
                                </Center>
                            ) : (
                                <>
                                    <Center mb="5">
                                        <Button
                                            colorScheme={colorMode === "light" ? "green" : "blue"}
                                            boxShadow="sm"
                                            onClick={() => {
                                                    setGiveToEditCdc(null);
                                                    setIsOpenCdc(true);
                                                }}
                                            >
                                                <Text color="white" as="u" ml="1">
                                                    เพิ่มของแจก
                                                </Text>
                                            </Button>
                                            {isOpenCdc && (
                                                <AddAndEditGiveCdc
                                                    Open={true}
                                                    setOpen={() => setIsOpenCdc(false)}
                                                    giveToEditCdc={giveToEditCdc}
                                                />
                                            )}
                                        </Center>

                                        {/* // <Text key={order.id}>{order.give.giveName}</Text> */}
                                        <Flex w="100%" overflowX="auto" rounded="7px" boxShadow="xl">
                                            <Table
                                                variant="striped"
                                                colorScheme={colorMode === "light" ? "green" : "blue"}
                                            >
                                                <Thead>
                                                    <Tr bg={colorMode === "light" ? "#028174" : "#3E54D3"}>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="20%"
                                                        >
                                                            Image
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="10%"
                                                        >
                                                            ราคาต่อหน่วย
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="10%"
                                                        >
                                                            จำนวนใน Stock
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="15%"
                                                        >
                                                            ประเภท
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="20%"
                                                        >
                                                            วันที่สร้าง
                                                        </Th>
                                                        <Th
                                                            textAlign="center"
                                                            fontSize={["xs", "xs", "sm", "md"]}
                                                            color="white"
                                                            w="20%"
                                                        >
                                                            Manage
                                                        </Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {dataCdc?.givesCdc &&
                                                        dataCdc.givesCdc.map((give) => (
                                                            <AdminGiveItemCdc
                                                                key={give.id}
                                                                give={give}
                                                                setOpen={() => setIsOpenCdc(true)}
                                                                setGiveToEditCdc={setGiveToEditCdc}
                                                            />
                                                        ))}
                                            </Tbody>
                                        </Table>
                                    </Flex>
                                </>
                            )}
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export default ManageGives;

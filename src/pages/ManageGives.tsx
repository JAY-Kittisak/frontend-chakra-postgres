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
    Divider
} from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import AdminGiveItem from "../components/gives/AdminGiveItem";
import AddAndEditGive from "../components/gives/AddAndEditGive";
import { useDialog } from "../components/dialogs/useDialog";
import { useGivesQuery, RegularGiveFragment } from "../generated/graphql";

interface Props { }

const ManageGives: React.FC<Props> = () => {
    const [{ data, fetching }] = useGivesQuery();
    const { isOpen, setIsOpen } = useDialog();
    const [giveToEdit, setGiveToEdit] = useState<RegularGiveFragment | null>(
        null
    );

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
                <Divider mt={1} mb={5} orientation="horizontal" />

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
                                            <Th textAlign="center" fontSize={["xs", "xs", "sm", "md"]} color="white" w="20%">
                                            Image
                                        </Th>
                                            <Th textAlign="center" fontSize={["xs", "xs", "sm", "md"]} color="white" w="10%">
                                            ราคาต่อหน่วย
                                        </Th>
                                            <Th textAlign="center" fontSize={["xs", "xs", "sm", "md"]} color="white" w="10%">
                                            จำนวนใน Stock
                                        </Th>
                                            <Th textAlign="center" fontSize={["xs", "xs", "sm", "md"]} color="white" w="15%">
                                            ประเภท
                                        </Th>
                                            <Th textAlign="center" fontSize={["xs", "xs", "sm", "md"]} color="white" w="20%">
                                                วันที่สร้าง
                                        </Th>
                                            <Th textAlign="center" fontSize={["xs", "xs", "sm", "md"]} color="white" w="20%">
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
        </>
    );
};

export default ManageGives;

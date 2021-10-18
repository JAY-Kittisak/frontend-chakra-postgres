import React, { useState, useEffect } from "react";
import {
    Flex,
    Text,
    Button,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Center,
} from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import { Branch } from "../utils/helpers"
import { useStockItsQuery, RegularStockItFragment } from "../generated/graphql";
import AdminStockItItem from "../components/StockIt/AdminStockItItem";
import { useDialog } from "../components/dialogs/useDialog";
import SelectBranch from "../components/SelectBranch";
import AddAndEditStockIt from "../components/StockIt/AddAndEditStockIt";

interface Props { }

const ManageStockIt: React.FC<Props> = () => {
    const [branch, setBranch] = useState<Branch>("All");
    const [item, setItem] = useState<RegularStockItFragment[] | undefined>(
        undefined
    );
    const [stockToEdit, setStockToEdit] = useState<RegularStockItFragment | null>(
        null
    );
    const { isOpen, setIsOpen } = useDialog();

    const [{ data, fetching }] = useStockItsQuery();

    useEffect(() => {
        if (branch === "All" && data?.stockIts) {
            setItem(data.stockIts);
        }
        if (branch === "ลาดกระบัง") {
            const dataTest = data?.stockIts?.filter((val) => val.branch === branch);
            setItem(dataTest);
        }
        if (branch === "ชลบุรี") {
            const dataTest = data?.stockIts?.filter((val) => val.branch === branch);
            setItem(dataTest);
        }
    }, [branch, data]);

    if (!data && fetching) {
        return (
            <Flex>
                <Flex flexDir="row" m="auto" h="90vh" align="center">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex flexDir={["column", "column", "column", "column", "row"]}>
            <Flex w={["100%", "100%", "100%", "100%", "80%"]} flexDir="column" mr="2">
                <SelectBranch
                    title="Manages Stock IT"
                    branch={branch}
                    setBranch={setBranch}
                />
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
                                    boxShadow="sm"
                                    colorScheme="green"
                                    onClick={() => {
                                        setStockToEdit(null);
                                        setIsOpen(true);
                                    }}
                                >
                                    <Text color="white" as="u" ml="1">
                                        เพิ่มอุปกรณ์ IT
                                    </Text>
                                </Button>
                                {isOpen && (
                                        <AddAndEditStockIt
                                        Open={true}
                                            setOpen={() => setIsOpen(false)}
                                            stockToEdit={stockToEdit}
                                        />
                                    )}
                            </Center>
                            <Flex w="100%" overflowX="auto" rounded="7px" boxShadow="md">
                                <Table
                                        variant="simple"
                                        colorScheme="blackAlpha"
                                >
                                    <Thead>
                                        <Tr bg="#028174">
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="20%"
                                            >
                                                Details
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                S/N
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                category
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="20%"
                                            >
                                                วันที่
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                    w="20%"
                                            >
                                                สถานะ Item
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                    w="10%"
                                            >
                                                    location
                                            </Th>
                                            <Th
                                                textAlign="center"
                                                fontSize={["xs", "xs", "sm", "md"]}
                                                color="white"
                                                w="10%"
                                            >
                                                Manage
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {item &&
                                            item.map((value) => (
                                                <AdminStockItItem
                                                    key={value.id}
                                                    item={value}
                                                    setOpenEdit={() => setIsOpen(true)}
                                                    setStockToEdit={setStockToEdit}
                                                />
                                            ))}
                                    </Tbody>
                                </Table>
                            </Flex>
                        </>
                    )}
                </Flex>

            </Flex>
        </Flex>
    )
}

export default ManageStockIt
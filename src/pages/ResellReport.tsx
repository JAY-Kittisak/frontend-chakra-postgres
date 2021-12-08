import React, { useState, useEffect } from "react";
import {
    Flex,
    Table,
    Text,
    Tbody,
    Th,
    Thead,
    Tr,
    Center,
    Input,
    InputLeftElement,
    InputGroup,
    Button,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { CSVLink } from "react-csv";

import { useIsResellAuth } from "../utils/useIsResellAuth";
import { useResellsQuery } from "../generated/graphql";
import ResellItem from "../components/resell/ResellItem";
import Spinner from "../components/Spinner";
import { formatDate } from "../utils/helpers";

interface Props { }

type ExportItemCSV = {
    maker: string;
    title: string;
    detail: string;
    category: string;
    orderCustomerName: string;
    createdAt: string;
    customersResell: string;
}[];

const ResellReport: React.FC<Props> = () => {
    useIsResellAuth();

    const [searchName, setSearchName] = useState("");

    const [item, setItem] = useState<ExportItemCSV>([]);
    const [timeNow, setTimeNow] = useState("");

    const [{ data, fetching }] = useResellsQuery();

    const dataSearch = data?.resells?.filter((val) => {
        if (searchName === "") {
            return val;
        } else if (
            val.orderCustomer.customerName
                .toLowerCase()
                .includes(searchName.toLowerCase())
        ) {
            return val;
        }
        return false;
    });

    const headers = [
        { label: "Maker", key: "maker" },
        { label: "Title", key: "title" },
        { label: "Detail", key: "detail" },
        { label: "Category", key: "category" },
        { label: "OrderCustomer Name", key: "orderCustomerName" },
        { label: "Created At", key: "createdAt" },
        { label: "Customers Resell", key: "customersResell" },
    ];

    const setTimeOnClick = () => {
        const dateNow = new Date()
        const hours = dateNow.getHours()
        const minutes = dateNow.getMinutes()
        const seconds = dateNow.getSeconds()
        setTimeNow(`_วันที่_${dateNow.toLocaleDateString()}_เวลา_${hours}_${minutes}_${seconds}`)
    }
    const csvReport = {
        filename: `Resell_Report${timeNow}.csv`,
        headers: headers,
        data: item,
    };

    const testPrint = () => {
        console.log("Did new Print it again?")
    }
    testPrint()

    useEffect(() => {
        if (data) {
            setItem([]);
            data.resells?.map((value) =>
                setItem((arr) => [
                    ...arr,
                    {
                        maker: value.maker,
                        title: value.title,
                        detail: value.detail,
                        category: value.category,
                        orderCustomerName: value.orderCustomer.customerName,
                        createdAt: formatDate(+value.createdAt),
                        customersResell: value.customers
                            ? value.customers.map((val) => val.customerName).toString()
                            : "",
                    },
                ])
            );
        }
    }, [data, setItem]);

    return (
        <Flex flexDir="column" h="90vh">
            <Flex justify="space-between">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    Report
                </Text>
                <Flex>
                    <CSVLink {...csvReport}>
                        <Button colorScheme="teal" variant="outline" isLoading={fetching} onClick={setTimeOnClick}>
                            Export to CSV
                        </Button>
                    </CSVLink>
                    <InputGroup ml="5">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="gray.600" />}
                        />
                        <Input
                            w="200px"
                            errorBorderColor="crimson"
                            type="text"
                            placeholder="ชื่อบริษัท..."
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </InputGroup>
                </Flex>
            </Flex>
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
                <Flex mt="2" overflowX="auto" rounded="5px" boxShadow="md">
                    <Table boxShadow="base" variant="simple" colorScheme="blackAlpha">
                            <Thead>
                                <Tr bg="#028174">
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        Make/Category
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        Product
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        รายละเอียด
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        บริษัทที่สั่งซื้อ
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                    >
                                        ขายต่อให้กับ
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {dataSearch?.map((resell) => (
                                    <ResellItem key={resell.id} resell={resell} />
                                ))}
                            </Tbody>
                        </Table>
                </Flex>
            )}
        </Flex>
    );
};

export default ResellReport;

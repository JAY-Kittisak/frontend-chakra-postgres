import React, { useState, useEffect } from 'react'
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
    Button
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { CSVLink } from "react-csv"

import { useIsResellAuth } from '../utils/useIsResellAuth'
import { useResellsQuery } from '../generated/graphql';
import ResellItem from '../components/resell/ResellItem';
import Spinner from '../components/Spinner';

interface Props { }


const ResellReport: React.FC<Props> = () => {
    useIsResellAuth()

    const [searchName, setSearchName] = useState("")

    // const [item, setItem] = useState([{
    //     maker: "",
    //     title: "",
    //     detail: "",
    //     category: "",
    //     orderCustomerName: "",
    //     // customersName: "",
    //     createdAt: "",
    // }]);


    const [{ data, fetching }] = useResellsQuery()

    const dataSearch = data?.resells?.filter((val) => {
        if (searchName === "") {
            return val
        } else if (
            val.orderCustomer.customerName
                .toLowerCase()
                .includes(searchName.toLowerCase())
        ) {
            return val
        }
        return false;
    })

    let headers = []
    // let dataCsv = []

    headers = [
        { label: "Maker", key: "maker" },
        { label: "Title", key: "title" },
        { label: "Detail", key: "detail" },
        { label: "Category", key: "category" },
        { label: "OrderCustomer Name", key: "orderCustomerName" },
        { label: "Created At", key: "createdAt" }
    ];
    // headers = [
    //     { label: "First Name", key: "firstname" },
    //     { label: "Last Name", key: "lastname" },
    //     { label: "Email", key: "email" }
    // ];

    const dataCsv = [
        { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
    ];



    const csvReport = {
        filename: "SalesReport.csv",
        headers: headers,
        data: dataCsv
    }

    useEffect(() => {
        if (dataSearch) {
            const response = dataSearch.map(value => value.maker)
            console.log("response", response)
            // setItem([
            //     ...item, {
            //         maker: value.maker,
            //         title: value.title,
            //         detail: value.detail,
            //         category: value.category,
            //         orderCustomerName: value.orderCustomer.customerName,
            //         createdAt: value.createdAt,
            //     }
            // ])
        }
    }, [
        dataSearch,
        // setItem
    ]);

    console.log("dataSearch", dataSearch?.map(val => val.title))
    console.log("dataCsv", dataCsv)
    // console.log("stateOptions", item)

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
                        <Button colorScheme='teal' variant='outline'>
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
            {(fetching) ? (
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
    )
}

export default ResellReport
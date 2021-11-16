import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import {
    Text,
    Flex,
    Divider,
} from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { useResellByIdQuery, useCustomersQuery } from '../generated/graphql'
import { useIsAuth } from '../utils/uselsAuth'
import Spinner from '../components/Spinner';

import { TypeDemoData } from "../utils/helpers";
import CustomerList from '../components/resell/CustomerList';

interface Props { }

const ResellCreateStep2: React.FC<Props> = () => {
    useIsAuth()

    const [customers, setCustomers] = useState<Array<TypeDemoData>>([]);
    const [CompletedCustomers, setCompletedCustomers] = useState<Array<TypeDemoData>>([]);
    const [testCom, setTestCom] = useState<Array<TypeDemoData>>([]);

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useResellByIdQuery({
        variables: { id: +params.id }
    })
    const [{ data: dataCustomer }] = useCustomersQuery()

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        console.log(result);
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        let add;
        let active = customers;
        let complete = CompletedCustomers;
        // Source Logic
        if (source.droppableId === "TodosList") {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }
        // Destination Logic
        if (destination.droppableId === "TodosList") {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }
        setTestCom(complete)
        setCompletedCustomers(complete);
        setCustomers(active);
    };

    useEffect(() => {
        if (dataCustomer?.customers && customers.length === 0) {
            dataCustomer.customers.map(val => setCustomers(arr => [...arr, {
                id: val.id,
                customerCode: val.customerCode,
                customerName: val.customerName,
                isDone: false
            }])
            )
        }
    }, [dataCustomer, customers])

    console.log(customers)
    console.log("testCom", testCom)

    return (
        <Flex flexDir="column">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="green.600"
            >
                Step 2 เพิ่มบริษัทที่มีการซื้อขาย
            </Text>
            <Divider orientation="horizontal" />
            <Flex flexDir="column" align="center" fontSize="lg">
                {fetching ? (
                    <>
                        <Spinner color="grey" height={30} width={30} />
                        <Text fontWeight="bold" fontSize="xl">
                            &nbsp; Loading...
                        </Text>
                    </>
                ) : (
                    <Flex
                        flexDir="column"
                        p="6"
                        mt="5"
                        boxShadow="base"
                        borderRadius="md"
                    >
                        <Flex>
                            <Flex minW="500px">
                                <Text fontWeight="bold">Customer Name :</Text>&nbsp;
                                <Text>{data?.resellById.orderCustomer.customerName}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="bold">Maker :</Text>&nbsp;
                                <Text>{data?.resellById.maker}</Text>
                            </Flex>
                        </Flex>
                        <Flex mt="1">
                            <Flex minW="500px">
                                <Text fontWeight="bold">หัวเรื่อง :</Text>&nbsp;
                                <Text>{data?.resellById.title}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="bold">ประเภทสินค้า :</Text>&nbsp;
                                <Text>{data?.resellById.category}</Text>
                            </Flex>
                        </Flex>
                        <Text mt="1" fontWeight="bold">รายละเอียด :</Text>
                        <Text w="680px" ml="5">
                            {data?.resellById.detail}
                        </Text>
                    </Flex>
                )}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Flex
                        mt="5"
                        flexDir="column"
                        w={["100%", "100%", "100%", "100%", "100%"]}
                        minH="666px"
                        p={6}
                        ml={5}
                        rounded="7px"
                        boxShadow="md"
                    >
                        <CustomerList
                            customers={customers}
                            setCustomers={setCustomers}
                            CompletedCustomers={CompletedCustomers}
                            setCompletedCustomers={setCompletedCustomers}
                            resellId={data?.resellById.id}
                        />
                    </Flex>
                </DragDropContext>
            </Flex>
        </Flex>
    )
}

export default ResellCreateStep2
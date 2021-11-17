import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import {
    Text,
    Flex,
    Divider,
} from "@chakra-ui/react";

import { useResellByIdQuery } from '../generated/graphql'
import { useIsAuth } from '../utils/uselsAuth'
import Spinner from '../components/Spinner';
import SelectCustomer from '../components/resell/SelectCustomer';

interface Props { }

const ResellCreateStep2: React.FC<Props> = () => {
    useIsAuth()
    const [customerID, setCustomerID] = useState<number | undefined>(undefined)
    const [customerData, setCustomerData] = useState<{ code: string, name: string } | undefined>(undefined)

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useResellByIdQuery({
        variables: { id: +params.id }
    })

    console.log(customerID, customerData)

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
            <Flex>
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
                            w="50%"
                        p="6"
                            mt="8"
                            boxShadow="xl"
                        borderRadius="md"
                            h="80vh"
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
                            <Text mt="1" fontWeight="bold">ขายต่อให้กับ :</Text>
                            <Text w="680px" ml="5">
                                {customerData?.name}
                            </Text>
                    </Flex>
                )}
                <SelectCustomer setCustomerID={setCustomerID} setCustomerData={setCustomerData} />
            </Flex>
        </Flex>
    )
}

export default ResellCreateStep2
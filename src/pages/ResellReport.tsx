import React from 'react'
import {
    Flex,
    Table,
    // Tbody,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { useIsGmAuth } from '../utils/useIsGmAuth'
// import ResellItem from '../components/resell/ResellItem';


type ValuesDemo = {
    maker: string;
    title: string;
    detail: string;
    orderById: number;
    resellId: number;

}

interface Props {
    myArray: ValuesDemo[]
}

const ResellReport: React.FC<Props> = ({ myArray }) => {
    useIsGmAuth()

    console.table(myArray)

    return (
        <Flex>
            <Table
                borderRadius="md"
                boxShadow="xl"
                my="10"
                variant="simple"
                colorScheme="blackAlpha"
            >
                <Thead>
                    <Tr bg="#028174">
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                        >
                            ชื่อ maker
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                        >
                            ชื่อ Product
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                        >
                            รายละเอียดการผลิต
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                            w="10%"
                        >
                            สาขา
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                            w="20%"
                        >
                            บริษัทที่สั่งซื้อ
                        </Th>
                        <Th
                            textAlign="center"
                            fontSize={["xs", "xs", "sm", "md"]}
                            color="white"
                            w="20%"
                        >
                            ขายต่อให้กับ
                        </Th>
                    </Tr>
                </Thead>

                {/* <Tbody>
                    {myArray.map((item, i) => (
                        <ResellItem key={i} item={item} />
                    ))}
                </Tbody> */}
            </Table>
        </Flex>
    )
}

export default ResellReport
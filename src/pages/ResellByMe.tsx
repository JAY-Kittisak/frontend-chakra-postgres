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
    Select
} from "@chakra-ui/react";

import { RegularResellFragment, useResellsByCreatorQuery } from '../generated/graphql'
import { useIsAuth } from '../utils/uselsAuth'
import Spinner from '../components/Spinner';
import ResellItem from '../components/resell/ResellItem';

interface Props { }

type TypeY = "ต๊าปประเภท A" | "ต๊าปประเภท B" | "ต๊าปประเภท C"
const catYamawa: TypeY[] = ["ต๊าปประเภท A", "ต๊าปประเภท B", "ต๊าปประเภท C"]
type TypeM = "หัวกัดประเภท D" | "หัวกัดประเภท E" | "หัวกัดประเภท F"
const catMoldino: Array<TypeM> = ["หัวกัดประเภท D", "หัวกัดประเภท E", "หัวกัดประเภท F"]

const ResellByMe: React.FC<Props> = () => {
    useIsAuth()


    const [group, setGroup] = useState("All")
    const [item, setItem] = useState<RegularResellFragment[] | undefined>(
        undefined
    );

    // const [{ data, fetching }] = useResellsQuery({
    //     variables: {
    //         createBy: true,
    //     },
    // })

    const [{ data, fetching }] = useResellsByCreatorQuery()

    const sumArray = ["All", ...catYamawa, ...catMoldino]


    useEffect(() => {
        if (group === "All" && data?.resellsByCreator) {
            setItem(data.resellsByCreator);
        }
        if (group === "ต๊าปประเภท A") {
            const filterData = data?.resellsByCreator?.filter((val) => val.category === group);
            setItem(filterData);
        }
        if (group === "ต๊าปประเภท B") {
            const filterData = data?.resellsByCreator?.filter((val) => val.category === group);
            setItem(filterData);
        }
        if (group === "ต๊าปประเภท C") {
            const filterData = data?.resellsByCreator?.filter((val) => val.category === group);
            setItem(filterData);
        }
        if (group === "หัวกัดประเภท D") {
            const filterData = data?.resellsByCreator?.filter((val) => val.category === group);
            setItem(filterData);
        }
        if (group === "หัวกัดประเภท E") {
            const filterData = data?.resellsByCreator?.filter((val) => val.category === group);
            setItem(filterData);
        }
        if (group === "หัวกัดประเภท F") {
            const filterData = data?.resellsByCreator?.filter((val) => val.category === group);
            setItem(filterData);
        }
    }, [group, data]);

    return (
        <Flex flexDir="column" h="90vh">
            <Flex justify="space-between">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    ประวัติการบันทึก
                </Text>
                <Select
                    mt="1"
                    w="200px"
                    boxShadow="md"
                    onChange={(e) => setGroup(e.target.value)}
                >
                    {sumArray.map((val, i) => (
                        <option key={i} value={val}>
                            {val}
                        </option>
                    ))}
                </Select>
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
                            {item?.map((resell) => (
                                <ResellItem key={resell.id} resell={resell} />
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
            )}
        </Flex>
    )
}

export default ResellByMe
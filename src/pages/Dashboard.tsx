import React, { useState } from 'react'
import { Flex, Heading, Link, Icon, Text, Avatar, IconButton, useColorMode, Divider } from '@chakra-ui/react'
import {
    FiHome,
    FiPieChart,
    FiDollarSign,
    FiBox,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
    // FiPlus,
    // FiCreditCard,
    // FiSearch,
    // FiBell
} from "react-icons/fi"
import { ColorModeSwitcher } from "../ColorModeSwitcher"

import TestQuery from '../components/chart/TestQuery'
import PagePost from './PagePost'

import '../styles/dashboard.css'

interface Props { }

type Display = "none" | "hide" | "show"

const Dashboard: React.FC<Props> = () => {
    const [display, changeDisplay] = useState<Display>('hide')
    const { colorMode } = useColorMode()
    return (
        <Flex
            h="90vh"
            flexDir="row"
            overflow="hidden"
        >
            {/* Column 1 */}
            <Flex
                w="15%"

                alignItems="center"
                backgroundColor="#020202"
                color="#fff"
            >
                <Flex
                    flexDir="column"
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir="column"
                        as="nav"
                    >
                        <Heading
                            mt={9}
                            alignSelf="center"
                            color={colorMode === "light" ? "Teal" : "#db86b2"}
                        >
                            MK
                        </Heading>
                        <Heading
                            mt={2}
                            mb={[5, 0, 100]}
                            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl",]}
                            alignSelf="center"
                            letterSpacing="tight"
                            color={colorMode === "light" ? "Teal" : "#db86b2"}
                        >
                            Dashboard
                        </Heading>
                        <Flex
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={["center", "center", "center", "flex-start", "flex-start"]}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >

                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text className="active">Home</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiPieChart} fontSize="2xl" />
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text>Credit</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiDollarSign} fontSize="2xl" />
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text>Wallet</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiBox} fontSize="2xl" /></Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text>Services</Text>
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                        {/* FIXME: src="รูป" */}
                        <Avatar my={2} src="" />
                        <Text textAlign="center">Supper Admin</Text>
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </Flex>

                </Flex>
            </Flex>

            {/* Column 2 */}
            <Flex
                w="100%"
                p="3%"
                flexDir="column"
                overflow="auto"
            >
                <Heading
                    mt={0}
                    fontWeight="normal"
                    mb={4}
                    letterSpacing="tight"
                >
                    ทดสอบ <Flex display="inline-flex" fontWeight="bold">Query</Flex>
                </Heading>
                <Text color="gray" fontSize="sm">จำนวน DATA</Text>
                <Text fontWeight="bold" fontSize="2xl">5,750.20</Text>

                <TestQuery />

                <Flex justifyContent="space-between" mt={8}>
                    <Flex align="flex-end">
                        <Heading as="h2" size="lg" letterSpacing="tight">Transactions</Heading>
                        <Text fontSize="small" color="gray" ml={4}>Apr 2021</Text>
                    </Flex>
                    <IconButton aria-label="" icon={<FiCalendar />} />
                </Flex>
                <Flex flexDir="column">
                    <Flex overflow="auto">
                        <PagePost display={display} />
                    </Flex>
                    <Flex align="center">
                        <Divider />
                        <IconButton aria-label=""
                            icon={display === 'show' ? <FiChevronUp /> : <FiChevronDown />}
                            onClick={() => {
                                if (display === 'show') {
                                    changeDisplay('none')
                                } else {
                                    changeDisplay('show')
                                }
                            }}
                        />
                        <Divider />
                    </Flex>
                </Flex>
            </Flex>

            {/* Column 3 */}
            {/* <Flex
                w={["100%", "100%", "30%"]}
                bgColor="#F5F5F5" p="3%"
                flexDir="column"
                overflow="auto"
                minW={[null, null, "300px", "300px", "400px"]}
            >

            </Flex> */}

        </Flex>
    )
}

export default Dashboard
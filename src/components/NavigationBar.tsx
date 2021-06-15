import React, { useState } from 'react'
import {
    Flex,
    Text,
    Divider,
    Avatar,
    // Heading,
    IconButton,
    // Icon,
    // useColorMode,
} from '@chakra-ui/react'
import {
    FiMenu,
    // FiHome,
    // FiCalendar,
    // FiUser,
    // FiDollarSign,
    // FiBriefcase,
    // FiSettings
} from 'react-icons/fi'

import NavItem from '../components/NavItem'
import { ExternalLinkIcon, AddIcon, RepeatIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import '../styles/dashboard.css'
interface Props { }

const NavigationBar: React.FC<Props> = () => {
    const [navSize, changeNavSize] = useState("large")
    // const { colorMode } = useColorMode()
    return (
        <Flex
            h="100vh"
            overflow="hidden"
            backgroundColor='#020202'
            alignItems="center"
            w={navSize === "small" ? "6%" : "13%"}
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                as="nav"
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
                        {/* รูป User */}
                        <Flex flexDir="column" alignItems="center" md={10} >
                            {/* FIXME: src="รูป" */}
                            <Avatar size="lg" my={2} src="" />
                            <Text textAlign="center">Supper Admin</Text>
                        </Flex>

                        <Divider display={navSize === "small" ? "none" : "flex"} />

                        <Flex
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={["center", "center", "center", "flex-start", "flex-start"]}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >
                            <NavItem navSize={navSize} icon={ExternalLinkIcon} title="Dashboard" description="This is the description for the dashboard." />

                            <NavItem navSize={navSize} icon={AddIcon} title="Calendar" />

                            <NavItem navSize={navSize} icon={ExternalLinkIcon} title="Clients" />

                            <NavItem navSize={navSize} icon={RepeatIcon} title="Stocks" />

                            <NavItem navSize={navSize} icon={EditIcon} title="Reports" />

                            <NavItem navSize={navSize} icon={HamburgerIcon} title="Settings" />
                        </Flex>
                    </Flex>
                    <Flex
                        p="5%"
                        flexDir="column"
                        w="100%"
                        alignItems={navSize === "small" ? "center" : "flex-start"}
                        mb={4}
                    >
                        <Divider md={100} display={navSize === "small" ? "none" : "flex"} />
                        {/* ปุ่มเปิดปิด */}
                        <Flex mt={4} align="center">
                            <IconButton
                                aria-label="none"
                                background="none"
                                _hover={{ background: 'none' }}
                                icon={<FiMenu />}
                                onClick={() => {
                                    if (navSize === "small")
                                        changeNavSize("large")
                                    else
                                        changeNavSize("small")
                                }}
                            />
                        </Flex>
                    </Flex>

                </Flex>
            </Flex>
        </Flex>
    )
}

export default NavigationBar
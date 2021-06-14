import React, { useState } from 'react'
import {
    Flex,
    Text,
    Divider,
    Avatar,
    Heading,
    IconButton
} from '@chakra-ui/react'

import NavItem from '../components/NavItem'
import { ExternalLinkIcon, AddIcon, RepeatIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons'

interface Props { }

const Sidebar: React.FC<Props> = () => {

    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    colorScheme="teal"
                    aria-label="Call Segun"
                    size="lg"
                    icon={<HamburgerIcon />}
                    _hover={{ colorScheme: 'teal' }}
                    onClick={() => {
                        if (navSize === "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={ExternalLinkIcon} title="Dashboard" description="This is the description for the dashboard." />
                <NavItem navSize={navSize} icon={AddIcon} title="Calendar" />
                <NavItem navSize={navSize} icon={ExternalLinkIcon} title="Clients" />
                <NavItem navSize={navSize} icon={RepeatIcon} title="Stocks" />
                <NavItem navSize={navSize} icon={EditIcon} title="Reports" />
                <NavItem navSize={navSize} icon={HamburgerIcon} title="Settings" />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize === "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Sylwia Weller</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Sidebar
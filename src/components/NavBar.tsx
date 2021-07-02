import React from 'react'
import {
    Box,
    Flex,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Heading,
    useColorMode,
} from '@chakra-ui/react'
import { IconButton } from "@chakra-ui/react"
import { useHistory } from 'react-router-dom'
import { ExternalLinkIcon, AddIcon, RepeatIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons'

import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

interface Props { }

const NavBar: React.FC<Props> = () => {
    const history = useHistory()
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
    const [{ data, fetching }] = useMeQuery()
    const { colorMode } = useColorMode()

    let body = null

    // data is loading
    if (fetching) {
        // user not logged in
    } else if (!data?.me) {
        body = (
            <Box>
                <Button
                    bg="blue.300"
                    mr="4"
                    onClick={() => history.push('/login')}
                >
                    login
                </Button>
                <Button
                    bg="blue.300"
                    onClick={() => history.push('/register')}
                >
                    register
                </Button>
            </Box>
        )

        // user is logged in
    } else {
        body = (
            <Flex>
                <Box p="2">
                    <Heading size="md">{data.me.username}</Heading>
                </Box>

                <Button
                    onClick={() => {
                        logout()
                    }}
                    isLoading={logoutFetching}
                    variant='link'
                >
                    ออกจากระบบ
                </Button>
            </Flex>
        )
    }

    return (
        <Flex
            zIndex={1}
            position="sticky"
            top={0}
            bg={colorMode === "light" ? "#2BA3C2" : "#2A5EA4"}
            color={colorMode === "light" ? "back" : "white"}
            p={4}
        >
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    color={colorMode === "light" ? "back" : "white"}
                />
                <MenuList>
                    <MenuItem icon={<AddIcon />} onClick={() => { history.push('/tiers/factories') }}>
                        Factories
                    </MenuItem>
                    <MenuItem icon={<AddIcon />} onClick={() => { history.push('/tiers/product-tier') }}>
                        Product
                    </MenuItem>
                    <MenuItem icon={<ExternalLinkIcon />} command="⌘N" onClick={() => { history.push('/post') }}>
                        Post
                    </MenuItem>
                    <MenuItem icon={<RepeatIcon />} command="⌘⇧N" onClick={() => { history.push('/create-post') }}>
                        Create-post
                    </MenuItem>
                    <MenuItem icon={<EditIcon />} command="⌘O">
                        Open File...
                    </MenuItem>
                </MenuList>
            </Menu>
            <Link
                mr={2}
                onClick={() => { history.push('/') }}
            >
                <Box p="2">
                    <Heading size="md">MK Management</Heading>
                </Box>
            </Link>

            <ColorModeSwitcher justifySelf="flex-end" />

            <Box ml={'auto'} >
                {body}
            </Box>
        </Flex>
    )
}

export default NavBar
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
    let body = null

    // data is loading
    if (fetching) {
        // user not logged in
    } else if (!data?.me) {
        body = (
            <Box>
                <Button
                    colorScheme="teal"
                    mr="4"
                    onClick={() => history.push('/login')}
                >
                    login
                </Button>
                <Button
                    colorScheme="teal"
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
        <Flex bg='#020202' p={4}>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                    color="white"
                />
                <MenuList>
                    <MenuItem icon={<ExternalLinkIcon />} command="⌘N" onClick={() => { history.push('/dashboard') }}>
                        Dashboard
                    </MenuItem>
                    <MenuItem icon={<AddIcon />} command="⌘T" onClick={() => { history.push('/factories') }}>
                        Factories
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
                {/* <Box p="2">
                    <Heading size="md">MK Management</Heading>
                </Box> */}
            </Link>

            <ColorModeSwitcher justifySelf="flex-end" />

            <Box ml={'auto'} >
                {body}
            </Box>
        </Flex>
    )
}

export default NavBar
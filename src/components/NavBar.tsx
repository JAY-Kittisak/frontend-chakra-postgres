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
            <>
                <Link mr={2} onClick={() => history.push('/login')}>login</Link>
                <Link onClick={() => history.push('/register')}>register</Link>
            </>
        )

        // user is logged in
    } else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
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
        <Flex bg='skyblue' p={4}>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                />
                <MenuList>
                    <MenuItem icon={<AddIcon />} command="⌘T" onClick={() => { history.push('/post') }}>
                        POST
                    </MenuItem>
                    <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                        New Window
                    </MenuItem>
                    <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
                        Open Closed Tab
                    </MenuItem>
                    <MenuItem icon={<EditIcon />} command="⌘O">
                        Open File...
                    </MenuItem>
                </MenuList>
            </Menu>
            <Link mr={2} onClick={() => { history.push('/') }}>MK Management</Link>
            <Box ml={'auto'} >
                {body}
            </Box>
            <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
    )
}

export default NavBar
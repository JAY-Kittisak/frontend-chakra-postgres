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
    Text,
    MenuDivider,
    Avatar
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
            <Flex align="center" mt="1">
                <Button
                    size="sm"
                    bg={colorMode === "light" ? "#0AB68B" : "#4F80E2"}
                    mr="2"
                    color="white"
                    onClick={() => history.push('/login')}
                >
                    login
                </Button>
                <Button
                    mr="2"
                    size="sm"
                    bg={colorMode === "light" ? "#0AB68B" : "#4F80E2"}
                    color="white"
                    onClick={() => history.push('/register')}
                >
                    register
                </Button>
            </Flex>
        )

        // user is logged in
    } else {
        body = (
                <Button
                    onClick={() => {
                        logout()
                    window.location.reload()
                    }}
                    isLoading={logoutFetching}
                variant='link'
                fontSize="xl"
                cursor="pointer"
                color="white"
                p="1"
            >
                <i className="bi bi-door-open-fill"></i>
                <Text fontSize={["md", "md", "md", "xl"]}>Log Out</Text>
            </Button>
        )
    }

    return (
        <Flex
            zIndex={1}
            position="sticky"
            bg={colorMode === "light" ? "#333" : "#333"}
        >
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="none"
                    color="white"
                />
                <MenuList minWidth="240px">
                    {data?.me ? (
                        <Flex flexDir="column" alignItems="center" mt={5}>
                            <Avatar size="2xl" my={2} src={data.me.imageUrl as string} />
                            <Text textAlign="center">{data.me.fullNameTH}</Text>
                            <Link onClick={() => {
                                history.push('/profile')
                            }}>
                                <Box mt="1" align="center">
                                    <Text fontSize={["sm", "md", "lg", "xl"]}>Profile</Text>
                                </Box>
                            </Link>
                        </Flex>
                    ) : (
                        null
                    )}


                    <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold" ml="2">Tier</Text>
                    <MenuItem icon={<ExternalLinkIcon />} onClick={() => { history.push('/tiers/factories') }}>
                        Factories
                    </MenuItem>
                    <MenuItem icon={<ExternalLinkIcon />} onClick={() => { history.push('/tiers/product-tier') }}>
                        Product
                    </MenuItem>
                    <MenuDivider />

                    <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold" ml="2">เบิกของแจกลูกค้า</Text>

                    {/* ต้องเป็น superAdmin ถ้าจะมีตัวเลือกนี้ */}
                    {!fetching && (data?.me?.roles === "superAdmin" || data?.me?.roles === "admin") &&
                        (
                            <>
                                <MenuItem
                                    icon={<EditIcon />}
                                    onClick={() => { history.push('/admin/manage-gives') }}
                                    color="orange"
                                    fontWeight="bold"
                                >
                                    จัดการของแจก
                                </MenuItem>
                                <MenuItem
                                    icon={<EditIcon />}
                                    onClick={() => { history.push('/admin/manage-give-orders') }}
                                    color="orange"
                                    fontWeight="bold"
                                >
                                    จัดการ Orders
                                </MenuItem>
                            </>
                        )
                    }

                    <MenuItem icon={<AddIcon />} onClick={() => { history.push('/gives/gives-all') }}>
                        เบิกของ
                    </MenuItem>
                    <MenuItem icon={<AddIcon />} onClick={() => { history.push('/order-give/my-orders') }}>
                        ประวัติการเบิกของคุณ
                    </MenuItem>
                    <MenuDivider />

                    <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="bold" ml="2">Post</Text>
                    <MenuItem icon={<ExternalLinkIcon />} onClick={() => { history.push('/') }}>
                        Post
                    </MenuItem>
                    <MenuItem icon={<RepeatIcon />} onClick={() => { history.push('/') }}>
                        Create-post
                    </MenuItem>
                    <MenuDivider />

                    <MenuItem icon={<EditIcon />}>
                        Open File...
                    </MenuItem>
                </MenuList>
            </Menu>
            {/* <Link
                mr={2}
                onClick={() => { history.push('/') }}
            > */}
            <a href="/">
                <Box p="2" align="center">
                    <Heading fontSize={["sm", "md", "lg", "xl"]} color="white">MK</Heading>
                </Box>
            </a>

            <ColorModeSwitcher justifySelf="flex-end" color="white" />

            <Box ml={'auto'} >
                {body}
            </Box>
        </Flex>
    )
}

export default NavBar
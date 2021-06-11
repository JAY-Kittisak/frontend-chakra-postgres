import React from 'react'
import { Box, Flex, Link, Button } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { useMeQuery } from '../generated/graphql'

interface Props { }

const NavBar: React.FC<Props> = () => {
    const [{ data, fetching }] = useMeQuery()
    let body = null

    // data is loading
    if (fetching) {
        // user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NavLink to="/login">
                    <Link mr={2}>login</Link>
                </NavLink>
                <NavLink to="/register">
                    <Link >register</Link>
                </NavLink>
            </>
        )

        // user is logged in
    } else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button variant='link'>ออกจากระบบ</Button>
            </Flex>
        )
    }

    return (
        <Flex bg='skyblue' p={4}>
            <NavLink to="/">
                <Link mr={2}>MK Management</Link>
            </NavLink>
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )
}

export default NavBar
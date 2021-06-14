import React from 'react'
import { Tr, Td, Text, Flex, Avatar, Heading } from '@chakra-ui/react'
import { Post } from '../../generated/graphql'

interface Props {
    post: Post
}

const Testpost: React.FC<Props> = ({ post }) => {
    return (
        <Tr color="gr">

            <Flex align="center">
                <Avatar size="sm" mr={2} src="amazon.jpeg" />
                <Flex flexDir="column">
                    <Heading size="sm" letterSpacing="tight">{post.title}</Heading>
                    <Text fontSize="sm">Apr 24, 2021 at 1:40pm</Text>
                </Flex>
            </Flex>
            <Td><Text fontWeight="bold" display="inline-table">{post.id}</Text></Td>
            <Td>{post.createdAt}</Td>
            <Td isNumeric>{post.updatedAt}</Td>
        </Tr>
    )
}

export default Testpost
import React from 'react'
import { Tr, Td } from '@chakra-ui/react'
import { Post } from '../../generated/graphql'

interface Props {
    post: Post
}

const Testpost: React.FC<Props> = ({ post }) => {
    return (
        <Tr>
            <Td>{post.id}</Td>
            <Td>{post.title}</Td>
            <Td>{post.createdAt}</Td>
            <Td isNumeric>{post.updatedAt}</Td>
        </Tr>
    )
}

export default Testpost
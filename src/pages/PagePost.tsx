import React from 'react'
import { Table, TableCaption, Thead, Tbody, Tr, Th, Tfoot } from '@chakra-ui/react'

import PostItem from '../components/post/PostItem'
import { usePostsQuery } from '../generated/graphql'

interface Props { }

const Post: React.FC<Props> = () => {
    const [{ data }] = usePostsQuery()
    return (
        <>
            <header>จำ ทั้งหมด ={data?.posts.length}</header>
            <Table variant="striped" colorScheme="green" size="lg">
                <TableCaption placement="top">ทดสอบการ Query</TableCaption>
                <Thead>
                    <Tr>
                        <Th>id</Th>
                        <Th>title</Th>
                        <Th>createdAt</Th>
                        <Th isNumeric>updatedAt</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {!data ? null : data?.posts.map((post) => (
                        <PostItem
                            key={post.id}
                            post={post}
                        />
                    ))}
                </Tbody>

                <Tfoot>
                    <Tr>
                        <Th>id</Th>
                        <Th>title</Th>
                        <Th>createdAt</Th>
                        <Th isNumeric>updatedAt</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </>
    )
}

export default Post
import React from "react";
import {
    Flex,
    Tbody,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tfoot,
    Heading,
    Divider,
} from "@chakra-ui/react";

import PostItem from "../components/post/PostItem";
import { usePostsQuery } from "../generated/graphql";

interface Props {
    display: "none" | "hide" | "show";
}

const Post: React.FC<Props> = ({ display }) => {
    const [{ data }] = usePostsQuery();
    return (
        <>
            {!data ? (
                <Flex align="center">
                    <Divider />
                    <Heading>Loading...</Heading>
                    <Divider />
                </Flex>
            ) : (
        <Table variant="unstyled" mt={4}>
                        <TableCaption placement="top">
                            ทดสอบการ Query จำนวนทั้งหมด
                            <Heading>{data?.posts.length}</Heading>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>title</Th>
                                <Th>id</Th>
                                <Th>createdAt</Th>
                                <Th isNumeric>updatedAt</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!data ? (
                                <div>Loading...</div>
                            ) : (
                                data?.posts.map((post) => <PostItem key={post.id} post={post} />)
                            )}
                            {display === "show" && (
                                <>
                                    {!data
                                        ? null
                                        : data?.posts.map((post) => (
                                            <PostItem key={post.id} post={post} />
                                        ))}
                                </>
                            )}
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
            )}
        </>
    );
};

export default Post;

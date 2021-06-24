import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import { Post } from "../../generated/graphql";

interface Props {
    post: Pick<Post, "id" | "createdAt" | "updatedAt" | "title" | "textSnippet">;
}

const PostItem: React.FC<Props> = ({ post }) => {
    return (
        <Box key={post.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{post.title}</Heading>
            <Text mt={4}>{post.textSnippet}</Text>
        </Box>
    );
};

export default PostItem;

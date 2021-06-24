import { Flex, Heading, Stack, Link } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import PostItem from "../components/post/PostItem";
import { usePostsQuery } from "../generated/graphql";


interface Props { }

const Post: React.FC<Props> = () => {
    const history = useHistory()
    const [{ data }] = usePostsQuery({
        variables: {
            limit: 10,
        }
    });
    return (
        <Layout variant="small">
            <Flex align="center">
                <Heading>Post</Heading>
                <Link ml="auto" onClick={() => { history.push('/create-post') }}>Create Post</Link>
            </Flex>
            <br />
            {!data ? (
                <Heading>Loading...</Heading>
            ) : (
                    <Stack spacing={8}>
                        {data?.posts.map((post) => <PostItem key={post.id} post={post} />)}
                    </Stack>
            )}
        </Layout >
    );
};

export default Post;

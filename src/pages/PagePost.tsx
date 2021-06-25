import { Flex, Heading, Stack, Link, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import PostItem from "../components/post/PostItem";
import { usePostsQuery } from "../generated/graphql";

interface Props { }

const Post: React.FC<Props> = () => {
    const [skip, setSkip] = useState(0)
    const history = useHistory();
    const [{ data, fetching, error }] = usePostsQuery({
        variables: {
            limit: 10 + skip,
        }
    });

    if (!fetching && !data) {
        return <div>you got query failed for some reason</div>
    }

    if (error) {
        return <div>Oh no...{error.message}</div>
    }

    return (
        <Layout variant="small">
            <Flex align="center">
                <Heading>Post</Heading>
                <Link
                    ml="auto"
                    onClick={() => {
                        history.push("/create-post");
                    }}
                >
                    Create Post
                </Link>
            </Flex>
            <br />
            {!data && fetching ? (
                <Heading>Loading...</Heading>
            ) : (
                    <Stack spacing={8}>
                        {data!.posts.map((post) => (
                            <PostItem key={post.id} post={post} />
                        ))}
                    </Stack>
            )}
            {data ? (
                <Flex>
                    <Button isLoading={fetching} m="auto" my={8} onClick={() => setSkip((num) => num + 10)}>
                        load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    );
};

export default Post;

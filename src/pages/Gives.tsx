import React from 'react'
import { Grid, Text, Flex, Divider } from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import GiveItem from "../components/gives/GiveItem"
import { useGivesQuery } from '../generated/graphql'

interface Props { }

const Gives: React.FC<Props> = () => {
    const [{ data, fetching }] = useGivesQuery()

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
                ของแจกลูกค้า
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />

            {fetching &&
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>}

            {!data?.gives ? (
                <Flex justify="center" mt="5"><Text fontWeight="bold" fontSize="2xl">
                    No. Data
                </Text>
                </Flex>
            ) : (
                    <Grid templateColumns={["repeat(5, 1fr)"]} gap={6}>
                        {data.gives.map((give) => (
                            <GiveItem key={give.id} give={give} />
                        ))}
                    </Grid>
            )}
        </>
    )
}

export default Gives
import React from 'react'
import { Grid, Text } from "@chakra-ui/react";

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import GiveItem from "../components/gives/GiveItem"
import { useGivesQuery } from '../generated/graphql'

interface Props { }

const Gives: React.FC<Props> = () => {
    const [{ data, fetching }] = useGivesQuery()

    if (fetching) return <Spinner color="grey" height={50} width={50} />

    return (
        <Layout variant="regular">
            <Text as="i" fontWeight="semibold" fontSize={["md", "md", "xl", "3xl"]} mb="5">
                ของแจกลูกค้า
            </Text>
            {!data?.gives ? (
                <Text>No data.</Text>
            ) : (
                    <Grid templateColumns={["repeat(5, 1fr)"]} gap={6}>
                        {data.gives.map((give) => (
                            <GiveItem key={give.id} give={give} />
                        ))}
                    </Grid>
            )}
        </Layout>
    )
}

export default Gives
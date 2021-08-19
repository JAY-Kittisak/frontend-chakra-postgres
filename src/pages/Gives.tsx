import React from 'react'
import { Flex, Text } from "@chakra-ui/react";

import { useIsAuth } from "../utils/uselsAuth";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import GiveItem from "../components/gives/GiveItem"
import { useGivesQuery } from '../generated/graphql'

interface Props { }

const Gives: React.FC<Props> = () => {
    useIsAuth()
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
                    <Flex flexDir="row">
                    {data.gives.map((give) => (
                        <GiveItem key={give.id} give={give} />
                    ))}
                    </Flex>
            )}
        </Layout>
    )
}

export default Gives
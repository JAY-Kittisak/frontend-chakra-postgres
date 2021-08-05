import React from 'react'
import { Text } from "@chakra-ui/react";

import { useIsAuth } from "../utils/uselsAuth";
import Spinner from "../components/Spinner";
import GiveItem from "../components/gives/GiveItem"
import { useGivesQuery } from '../generated/graphql'

interface Props { }

const Gives: React.FC<Props> = () => {
    useIsAuth()
    const [{ data, fetching }] = useGivesQuery()

    if (fetching) return <Spinner color="grey" height={50} width={50} />

    return (
        <>
            <Text as="h2" fontWeight="semibold" fontSize={["sm", "sm", "lg", "xl"]} my={2}>
                ของแจกลูกค้า
            </Text>
            {!data?.gives ? (
                <Text>No data.</Text>
            ) : (
                <>
                    {data.gives.map((give) => (
                        <GiveItem key={give.id} give={give} />
                    ))}
                </>
            )}
        </>
    )
}

export default Gives
import React from 'react'
import { Grid, Text, Flex, Divider } from "@chakra-ui/react";

interface Props { }

const ManualAD: React.FC<Props> = () => {
    return (
        <>
            <Text as="i" fontWeight="semibold" fontSize={["md", "md", "xl", "3xl"]}>
                คู่มือแผนก AD
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />
            {/* {fetching && */}
            <Flex justify="center" mt="5">
                {/* <Spinner color="grey" height={50} width={50} /> */}
                <Text fontWeight="bold" fontSize="2xl">
                    &nbsp; Loading...
                </Text>
            </Flex>
            {/* } */}

            {/* {!data?.gives ? ( */}
            <Flex justify="center" mt="5"><Text fontWeight="bold" fontSize="2xl">
                No. Data
            </Text>
            </Flex>
            {/* ) : ( */}
            <Grid templateColumns={["repeat(5, 1fr)"]} gap={6}>
                {/* {data.gives.map((give) => (
                            <GiveItem key={give.id} give={give} />
                        ))} */}
            </Grid>
            {/* )} */}
        </>
    )
}

export default ManualAD
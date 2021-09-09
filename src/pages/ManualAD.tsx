import React from "react";
import { Grid, Text, Flex, Divider } from "@chakra-ui/react";

import { useManualADsQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";
import ManualADItem from "../components/manualAD/ManualADItem";

interface Props { }

const ManualAD: React.FC<Props> = () => {
    const [{ data, fetching }] = useManualADsQuery();
    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
                คู่มือแผนก AD
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />
            {fetching && (
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            )}

            {!data?.manualADs ? (
                <Flex justify="center" mt="5">
                    <Text fontWeight="bold" fontSize="2xl">
                        No. Data
                    </Text>
                </Flex>
            ) : (
                <Grid templateColumns={["repeat(6, 1fr)"]} gap={6}>
                    {data.manualADs.map((manual) => (
                        <ManualADItem key={manual.id} manual={manual} />
                    ))}
                </Grid>
            )}
        </>
    );
};

export default ManualAD;

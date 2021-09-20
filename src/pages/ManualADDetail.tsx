import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Text, Divider, Button, Grid } from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import { useManualAdByIdQuery } from "../generated/graphql";
import { useIsAuth } from '../utils/uselsAuth'

interface Props { }

const ManualADDetail: React.FC<Props> = () => {
    useIsAuth()

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useManualAdByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    return (
        <Flex
            flexDir="column"
            w={[null, null, "100%", "100%"]}
            h="90vh"
            p={5}
            rounded="7px"
            boxShadow="md"
            bg="#eee"
        >

            {data?.manualADById && (
                <Flex>
                    <Text
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                    >
                        {data.manualADById.factoryName},
                    </Text>
                    <Text color="gray.500" isTruncated mt="4">
                        &nbsp; Email : &nbsp;{data.manualADById.email}, &nbsp; เบอร์โทร :
                        &nbsp;{data.manualADById.telephoneNumber}
                    </Text>
                </Flex>
            )}
            <Divider mt={1} mb={5} orientation="horizontal" />

            {fetching && (
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            )}

            {!data?.manualADById ? (
                <Text>No data.</Text>
            ) : (
                <Grid templateColumns={["repeat(6, 1fr)"]} gap={6}>
                    {data.manualADById.manualADUrl.map((urlPDF) => (
                        <a key={urlPDF.id} href={urlPDF.url} target="_blank" rel="noreferrer">
                            <Button colorScheme="red" color="white" h="60px" mr="3">
                                <i className="bi bi-file-earmark-pdf my-icon"></i>
                                <Text fontSize="md" ml="2">{urlPDF.title}</Text>
                            </Button>
                        </a>
                    ))}
                </Grid>
            )}
        </Flex>
    );
};

export default ManualADDetail;

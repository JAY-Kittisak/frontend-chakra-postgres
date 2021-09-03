import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Layout from "../components/Layout";

interface Props { }

const Index: React.FC<Props> = () => {

    return (
        <Layout variant="regular">
            <Flex flexDir="column" align="center">
                <Box w="90%" align="center" mt="2" bg="gray"
                    boxShadow="md"
                    rounded="lg">
                    <iframe height="800" width="800" src="http://200.1.1.99:4000/users/SKM-C250i21060510190-1630638893695.pdf" title="ds">
                    </iframe>
                </Box>
            </Flex>
        </Layout>
    );
};

export default Index;

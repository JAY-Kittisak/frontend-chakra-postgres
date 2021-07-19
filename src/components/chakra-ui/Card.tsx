import React from "react";
import { Text, Box } from "@chakra-ui/react";

interface Props {
    label: string;
    content: string;
}

const Card: React.FC<Props> = ({ label, content }) => {
    return (
        <Box w="100%" h="100%" bg="gray.600" rounded="10px" boxShadow="md" mb="3">
            <Text fontWeight="semibold" fontSize="xl" p="3">
                {label}
            </Text>
            <Box align="center" mt="-6">
                <Text fontWeight="semibold" fontSize="6xl" color="pink.500">
                    {content}
                </Text>
            </Box>
            <Box align="center">
                <Text as="u" fontSize="md">
                    รายละเอียด
                </Text>
            </Box>
        </Box>
    );
};

export default Card;

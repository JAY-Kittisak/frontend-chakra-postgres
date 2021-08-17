import React from "react";
import { Link } from "react-router-dom"
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
                <Link to={label === "สถานะงาน เบิกของแจกลูกค้า" ? "/order-give/my-orders" : "/"}>
                    <Text as="u" fontSize="md">
                        รายละเอียด
                    </Text>
                </Link>
            </Box>
        </Box>
    );
};

export default Card;

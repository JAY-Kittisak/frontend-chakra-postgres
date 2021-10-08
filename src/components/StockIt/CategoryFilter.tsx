import React from "react";
import { Text, Flex, Divider } from "@chakra-ui/react";

import { itemIt } from "../../utils/helpers";

interface Props {
    setCatItem: (name: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ setCatItem }) => {
    return (
        <>
            <Text
                fontSize="2xl"
                fontWeight="bold"
                as="i"
                color="gray.600"
                ml="3"
                mt="-10"
            >
                ประเภทอุปกรณ์
            </Text>
            <Flex flexDir="column" ml="5" p="2">
                {itemIt.map((value, i) => (
                    <Text
                        key={i}
                        p="1"
                        rounded="lg"
                        fontSize="sm"
                        color="gray"
                        cursor="pointer"
                        _hover={{ bgColor: "#eee", fontWeight: "bold" }}
                        onClick={() => setCatItem(value)}
                    >
                        {value}
                    </Text>
                ))}
            </Flex>
            <Divider w="90%" m="3" orientation="horizontal" />
        </>
    );
};

export default CategoryFilter;

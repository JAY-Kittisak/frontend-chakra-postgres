import React from 'react'
import { Text, Flex } from "@chakra-ui/react";

import { brandItemIt } from "../../utils/helpers";

interface Props {
    setBrandItem: (name: string) => void;
}

const BrandFilter: React.FC<Props> = ({ setBrandItem }) => {
    return (
        <>
            <Text
                fontSize="2xl"
                fontWeight="bold"
                as="i"
                color="gray.600"
                ml="3"
            >
                Brand
            </Text>
            <Flex flexDir="column" ml="5" p="2">
                {brandItemIt.map((value, i) => (
                    <Text
                        key={i}
                        p="1"
                        rounded="lg"
                        fontSize="sm"
                        color="gray"
                        cursor="pointer"
                        _hover={{ bgColor: "#eee", fontWeight: "bold" }}
                        onClick={() => setBrandItem(value)}
                    >
                        {value}
                    </Text>
                ))}
            </Flex>
        </>
    )
}

export default BrandFilter
import React from "react";
import { Link } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/react";

import { RegularStockItFragment } from "../../generated/graphql";

interface Props {
    stockIt: RegularStockItFragment;
}

const StockItItem: React.FC<Props> = ({
    stockIt: { id, itemName, imageUrl, serialNum },
}) => {

    return (
        <Link to={`/stock-it/stock-all/${id}`}>
            <Flex
                w="250px"
                flexDir="column"
                align="center"
                rounded="7px"
                boxShadow="md"
                p="3"
                ml="5"
                _hover={{ fontWeight: "bold" }}
            >
                {imageUrl && (
                    <Image
                        mr={2}
                        borderRadius="2xl"
                        boxSize="150px"
                        objectFit="cover"
                        src={imageUrl}
                    />
                )}
                <Text
                    align="center"
                    w="200px"
                    isTruncated
                >
                    {itemName}
                </Text>
                <Text
                    align="center"
                    w="200px"
                    color="#0AB68B"
                    isTruncated
                >
                    S/N : {serialNum}
                </Text>
            </Flex>
        </Link>
    );
};

export default StockItItem;

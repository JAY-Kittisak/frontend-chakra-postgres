import React from "react";
import { Link } from "react-router-dom";
import { useColorModeValue, Flex, Image, Text } from "@chakra-ui/react";

import { RegularGiveCdcFragment } from "../../generated/graphql";

interface Props {
    give: RegularGiveCdcFragment;
}

const GiveItemCdc: React.FC<Props> = ({
    give: { id, giveName, imageUrl, inventory },
}) => {
    const bg = useColorModeValue("white", "gray.700");

    return (
        <Link to={`/gives/gives-all-cdc/${id}`}>
            <Flex
                w="250px"
                flexDir="column"
                align="center"
                rounded="7px"
                boxShadow="md"
                bg={bg}
                p="3"
                ml="5"
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
                    color={inventory === 0 ? "red" : "#111"}
                    isTruncated
                >
                    {giveName}
                </Text>
            </Flex>
        </Link>
    );
};

export default GiveItemCdc;

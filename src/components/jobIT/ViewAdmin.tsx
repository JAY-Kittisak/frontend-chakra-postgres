import React from 'react'
import { Text, Flex, Image, Heading, } from "@chakra-ui/react";
import { useUserAdminQuery } from '../../generated/graphql'

interface Props { }

const ViewAdmin: React.FC<Props> = () => {
    const [{ data }] = useUserAdminQuery()
    return (
        <Flex
            align="center"
            boxShadow="md"
            ml="5"
            rounded="lg"
            p="3"
            mt="3"
        >
            {data && data.userAdmin.map(value => (
                <>
                    <Image
                        mr={2}
                        borderRadius="full"
                        boxSize="60px"
                        objectFit="cover"
                        src={value.imageUrl as string}
                    />
                    <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">{value.fullNameTH}</Heading>
                        <Text fontSize="sm" color="gray" isTruncated w="250px" mr="5">{value.roles}</Text>
                    </Flex>
                </>
            ))}
        </Flex>
    )
}

export default ViewAdmin
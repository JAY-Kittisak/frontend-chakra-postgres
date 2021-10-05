import React from 'react'
import { Text, Flex, Image, Heading, } from "@chakra-ui/react";
import { useUserAdminQuery } from '../../generated/graphql'

interface Props {
    setNameItAction: (name: string) => void
}

const ViewAdmin: React.FC<Props> = ({ setNameItAction }) => {
    const [{ data }] = useUserAdminQuery()
    return (
        <Flex
            flexDir="column"
            ml="5"
            p="3"
            mt="3"
        >
            {data && data.userAdmin.map(value => (
                <Flex
                    _hover={{ bgColor: "#eee" }}
                    cursor="pointer"
                    p="2"
                    key={value.id}
                    onClick={() => setNameItAction(value.fullNameTH as string)}
                    mb="5"
                    boxShadow="md"
                    rounded="lg"
                >
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
                </Flex>
            ))}
        </Flex>
    )
}

export default ViewAdmin
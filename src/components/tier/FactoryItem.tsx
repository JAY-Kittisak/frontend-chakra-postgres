import React from 'react'
import { Tr, Td, Text, Box, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Factory } from '../../generated/graphql'

interface Props {
    factory: Factory
}

const FactoryItem: React.FC<Props> = ({ factory: { id, companyName, industrialEstate, businessType, description } }) => {
    return (
        <Tr>
            <Td>
                <Text fontWeight="bold" display="inline-table" color="orange">{companyName}</Text>
            </Td>
            <Td><Text fontWeight="bold" display="inline-table">{industrialEstate}</Text></Td>
            <Td>{businessType}</Td>
            <Td>{description}</Td>
            <Td>
                <Link to={`/tiers/factories/${id}`}>
                    <Box textAlign="center">
                        <Button
                            colorScheme="blue"
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _active={{ boxShadow: "lg" }}
                        >
                            <Text color="white">
                                รายละเอียด
                            </Text>
                        </Button>
                    </Box>
                </Link>
            </Td>
        </Tr>
    )
}

export default FactoryItem
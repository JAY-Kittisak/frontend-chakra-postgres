import React from 'react'
import { Tr, Td, Text } from '@chakra-ui/react'
import { Factory } from '../../generated/graphql'

interface Props {
    factory: Factory
}

const FactoryItem: React.FC<Props> = ({ factory }) => {
    return (
        <Tr>
            <Td>
                <Text fontWeight="bold" display="inline-table" color="orange">{factory.companyName}</Text>
            </Td>
            <Td><Text fontWeight="bold" display="inline-table">{factory.industrialEstate}</Text></Td>
            <Td>{factory.businessType}</Td>
            <Td>{factory.description}</Td>
        </Tr>
    )
}

export default FactoryItem
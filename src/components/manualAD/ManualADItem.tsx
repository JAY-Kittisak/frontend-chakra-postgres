import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Text, Stack } from "@chakra-ui/react";


import { RegularManualAdFragment } from '../../generated/graphql'

interface Props {
    manual: RegularManualAdFragment
}

const ManualADItem: React.FC<Props> = ({ manual: { id, factoryName } }) => {
    return (
        <Link to={`/manual-ad/factories/${id}`}>
            <Flex
                w="250px"
                flexDir="column"
                align="center"
                rounded="7px"
                boxShadow="md"
                p="3"
                ml="5"
            >
                <Stack isInline>
                    <div className="my-icon">
                        <i className="bi bi-shop"></i>
                    </div>
                    <Text isTruncated>{factoryName}</Text>
                </Stack>
            </Flex>
        </Link>
    )
}

export default ManualADItem
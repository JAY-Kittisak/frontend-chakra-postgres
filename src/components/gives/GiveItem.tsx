import React from 'react'
import { Link } from 'react-router-dom'
import { Flex } from "@chakra-ui/react";

import { RegularGiveFragment } from '../../generated/graphql'

interface Props {
    give: RegularGiveFragment
}

const GiveItem: React.FC<Props> = ({ give: { id, giveName } }) => {
    return (
        <Link to={`/gives/gives-all/${id}`}>
            <Flex>
                {giveName}
            </Flex>
        </Link>
    )
}

export default GiveItem
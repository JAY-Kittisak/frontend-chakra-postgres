import React from 'react'
import { Flex } from '@chakra-ui/react'

import Sidebar from '../components/Sidebar'
import PagePost from './PagePost'

interface Props { }

const index: React.FC<Props> = () => {

    return (
        <Flex>
            <Sidebar />
            <PagePost />
        </Flex>
    )
}

export default index
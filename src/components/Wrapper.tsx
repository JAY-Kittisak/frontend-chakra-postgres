import React from 'react'
import { Flex } from '@chakra-ui/react'

export type WrapperVariant = 'small' | 'regular'

interface Props {
    variant?: WrapperVariant
}

const Wrapper: React.FC<Props> = ({ children, variant = 'regular' }) => {
    return (
        <Flex
            mx="auto"
            maxW={variant === 'regular' ? "95%" : ["95%", "75%", "50%",]}
            flexDir="column"
        >
            {children}
        </Flex>
    )
}

export default Wrapper
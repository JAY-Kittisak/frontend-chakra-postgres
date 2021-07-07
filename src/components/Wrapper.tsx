import React from 'react'
import { Flex } from '@chakra-ui/react'

export type WrapperVariant = 'small' | 'regular'

interface Props {
    variant?: WrapperVariant
}

const Wrapper: React.FC<Props> = ({ children, variant = 'regular' }) => {
    return (
        <Flex
            mt={8}
            mx="auto"
            maxW={variant === 'regular' ? "95%" : '50%'}
            flexDir="column"
        >
            {children}
        </Flex>
    )
}

export default Wrapper
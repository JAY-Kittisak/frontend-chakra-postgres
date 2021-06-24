import React from 'react'
import { Box } from '@chakra-ui/react'

export type WrapperVariant = 'small' | 'regular'

interface Props {
    variant?: WrapperVariant
}

const Wrapper: React.FC<Props> = ({ children, variant = 'regular' }) => {
    return (
        <Box
            mt={8}
            mx="auto"
            maxW={variant === 'regular' ? "90%" : '50%'}
            w="100%"
        >
            {children}
        </Box>
    )
}

export default Wrapper
import React from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import { formatUpperCase, formatAmount } from '../../utils/helpers'
import ProgressBar from './ProgressBar'

interface Props {
    title: string
    valueTarget: number
    valueCurrent: number
    color: string
}

const checkPercent = (value: number) => {
    if (value > 100) return 100
    else return value
}

const Target: React.FC<Props> = ({  title, valueTarget, valueCurrent, color}) => {

    const result = (valueCurrent / valueTarget) * 100
    const useFloor = Math.floor(result)
    const percent = `${checkPercent(useFloor)}%`

    return (
        <Box
            mt={3}
            px={5}
            py={2}
            shadow='md'
            borderWidth='1px'
            rounded="7px"
        >

        <Flex justifyContent="space-between">
            <Box>
                <Text
                    align='center'
                    fontSize="2xl"
                    fontWeight="semibold"
                    color={color}
                >
                    {formatAmount(valueCurrent)}
                </Text>
                <Text align='center' color='gray'>
                    current
                </Text>
            </Box>
            <Box>
                <Text
                    align='center'
                    fontSize="2xl"
                    color='gray'
                >
                    {formatAmount(valueTarget)}
                </Text>
                <Text align='center' color='gray'>
                    target
                </Text>
            </Box>
        </Flex>

            <Text fontWeight="semibold">{formatUpperCase(title)}</Text>
            <ProgressBar width={percent} color={color}/>
        </Box>
    )
}

export default Target
import React, { useEffect } from 'react'
import {
    Flex,
    Text,
    Button
} from "@chakra-ui/react";

import { catUserRole, CatUserRole } from '../../utils/helpers';

interface Props {
    title: string
    branch: string
    defaultBranch: number | undefined
    setBranch: (branch: CatUserRole) => void
}

const SwitchBranch: React.FC<Props> = ({ title, branch, defaultBranch, setBranch }) => {

    useEffect(() => {
        if (!defaultBranch) return
        
        if (defaultBranch === 1) {
            setBranch('ชลบุรี')
        } else {
            setBranch('ลาดกระบัง')
        }
    }, [defaultBranch, setBranch])

    return (
        <Flex justify="space-between">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="gray.600"
            >
                {title}
            </Text>
            <Flex mt="1">
                {catUserRole.map((value, i) => (
                    <Button
                        key={i}
                        size="md"
                        colorScheme="teal"
                        variant={branch === value ? "outline" : "link"}
                        mr="3"
                        onClick={() => setBranch(value)}
                    >
                        {value}
                    </Button>
                ))}
            </Flex>
        </Flex>
    )
}

export default SwitchBranch
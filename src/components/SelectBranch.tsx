import React from 'react'
import {
    Flex,
    Text,
    Button,
    Divider
} from "@chakra-ui/react";
import { selectBranch, Branch } from '../utils/helpers';

interface Props {
    title: string
    branch: string
    setBranch: (branch: Branch) => void
}

const SelectBranch: React.FC<Props> = ({ title, branch, setBranch }) => {
    return (
        <Flex flexDir="column" px="5">
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
                    {selectBranch.map((value, i) => (
                        <Button
                            key={i}
                            size="md"
                            colorScheme="teal"
                            variant={(branch === value) ? "outline" : "link"}
                            mr="3"
                            onClick={() => setBranch(value)}
                        >
                            {value}
                        </Button>
                    ))}
                </Flex>
            </Flex>
            <Divider mt={1} mb={5} orientation="horizontal" />
        </Flex>
    )
}

export default SelectBranch
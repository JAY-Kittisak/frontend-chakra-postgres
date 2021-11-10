import React from 'react'
import { Text, Flex, Button } from "@chakra-ui/react";

import Spinner from '../Spinner';
import InputField from '../InputField';

interface Props { }

const SelectCompany: React.FC<Props> = () => {
    return (
        <Flex
            flexDir="column"
            w="40%"
            p="6"
            mt="8"
            ml="3"
            bg="white"
            boxShadow="xl"
            borderRadius="md"
        >
            <Flex justify="center">
                <Text fontSize="2xl" fontWeight="bold">
                    Select Company
                </Text>
            </Flex>
            {false && (
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={30} width={30} />
                    <Text fontWeight="bold" fontSize="xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            )}

            <Flex w="50%">
                <InputField
                    name="test"
                    placeholder="บริษัท..."
                    label="ค้นหา :"
                />
                <Button
                    ml="5"
                    mt="10"
                    colorScheme="green"
                >
                    + เพิ่ม
                </Button>
            </Flex>


        </Flex>
    )
}

export default SelectCompany
import React from 'react'
import { Flex, Text, Divider } from '@chakra-ui/react'
import testsvg from '../testsvg.svg';

interface Props { }

const PageNotFound: React.FC<Props> = () => {
    return (
        <Flex justify='center' >
            <Flex flexDir="column" align='center'>
                <Text fontSize="6xl">Page not found!!!</Text>
                <Divider mt={1} orientation="horizontal" />
                <Text fontSize="xl" color="gray.500">หน้าเว็บนี้ไม่มีอยู่ โปรแจ้งผู้ดูแลระบบ</Text>
                <Flex mt="150px">
                    <img src={testsvg} className="App-logo" alt="logo" />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PageNotFound
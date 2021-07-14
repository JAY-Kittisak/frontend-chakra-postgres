import React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Text, Flex, Box, Heading, Link } from '@chakra-ui/react'
import { User } from '../../generated/graphql'

interface Props {
    me: User
}

const AddAndEditProfile: React.FC<Props> = ({ me }) => {
    const history = useHistory()

    return (
        <Flex flexDir="column" alignItems="center" mt={5}>
            {/* {meData && (
                <Profile meData={meData} />
            )} */}
            <Avatar size="2xl" my={2} src={me.imageUrl as string} />
            <Text textAlign="center">{me.fullNameTH}</Text>
            <Link onClick={() => {
                history.push('/profile')
            }}>
                <Box p="2" align="center">
                    <Heading fontSize={["sm", "md", "lg", "xl"]}>แก้ไขโปรไฟล์</Heading>
                </Box>
            </Link>
        </Flex>
    )
}

export default AddAndEditProfile
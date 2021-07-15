import React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Text, Flex, Box, Link } from '@chakra-ui/react'
import { User } from '../../generated/graphql'

interface Props {
    me: User
}

const AddAndEditProfile: React.FC<Props> = ({ me }) => {
    const history = useHistory()

    return (
        <Flex flexDir="column" alignItems="center" mt={5}>
            <Avatar size="2xl" my={2} src={me.imageUrl as string} />
            <Text textAlign="center">{me.fullNameTH}</Text>
            <Link onClick={() => {
                history.push('/profile')
            }}>
                <Box mt="1" align="center">
                    <Text fontSize={["sm", "md", "lg", "xl"]}>Profile</Text>
                </Box>
            </Link>
        </Flex>
    )
}

export default AddAndEditProfile
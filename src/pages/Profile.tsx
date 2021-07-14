import React from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Text, Flex, Box, Heading, Link, Image } from '@chakra-ui/react'
// import { User } from '../generated/graphql'
import { useMeQuery } from '../generated/graphql'
import Layout from "../components/Layout";
interface Props {
}

const Profile: React.FC<Props> = () => {
    const history = useHistory()
    const [{ data }] = useMeQuery()
    console.log(data)
    return (
        <Layout variant="regular">
            {
                data?.me ? (
                    <Flex flexDir="column" alignItems="center" mt={5} h="100" w="100">
                        <Avatar size="2xl" my={2} src={data.me.imageUrl as string} />
                        <Image
                            borderRadius="full"
                            boxSize="250px"
                            src={data.me.imageUrl as string}
                            alt="Segun Adebayo"
                        />
                        <Image boxSize="200px" objectFit="cover" src={data.me.imageUrl as string} alt="Dan Abramov" />
                        <Text textAlign="center">{data.me.fullNameTH}</Text>
                        <Link onClick={() => { history.push('/profile') }}>
                            <Box p="2" align="center">
                                <Heading fontSize={["sm", "md", "lg", "xl"]}>Profile</Heading>
                            </Box>
                        </Link>
                    </Flex >
                ) : (
                    <div>No Data.</div>
                )}
        </Layout>
    )
}

export default Profile
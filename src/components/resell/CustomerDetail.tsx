import React, { useRef } from 'react'
import {
    Flex,
    Center,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { useCustomerByIdQuery } from '../../generated/graphql';
import Spinner from '../Spinner';

interface Props {
    customerId: number
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomerDetail: React.FC<Props> = ({ customerId, isOpen, setIsOpen }) => {
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const [{ data, fetching }] = useCustomerByIdQuery({
        variables: {
            id: customerId,
        }
    })

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef.current}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {data?.customerById.customerName}
                    </AlertDialogHeader>
                    {fetching && !data ? (
                        <Center>
                            <Spinner color="grey" height={50} width={50} />
                            <Text
                                as="i"
                                fontWeight="semibold"
                                fontSize={["md", "md", "xl", "3xl"]}
                                my={2}
                            >
                                {" "}
                                &nbsp; Loading...
                            </Text>
                        </Center>
                    ) : (
                        <AlertDialogBody fontSize="lg" minH="200px">
                            <Text>Customer Code : {data?.customerById.customerCode}</Text>
                            <Flex mt="2" justify="space-between">
                                <Text>Phone : {data?.customerById.phone}</Text>
                                <Text>Email : {data?.customerById.email}</Text>
                            </Flex>
                            <Flex mt="2" justify="space-between">
                                <Text>Province : {data?.customerById.province}</Text>
                                <Text>Amphure : {data?.customerById.amphure}</Text>
                            </Flex>
                            <Flex mt="2" justify="space-between">
                                <Text>District : {data?.customerById.district}</Text>
                                <Text>ZipCode : {data?.customerById.zipCode}</Text>
                            </Flex>
                        </AlertDialogBody>
                    )}

                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default CustomerDetail
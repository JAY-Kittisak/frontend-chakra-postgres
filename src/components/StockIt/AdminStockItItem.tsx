import React, { useState, useRef } from 'react'
import {
    Tr, Td, Center, IconButton, Text, Flex, Image, Heading,
    Button, AlertDialog, AlertDialogBody, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { RegularStockItFragment } from '../../generated/graphql';
import { formatDate } from "../../utils/helpers";

interface Props {
    item: RegularStockItFragment
    setOpenEdit: (open: boolean) => void
    setStockToEdit: (item: RegularStockItFragment | null) => void
}

const AdminStockItItem: React.FC<Props> = ({ item, setOpenEdit, setStockToEdit }) => {
    const [deleteDialog, setDeleteDialog] = useState(false)
    const onClose = () => setDeleteDialog(false)
    const cancelRef = useRef()
    // const [, deleteGive] = useDeleteGiveMutation()

    return (
        <Tr _hover={{ bgColor: "#eee" }}>
            <Td fontSize={["xs", "xs", "sm", "md"]}>
                <Flex align="center">
                    {item.imageUrl &&
                        <Image
                            mr={2}
                            borderRadius="2xl"
                            boxSize="60px"
                            objectFit="cover"
                            src={item.imageUrl}
                        />
                    }
                    <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight" w="200px" isTruncated>{item.itemName}</Heading>
                        <Text fontSize="sm" color="gray" isTruncated w="200px" mr="5">{item.details}</Text>
                    </Flex>
                </Flex>
            </Td>
            <Td>
                <Center>{item.serialNum}</Center>
            </Td>
            <Td>
                <Center>
                    {item.category}
                </Center>
            </Td>
            <Td>
                <Text>วันที่ update: {formatDate(+item.updatedAt)}</Text>
                <Text>วันที่ create: {formatDate(+item.createdAt)}</Text>
            </Td>
            <Td>
                <Center>{item.holdStatus}</Center>
                {item.useBy &&
                    <Center>โดย: {item.useBy.fullNameTH}</Center>
                }
            </Td>
            <Td>
                <Center>{item.status}</Center>
            </Td>
            <Td>
                <Center>
                    <IconButton
                        aria-label=""
                        icon={<EditIcon />}
                        mr="3"
                        colorScheme="green"
                        onClick={() => {
                            setOpenEdit(true)
                            setStockToEdit(item)
                        }}
                    />
                    <IconButton
                        aria-label=""
                        icon={<DeleteIcon />}
                        color="red"
                        colorScheme="green"
                        onClick={() => setDeleteDialog(true)}
                    />
                    <AlertDialog
                        isOpen={deleteDialog}
                        leastDestructiveRef={cancelRef.current}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    <Flex bgColor="red" rounded="7px" boxShadow="md">
                                        <Text fontWeight="bold" color="white" ml="5">Delete Give</Text>
                                    </Flex>
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure? You can't undo this action afterwards. <br />
                                    <Text>
                                        คุณต้องการลบ {item.itemName} ใช่หรือไม่
                                    </Text>
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef.current} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="white"
                                        bgColor="red"
                                        ml={3}
                                        onClick={async () => {
                                            alert(`Delete item ID ${item.id}`)
                                            setDeleteDialog(false)
                                            // const response = await deleteGive({ id: give.id })
                                            // if (!response) {
                                            //     alert("Delete Error! โปรดติดต่อผู้ดูแล")
                                            // } else if (response) {
                                            //     setDeleteDialog(false)
                                            // }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Center>
            </Td>
        </Tr>
    )
}

export default AdminStockItItem
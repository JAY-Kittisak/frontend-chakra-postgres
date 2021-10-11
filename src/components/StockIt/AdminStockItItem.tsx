import React from 'react'
import {
    Tr, Td, Center, IconButton, Text, Flex, Image, Heading,
    // Button, Stack, AlertDialog, AlertDialogBody, AlertDialogFooter,
    // AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { RegularStockItFragment } from '../../generated/graphql';
import { formatDate } from "../../utils/helpers";

interface Props {
    item: RegularStockItFragment
    setOpen: (open: boolean) => void
    setStockToEdit: (item: RegularStockItFragment | null) => void
}

const AdminStockItItem: React.FC<Props> = ({ item, setOpen, setStockToEdit }) => {
    return (
        <Tr>
            <Td fontSize={["xs", "xs", "sm", "md"]}>
                <Flex align="center" >
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
                            setOpen(true)
                            setStockToEdit(item)
                        }}
                    />
                    <IconButton
                        aria-label=""
                        icon={<DeleteIcon />}
                        color="red"
                        colorScheme="green"
                    // onClick={() => setDeleteDialog(true)}
                    />
                    {/* <AlertDialog
                        isOpen={deleteDialog}
                        leastDestructiveRef={cancelRef.current}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    <Flex bgColor={colorMode === "light" ? "red" : "red.400"} rounded="7px" boxShadow="md">
                                        <Text fontWeight="bold" color="white" ml="5">Delete Give</Text>
                                    </Flex>
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure? You can't undo this action afterwards. <br />
                                    <Stack isInline>
                                        <Text>คุณต้องการลบ</Text>
                                        <Text fontWeight="bold" color="red">{give.giveName}</Text>
                                        <Text>ใช่หรือไม่</Text>
                                    </Stack>
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef.current} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="white"
                                        bgColor={colorMode === "light" ? "red" : "red.400"}
                                        ml={3}
                                        onClick={async () => {
                                            const response = await deleteGive({ id: give.id })
                                            if (!response) {
                                                alert("Delete Error! โปรดติดต่อผู้ดูแล")
                                            } else if (response) {
                                                setDeleteDialog(false)
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog> */}
                </Center>
            </Td>
        </Tr>
    )
}

export default AdminStockItItem
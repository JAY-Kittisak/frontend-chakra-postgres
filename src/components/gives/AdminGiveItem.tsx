import React, { useState, useRef } from "react";
import {
    Tr, Td, Center, useColorMode, IconButton, Text, Button, Stack, Flex,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { RegularGiveFragment, useDeleteGiveMutation } from "../../generated/graphql";
import { formatAmount } from "../../utils/helpers";

interface Props {
    give: RegularGiveFragment;
    setOpen: (open: boolean) => void
    setGiveToEdit: (give: RegularGiveFragment | null) => void
}

const AdminGiveItem: React.FC<Props> = ({
    give,
    setOpen,
    setGiveToEdit
}) => {
    const [deleteDialog, setDeleteDialog] = useState(false)
    const onClose = () => setDeleteDialog(false)
    const cancelRef = useRef()
    const [, deleteGive] = useDeleteGiveMutation()
    const { colorMode } = useColorMode();

    return (
        <Tr>
            <Td fontSize={["xs", "xs", "sm", "md"]}>
                {give.imageUrl ? (
                    <Center>{give.imageUrl}</Center>
                ) : (
                    <Center>
                        <IconButton
                            aria-label=""
                            icon={<AddIcon />}
                            mr="3"
                            colorScheme={colorMode === "light" ? "green" : "blue"}
                        />
                    </Center>
                )}
            </Td>
            <Td>
                <Center>{give.giveName}</Center>
            </Td>
            <Td >
                <Center>
                    <Text isTruncated w="300px">
                        {give.details}
                    </Text>
                </Center>
            </Td>
            <Td>
                <Center>{give.price && formatAmount(give.price)} บาท</Center>
            </Td>
            <Td>
                <Center>{give.inventory && formatAmount(give.inventory)} ชิ้น</Center>
            </Td>
            <Td>
                <Center>{give.category}</Center>
            </Td>
            <Td>
                <Center>{new Date(+give.updatedAt).toDateString()}</Center>
            </Td>
            <Td>
                <Center>
                    <IconButton
                        aria-label=""
                        icon={<EditIcon />}
                        mr="3"
                        colorScheme={colorMode === "light" ? "green" : "blue"}
                        onClick={() => {
                            setOpen(true)
                            setGiveToEdit(give)
                        }}
                    />
                    <IconButton
                        aria-label=""
                        icon={<DeleteIcon />}
                        color={colorMode === "light" ? "red" : "red.800"}
                        colorScheme={colorMode === "light" ? "green" : "blue"}
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
                                            if (response.data?.deleteGive === false) {
                                                alert("Delete Error! โปรดติดต่อผู้ดูแล")
                                            } else if (response.data?.deleteGive === true) {
                                                setDeleteDialog(false)
                                            }
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
    );
};

export default AdminGiveItem;

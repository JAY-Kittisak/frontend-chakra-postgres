import React, { useState, useRef, ChangeEvent } from 'react'
import {
    Avatar,
    Box,
    Button,
    Center,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Input,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useUploadImageMeMutation } from '../../generated/graphql';

const fileType = ['image/png', 'image/jpeg', 'image/ipg']

interface Props {
    imagesUrl: string
}

const AddImageUser: React.FC<Props> = ({ imagesUrl }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const [, uploadImageMe] = useUploadImageMeMutation()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || !files[0]) return

        const file = files[0]

        if (!fileType.includes(file.type)) {
            alert('Wrong file format, allow only "png" or "jpeg" or "jpg"')
            return
        }
        setSelectedFile(file)

    }

    return (
        <Box mb="3" align="center">
            <Avatar
                size="2xl"
                src={
                    imagesUrl ? (imagesUrl as string | undefined) : ""
                }
            />
            <Center>
                <Button
                    mt={1}
                    type="submit"
                    colorScheme="teal"
                    size="xs"
                    onClick={() => setIsOpen(true)}
                >
                    {imagesUrl ? ("เปลี่ยนรูป") : ("เพิ่มรูป")}
                </Button>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef.current}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                อัพโหลดรูปภาพของคุณ
                            </AlertDialogHeader>
                            <ModalCloseButton />

                            <AlertDialogBody>
                                <Input type="file" p="1" onChange={handleFileChange} />
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef.current} onClick={onClose} colorScheme="green">
                                    Save
                                </Button>

                                {selectedFile && (
                                    <Button colorScheme="red" onClick={() => {
                                        uploadImageMe({ options: selectedFile })
                                        setIsOpen(false)
                                    }} ml={3}>
                                        Submit
                                    </Button>
                                )}
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Center>
        </Box>
    )
}

export default AddImageUser
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
    Text
} from "@chakra-ui/react";
import { useUploadImageMeMutation } from '../../generated/graphql';
import { FieldError } from '../../generated/graphql'
import { fileType } from "../../utils/helpers"

interface Props {
    imagesUrl: string
}

const AddImageUser: React.FC<Props> = ({ imagesUrl }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [errors, setErrors] = useState(false)
    const [errMessage, setErrMessage] = useState<FieldError[]>()

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
                                {errors &&
                                    <>
                                        <Text color="yellow.400" p="3">
                                            Warning:!! ขนาดไฟล์ของคุณคือ {selectedFile?.size}
                                            KB. ซึ่งใหญ่เกิน 100000 KB.
                                        </Text>
                                        <Text color="red.400">
                                            {errMessage}
                                        </Text>
                                    </>
                                }
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                {selectedFile && (
                                    <Button
                                        colorScheme="teal"
                                        onClick={async () => {
                                            if (selectedFile.size >= 100000) {
                                                setErrors(true)
                                            }

                                            const response = await uploadImageMe({ options: selectedFile })
                                            if (response.data?.uploadImageMe.errors) {
                                                setErrMessage(response.data?.uploadImageMe.errors)
                                                setErrors(true)
                                            } else if (response.data?.uploadImageMe.user) {
                                                setErrors(false)
                                                setIsOpen(false)
                                            }

                                        }} ml={3}>
                                        Save
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
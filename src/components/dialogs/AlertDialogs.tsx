import React, { useRef } from 'react'
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from '@chakra-ui/react'

interface Props {
    Open: boolean
    setOpen: () => void
    onOpenDialog?: (open: boolean) => void
    header: string
    message: string
    onConfirm?: () => void
    onCancel?: () => void
    loading?: boolean
    error?: string
    confirmText?: string
}

const AlertDialogs: React.FC<Props> = ({
    Open,
    setOpen,
    header,
    message,
    onConfirm,
    onCancel,
    loading,
    error,
    confirmText
}) => {
    const cancelRef = useRef()

    return (
        <AlertDialog
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {header}
                    </AlertDialogHeader>
                    <ModalCloseButton />

                    <AlertDialogBody>
                        {message}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef.current} onClick={setOpen} >
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={setOpen} ml={3}>
                            ตกลง
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AlertDialogs
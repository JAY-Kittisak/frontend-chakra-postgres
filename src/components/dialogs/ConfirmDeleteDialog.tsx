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
}

const ConfirmDeleteDialog: React.FC<Props> = ({ Open, setOpen }) => {
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
                        AlertDialog
                    </AlertDialogHeader>
                    <ModalCloseButton />

                    <AlertDialogBody>
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

export default ConfirmDeleteDialog
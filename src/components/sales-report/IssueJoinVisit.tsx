import React, { useRef } from 'react'
import {
    Button, AlertDialog, AlertDialogBody, AlertDialogFooter,
    AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { useJoinVisitMutation } from "../../generated/graphql"
import InputField from '../InputField'

interface Props {
    Open: boolean
    setOpen: () => void
    visitId: number
}

const IssueJoinVisit: React.FC<Props> = ({ Open, setOpen, visitId }) => {
    const cancelRef = useRef();
    const [, joinVisit] = useJoinVisitMutation();

    return (
        <AlertDialog
            size="sm"
            isOpen={Open}
            leastDestructiveRef={cancelRef.current}
            onClose={setOpen}
            isCentered
        >
            <Formik
                initialValues={{
                    visitId,
                    issueId: 0,
                }}
                onSubmit={async (values) => {
                    const response = await joinVisit({ input: values })
                    if (response.error?.message) {
                        return alert(response.error?.message)
                    } else if (response.data?.joinVisit) {
                        return setOpen()
                    }
                }}
            >{({ isSubmitting }) => (
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader textAlign='center' fontSize="lg" fontWeight="bold">
                            เพิ่ม Issue
                        </AlertDialogHeader>
                        <ModalCloseButton />

                        <Form>
                            <AlertDialogBody textAlign='center'>
                                <InputField
                                    type="number"
                                    name="issueId"
                                    placeholder='ไอดี'
                                    label="Issue ID :"
                                />
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button
                                    isLoading={isSubmitting}
                                    colorScheme="teal"
                                    type="submit"
                                >
                                    Save
                                </Button>
                                <Button ml={3} ref={cancelRef.current} onClick={setOpen}>
                                    Cancel
                                </Button>
                            </AlertDialogFooter>
                        </Form>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            )}
            </Formik>
        </AlertDialog>
    )
}

export default IssueJoinVisit

import React from 'react'
import { Form, Formik, } from "formik";
import { Box, Button, Text } from "@chakra-ui/react";

import InputField from "../InputField";
import { useJobItCommentMutation } from '../../generated/graphql';

interface Props {
    id: number
    comment: string | undefined
}

const ITComment: React.FC<Props> = ({ id, comment }) => {
    const [, jobItComment] = useJobItCommentMutation()
    return (
        <Box flexDir="column" align="end">
            <Text
                fontSize={["sm", "sm", "md", "md"]}
                as="i"
                fontWeight="semibold"
            >
                {comment}
            </Text>
            <Formik
                initialValues={{
                    itComment: "",
                }}
                onSubmit={async (values) => {
                    if (values.itComment.length <= 5) return alert("น้อยกว่า 5 ตัวอักษร")

                    const response = await jobItComment({ id, input: values.itComment });
                    if (response.error) {
                        alert(response.error)
                    }
                    //  else if (response.data?.jobITComment) {
                    //     alert("บันทึกเส็จเรียบร้อย")
                    // }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box marginY="-5">
                        <InputField
                            textarea
                            name="itComment"
                            placeholder="รายละเอียด..."
                            label="IT Comment :"
                        />

                        <Button
                            w="100%"
                            colorScheme="green"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Save
                        </Button>
                        </Box>

                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default ITComment
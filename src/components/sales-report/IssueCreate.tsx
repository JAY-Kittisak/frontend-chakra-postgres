import React from 'react'
import {
    Flex, Text, Button, Table, Thead,
    Tr, Tbody, Td, Th
} from '@chakra-ui/react'

import { useDialog } from "../dialogs/useDialog";
import IssueCreateDialog from './IssueCreateDialog';
import { useIssueByRoleIdQuery, useJoinVisitMutation } from '../../generated/graphql'
import { formatDate, AlertNt } from '../../utils/helpers'
import Spinner from '../Spinner';

interface Props {
    visitId: number
    saleRoleId: number
    checkAddId: number[] | undefined
    setAlertWarning: (action: AlertNt) => void | undefined
    setAlertSuccess: (action: AlertNt) => void | undefined
}

const IssueCreate: React.FC<Props> = ({
    visitId,
    saleRoleId,
    checkAddId,
    setAlertWarning,
    setAlertSuccess
}) => {
    const { isOpen, setIsOpen } = useDialog();

    const [{ data, fetching }] = useIssueByRoleIdQuery({
        variables: {
            saleRoleId,
        },
    });

    const [, joinVisit] = useJoinVisitMutation();

    const joinData = async (issueId: number) => {
        const response = await joinVisit({ input: { visitId, issueId } })
        if (response.error?.message) {
            return alert("Error Function joinVisit")
        } else if (response.data?.joinVisit) {
            return setAlertSuccess("show")
        }
    };

    return (
        <Flex
            flexDir="column"
            w="50%"
            h="85vh"
            px="6"
            mt="8"
            ml="3"
            boxShadow="xl"
            borderRadius="md"
        >
            <Text align='center' fontSize="2xl" fontWeight="bold" mb='5'>
                Issue ทั้งหมดของคุณ
            </Text>

            {(fetching) ? (
                <Flex h="225px" justify="center" align="center">
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
                </Flex>
            ) : (
                <Flex mt="5" overflowX="auto" rounded="5px" boxShadow="md">
                    <Table variant='striped' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th fontSize='lg'>รายละเอียด</Th>
                                <Th fontSize='lg' isNumeric>วันที่</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.issueByRoleId && data.issueByRoleId.map(item => (
                                <Tr
                                    key={item.id}
                                    cursor={
                                        !checkAddId ? "pointer"
                                            : checkAddId.includes(item.id)
                                                ? "not-allowed"
                                                : "pointer"
                                    }
                                    onClick={() => {
                                        if (checkAddId?.includes(item.id)) {
                                            return setAlertWarning("show")
                                        }
                                        joinData(item.id)
                                    }}
                                >
                                    <Td className='truncated' maxW="400px">
                                        <Flex>
                                            {checkAddId?.includes(item.id) ? (
                                                <Flex>
                                                    <i className="bi bi-check-square"></i>
                                                </Flex>
                                            ) : (
                                                <Flex>
                                                    <i className="bi bi-square"></i>
                                                </Flex>
                                            )}
                                            <Text ml="10">{item.detail}</Text>
                                        </Flex>
                                    </Td>
                                    <Td isNumeric>{formatDate(+item.createdAt)}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
            )}

            <Button colorScheme='teal' my={5} onClick={() => setIsOpen(true)}>New Issue</Button>

            {isOpen && (
                <IssueCreateDialog
                    Open={true}
                    setOpen={() => setIsOpen(false)}
                    branch={'ลาดกระบัง'}
                    visitId={visitId}
                />
            )}
        </Flex>
    )
}

export default IssueCreate
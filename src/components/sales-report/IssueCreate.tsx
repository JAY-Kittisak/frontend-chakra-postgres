import React from 'react'
import {
    Flex, Text, Button,
    TableContainer, Table, Thead,
    Tr, Tbody, Td, Th
} from '@chakra-ui/react'

import { useDialog } from "../dialogs/useDialog";
import IssueCreateDialog from './IssueCreateDialog';
import { useIssueByRoleIdQuery } from '../../generated/graphql'
import { formatDate } from '../../utils/helpers'
import Spinner from '../Spinner';

interface Props {
    visitId: number
    customer: string
    saleRoleId: number
}

const IssueCreate: React.FC<Props> = ({ visitId, saleRoleId, customer }) => {
    const { isOpen, setIsOpen } = useDialog();
    const [{ data, fetching }] = useIssueByRoleIdQuery({
        variables: {
            id: saleRoleId,
        },
    });

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
            justifyContent='space-between'
        >
            <Flex alignItems="center" flexDir="column">
                <Text fontSize="2xl" fontWeight="bold" mb='5'>
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
                    <TableContainer w="100%">
                        <Table variant='striped' colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th fontSize='lg'>ID</Th>
                                    <Th fontSize='lg'>รายละเอียด</Th>
                                    <Th fontSize='lg' isNumeric>วันที่</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.issueByRoleId && data.issueByRoleId.map(item => (
                                    <Tr key={item.id}>
                                        <Td>{item.id}</Td>
                                        <Td className='truncated' maxW="400px">{item.detail}</Td>
                                        <Td isNumeric>{formatDate(+item.createdAt)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Flex>

            <Button colorScheme='teal' my={5} onClick={() => setIsOpen(true)}>New Issue</Button>

            {isOpen && (
                <IssueCreateDialog
                    Open={true}
                    setOpen={() => setIsOpen(false)}
                    branch={'ลาดกระบัง'}
                    visitId={visitId}
                    customer={customer}
                />
            )}
        </Flex>
    )
}

export default IssueCreate
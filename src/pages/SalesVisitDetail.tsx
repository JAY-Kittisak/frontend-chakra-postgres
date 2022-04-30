import React from 'react'
import { Flex, Text, Divider, Button, Stack, Heading, Box } from '@chakra-ui/react'
import { useParams, useHistory } from "react-router-dom";

import Spinner from "../components/Spinner";
import IssueCreate from '../components/sales-report/IssueCreate'
import IssueJoinVisit from '../components/sales-report/IssueJoinVisit';
import { useDialog } from '../components/dialogs/useDialog'
import { useVisitByIdQuery } from "../generated/graphql";
import { formatDate } from "../utils/helpers";

interface Props { }

const SalesVisitDetail: React.FC<Props> = () => {

    const params = useParams<{ id: string }>();

    const { isOpen, setIsOpen } = useDialog();

    const history = useHistory();

    const [{ data, fetching }] = useVisitByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    return (
        <Flex flexDir="column" px="5" overflowY="auto" h="95vh">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                color="green.600"
            >
                รายละเอียดการเข้าพบลูกค้า
            </Text>

            <Divider orientation="horizontal" />
            {!data?.visitById || fetching ? (
                <Flex justify="center" mt="5">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading... or No data.
                    </Text>
                </Flex>
            ) : (
                <Flex>
                    <Flex flexDir="column" w="50%" p="6" mt="2" rounded="7px" boxShadow="md">
                        <Text textAlign='center' fontSize="2xl" fontWeight="bold" mb='6'>
                            ข้อมูลการเข้าพบลูกค้า
                        </Text>

                        <Stack isInline justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                ชื่อ Sales :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.saleName}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                สาขา :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.branch}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                ชื่อบริษัท :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.customer}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                วันที่ไปพบลูกค้า :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.visitDate}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                วัตถุประสงค์การเข้า :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.jobPurpose}
                            </Text>
                        </Stack>
                        {data.visitById.jobPurpose === 'ติดตามใบเสนอราคา' && (
                            <>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        เลขที่ใบเสนอราคา :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.visitById.quotationNo}
                                    </Text>
                                </Stack>
                                <Stack isInline mt={3} justify="space-between">
                                    <Text
                                        fontSize={["sm", "sm", "md", "md"]}
                                        fontWeight="semibold"
                                    >
                                        มูลค่าการเสนอราคา :{" "}
                                    </Text>
                                    <Text fontSize={["sm", "sm", "md", "md"]}>
                                        {data.visitById.value}
                                    </Text>
                                </Stack>
                            </>
                        )}
                        <Stack isInline mt={3} justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                ชื่อผู้ติดต่อ :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.contactName}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                ตำแหน่งผู้ติดต่อ :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.position}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                ประเภทลูกค้า :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.customerType}
                            </Text>
                        </Stack>
                        <Stack isInline mt={3} justify="space-between">
                            <Text
                                fontSize={["sm", "sm", "md", "md"]}
                                fontWeight="semibold"
                            >
                                แผนกผู้ติดต่อ :{" "}
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "md"]}>
                                {data.visitById.department}
                            </Text>
                        </Stack>

                        {data.visitById.issueReceives && data.visitById.issueReceives.map(item => (
                            <Box 
                                key={item.id} 
                                p={5} 
                                mt={3} 
                                shadow='md' 
                                borderWidth='1px'
                                cursor='pointer'
                                _hover={{ bg: '#eee'}}
                                onClick={() => history.push(`/sales-report/issue/${item.id}`)}
                            >
                                <Stack isInline justify="space-between">
                                    <Heading fontSize='xl'>Issue ID : {item.id}</Heading>
                                    <Text>วันที่ : {formatDate(+item.createdAt)}</Text>
                                </Stack>
                                <Text mt={4}>{item.detail}</Text>
                          </Box>
                        ))}

                        <Button
                            colorScheme='teal'
                            mt={5}
                            onClick={() => setIsOpen(true)}
                        >
                            เลือก Issue
                        </Button>

                        {isOpen && (
                            <IssueJoinVisit
                                Open={true}
                                setOpen={() => setIsOpen(false)}
                                visitId={+params.id}
                            />
                        )}

                    </Flex>
                    <IssueCreate visitId={+params.id} customer={data.visitById.customer} saleRoleId={data.visitById.saleRoleId}/>
                </Flex>
            )}
        </Flex>
    )
}

export default SalesVisitDetail
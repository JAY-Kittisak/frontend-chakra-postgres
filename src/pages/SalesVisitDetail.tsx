import React, { useState } from 'react'
import { Flex, Text, Divider, Button, Stack, Heading, Box } from '@chakra-ui/react'
import { useParams, useHistory } from "react-router-dom";

import Spinner from "../components/Spinner";
import IssueCreate from '../components/sales-report/IssueCreate'
import AddQuotation from '../components/sales-report/AddQuotation';
import { useDialog } from '../components/dialogs/useDialog'
import AlertNotification from "../components/dialogs/AlertNotification";
import AlertNtSuccess from "../components/dialogs/AlertNtSuccess";
import { useVisitByIdQuery } from "../generated/graphql";
import { formatDate, AlertNt } from "../utils/helpers";

interface Props { }

const SalesVisitDetail: React.FC<Props> = () => {
    const [alertSuccess, setAlertSuccess] = useState<AlertNt>("hide")
    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide")

    const params = useParams<{ id: string }>();

    const { isOpen, setIsOpen } = useDialog();

    const history = useHistory();

    const [{ data, fetching }] = useVisitByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    const checkAddId = data?.visitById?.issueReceives?.map(val => val.id)

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

            <AlertNtSuccess alertSuccess={alertSuccess} setAlertSuccess={setAlertSuccess} />
            <AlertNotification alertWarning={alertWarning} setAlertWarning={setAlertWarning} label="ไม่สามารถเลือกตัวเลือกนี้ได้!" />

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

                        <Flex>
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                ชื่อ Sales : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.saleName} &nbsp;
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                สาขา : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.branch}
                            </Text>
                        </Flex>
                        <Flex mt="1">
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                ชื่อบริษัท : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.customer}
                            </Text>
                        </Flex>
                        <Flex mt="1">
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                วัตถุประสงค์การเข้า : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.jobPurpose} &nbsp;
                            </Text>
                        </Flex>
                        <Flex mt="1">
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                วันที่ไปพบลูกค้า : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.visitDate}
                            </Text>
                        </Flex>
                        <Flex mt="1">
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                ชื่อผู้ติดต่อ : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.contactName} &nbsp;
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                ตำแหน่งผู้ติดต่อ : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.position} &nbsp;
                            </Text>
                        </Flex>
                        <Flex mt="1">
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                แผนกผู้ติดต่อ : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.department} &nbsp;
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                ประเภทลูกค้า : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {data.visitById.customerType}
                            </Text>
                        </Flex>

                        {data.visitById.jobPurpose === 'ติดตามใบเสนอราคา' && (
                            <Flex justifyContent="center">
                                <Button
                                    w="30%"
                                    colorScheme='teal'
                                    mt={5}
                                    onClick={() => setIsOpen(true)}
                                >
                                    เพิ่มใบเสนอราคา
                                </Button>
                            </Flex>
                        )}

                        {data.visitById.quotations.length >= 1 && (
                            <>
                                <Heading mt={2} fontSize='xl'>Quotation :</Heading>
                                
                                {data.visitById.quotations.map(item => (
                                    <Box
                                        key={item.id}
                                        p={2}
                                        mt={3}
                                        shadow='md'
                                        borderWidth='1px'
                                        borderRadius="md"
                                    >
                                        <Stack isInline justify="space-between">
                                            <Text>เลขที่ใบเสนอราคา : {item.quotationCode}</Text>
                                            <Text>มูลค่า : {item.value}</Text>
                                        </Stack>
                                    </Box>
                                ))}
                            </>
                        )}

                        {data.visitById.issueReceives && (
                            <>
                                <Heading mt={2} fontSize='xl'>Issue :</Heading>
                                
                                {data.visitById.issueReceives.map(item => (
                                    <Box
                                        key={item.id}
                                        p={2}
                                        mt={3}
                                        shadow='md'
                                        borderWidth='1px'
                                        borderRadius="md"
                                        cursor='pointer'
                                        _hover={{ bg: '#eee' }}
                                        onClick={() => history.push(`/sales-report/issue/${item.id}`)}
                                    >
                                        <Stack isInline justify="space-between">
                                            <Heading fontSize='lg'>Status : {item.status}</Heading>
                                            <Text>CreateAt : {formatDate(+item.createdAt)}</Text>
                                        </Stack>
                                        <Text mt={2} className="paragraph-short">{item.detail}</Text>
                                        <Text mt={2}>Success Rate :{item.rate}</Text>
                                    </Box>
                                ))}
                            </>
                        )}

                        {isOpen && (
                            <AddQuotation
                                Open={true}
                                setOpen={() => setIsOpen(false)}
                                visitId={+params.id}
                            />
                        )}

                    </Flex>
                    <IssueCreate
                        visitId={+params.id}
                        customer={data.visitById.customer}
                        saleRoleId={data.visitById.saleRoleId}
                        checkAddId={checkAddId}
                        setAlertSuccess={setAlertSuccess}
                        setAlertWarning={setAlertWarning}
                    />
                </Flex>
            )}
        </Flex>
    )
}

export default SalesVisitDetail
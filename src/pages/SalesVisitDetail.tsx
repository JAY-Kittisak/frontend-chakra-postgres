import React, { useState, useRef } from 'react'
import { 
    Flex, Text, Divider, Button, Stack, Heading, Box, IconButton,
    AlertDialog, AlertDialogBody,AlertDialogFooter, AlertDialogHeader,
    AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react'
import { useParams, useHistory } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";

import Spinner from "../components/Spinner";
import IssueCreate from '../components/sales-report/IssueCreate'
import AddQuotation from '../components/sales-report/AddQuotation';
import { useDialog } from '../components/dialogs/useDialog'
import AlertNotification from "../components/dialogs/AlertNotification";
import AlertNtSuccess from "../components/dialogs/AlertNtSuccess";
import { useVisitByIdQuery, useDeleteJoinVisitMutation } from "../generated/graphql";
import { formatDateNew, AlertNt } from "../utils/helpers";
import { useIsAuth } from "../utils/uselsAuth";

interface Props { }

const SalesVisitDetail: React.FC<Props> = () => {
    useIsAuth();

    const [alertSuccess, setAlertSuccess] = useState<AlertNt>("hide")
    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide")
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [issueId, setIssueId] = useState(0);

    const cancelRef = useRef();

    const params = useParams<{ id: string }>();

    const { isOpen, setIsOpen } = useDialog();

    const history = useHistory();

    const [{ data, fetching }] = useVisitByIdQuery({
        variables: {
            id: +params.id,
        },
    });

    const [, deleteJoinVisit] = useDeleteJoinVisitMutation()

    const onClose = () => setDeleteDialog(false);

    const handleDeleteJoinVisit = async() => {
        const response = await deleteJoinVisit({
            input: {
                visitId: +params.id,
                issueId,
            },
        });
        if (response.error) {
            alert("Delete Error! โปรดติดต่อผู้ดูแล");
        } else if (response.data?.deleteJoinVisit) {
            setDeleteDialog(false);
        }
    }

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
                        <Flex mt="1">
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                วันที่ไปพบลูกค้า : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {formatDateNew(data.visitById.visitDate)} &nbsp;
                            </Text>
                            <Text
                                fontSize={["sm", "sm", "md", "lg"]}
                                fontWeight="semibold"
                            >
                                วันที่บันทึก : &nbsp;
                            </Text>
                            <Text fontSize={["sm", "sm", "md", "lg"]}>
                                {formatDateNew(+data.visitById.createdAt)} &nbsp;
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
                                    <Flex key={item.id} alignItems="center">
                                        <IconButton
                                            mr="1"
                                            aria-label=""
                                            icon={<CloseIcon />}
                                            color="red.500"
                                            colorScheme="white"
                                            onClick={() => {
                                                setIssueId(item.id);
                                                setDeleteDialog(true);
                                            }}
                                        />
                                        <Box
                                            w="100%"
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
                                                <Text>CreateAt : {formatDateNew(+item.createdAt)}</Text>
                                            </Stack>
                                            <Text mt={2} className="paragraph-short">{item.detail}</Text>
                                            <Text mt={2}>Success Rate :{item.rate}</Text>
                                        </Box>
                                    </Flex>
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
            <AlertDialog
                isOpen={deleteDialog}
                leastDestructiveRef={cancelRef.current}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <Flex bgColor="red.600" rounded="7px" boxShadow="md">
                                <Text fontWeight="bold" color="white" ml="5">
                                    Delete Issue
                                </Text>
                            </Flex>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <div>
                                <Text>คุณต้องการลบ Issue นี้ออกจากการเข้าพบลูกค้าครั้งนี้</Text>
                                <Text>ใช่หรือไม่</Text>
                            </div>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                color="white"
                                colorScheme="red"
                                mr={3}
                                onClick={handleDeleteJoinVisit}
                            >
                                Delete
                            </Button>
                            <Button ref={cancelRef.current} onClick={onClose}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    )
}

export default SalesVisitDetail
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
    Text, Flex, Divider, Table, Tbody, Th, Thead, Tr, Td,
    Center, IconButton, Button, AlertDialog, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
    AlertDialogOverlay
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import {
    useDeleteJoinResellMutation,
    useResellByIdQuery,
} from "../generated/graphql";
import { useIsAuth } from "../utils/uselsAuth";
import Spinner from "../components/Spinner";
import SelectCustomer from "../components/resell/SelectCustomer";
import { formatDate, AlertNt } from "../utils/helpers";
import AlertNotification from "../components/dialogs/AlertNotification";
import AlertNtSuccess from "../components/dialogs/AlertNtSuccess";

interface Props { }

const ResellCreateStep2: React.FC<Props> = () => {
    useIsAuth();
    const [, setCustomerID] = useState<number | undefined>(undefined);
    const [, setCustomerData] = useState<
        { code: string; name: string } | undefined
    >(undefined);

    const [deleteCmId, setDeleteCmId] = useState(0);
    const [deleteName, setDeleteName] = useState("");
    const [deleteDialog, setDeleteDialog] = useState(false);
    const onClose = () => setDeleteDialog(false);

    const cancelRef = useRef();

    const [alertSuccess, setAlertSuccess] = useState<AlertNt>("hide")
    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide")

    const params = useParams<{ id: string }>();
    const [{ data, fetching }] = useResellByIdQuery({
        variables: { id: +params.id },
    });

    const [, deleteJoinResell] = useDeleteJoinResellMutation();

    const addedId = data?.resellById.customers?.map(val => val.id)

    return (
        <Flex flexDir="column" p="3">
            <Flex justify="space-between">
                <Text
                    as="i"
                    fontWeight="semibold"
                    fontSize={["md", "md", "xl", "3xl"]}
                    color="green.600"
                >
                    เพิ่มบริษัทที่มีการซื้อขาย
                </Text>

                <AlertNtSuccess alertSuccess={alertSuccess} setAlertSuccess={setAlertSuccess} />
                <AlertNotification alertWarning={alertWarning} setAlertWarning={setAlertWarning} />

            </Flex>
            <Divider orientation="horizontal" />
            <Flex>
                {fetching ? (
                    <>
                        <Spinner color="grey" height={30} width={30} />
                        <Text fontWeight="bold" fontSize="xl">
                            &nbsp; Loading...
                        </Text>
                    </>
                ) : (
                    <Flex
                            flexDir="column"
                            minW="50%"
                            mt="8"
                            boxShadow="xl"
                            borderRadius="md"
                            minH="80vh"
                            justify="space-between"
                        >
                            <Flex flexDir="column" p="6">
                                <Flex justify="center">
                                    <Text fontSize="xl" fontWeight="bold">
                                        {data?.resellById.title}
                                    </Text>
                                </Flex>
                                <Flex mt="4">
                                    <Flex minW="500px">
                                        <Text fontWeight="bold">บริษัทที่สั่งซื้อ :</Text>&nbsp;
                                        <Text>{data?.resellById.orderCustomer.customerName}</Text>
                                    </Flex>
                                    <Text fontWeight="bold">Maker :</Text>&nbsp;
                                    <span>{data?.resellById.maker}</span>
                                </Flex>
                                <Text mt="1" fontWeight="bold">
                                    รายละเอียด :
                                </Text>
                                <Text w="680px" ml="5">
                                    {data?.resellById.detail}
                                </Text>
                                <Text mt="1" fontWeight="bold">
                                    ขายต่อให้กับ :
                                </Text>
                                <Flex
                                    mt="5"
                                    overflowX="auto"
                                    rounded="5px"
                                    boxShadow="md"
                                >
                                    <Table
                                        boxShadow="base"
                                        variant="striped"
                                        colorScheme="blackAlpha"
                                    >
                                        <Thead>
                                            <Tr bg="#028174">
                                                <Th
                                                    textAlign="center"
                                                    fontSize={["xs", "xs", "sm", "md"]}
                                                    color="white"
                                                >
                                                    Customer Code
                                                </Th>
                                                <Th
                                                    textAlign="center"
                                                    fontSize={["xs", "xs", "sm", "md"]}
                                                    color="white"
                                                >
                                                    Customer Name
                                                </Th>
                                                <Th
                                                    textAlign="center"
                                                    fontSize={["xs", "xs", "sm", "md"]}
                                                    color="white"
                                                >
                                                    ลบ
                                                </Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {data?.resellById.customers?.map((val) => (
                                                <Tr key={val.id}>
                                                    <Td w="40%">
                                                        <Center>{val.customerCode}</Center>
                                                    </Td>
                                                    <Td w="50%">{val.customerName}</Td>
                                                    <Td w="10%">
                                                        <IconButton
                                                            aria-label=""
                                                            icon={<DeleteIcon />}
                                                            color="red.500"
                                                            colorScheme="white"
                                                            onClick={() => {
                                                                setDeleteCmId(val.id);
                                                                setDeleteName(val.customerName);
                                                                setDeleteDialog(true);
                                                            }}
                                                        />
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Flex>
                            </Flex>
                            <Flex
                                p="1"
                                bg="#0AB68B"
                                color="white"
                                borderRadius="md"
                                justify="space-between"
                            >
                                <div>
                                    <span className="font-w-bold">Created : </span>
                                    <span>
                                        {data?.resellById.createdAt &&
                                            formatDate(+data.resellById.createdAt)}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-w-bold">Updated : </span>
                                    <span>
                                        {data?.resellById.updatedAt &&
                                            formatDate(+data.resellById.updatedAt)}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-w-bold">Creator : </span>
                                    <span>{data?.resellById.creator.fullNameTH}</span>
                                </div>
                            </Flex>
                            <AlertDialog
                                isOpen={deleteDialog}
                                leastDestructiveRef={cancelRef.current}
                                onClose={onClose}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                            <Flex bgColor="red.600" rounded="7px" boxShadow="md">
                                                <Text fontWeight="bold" color="white" ml="5">
                                                    Delete Customer
                                                </Text>
                                            </Flex>
                                        </AlertDialogHeader>

                                        <AlertDialogBody>
                                            Are you sure? You can't undo this action afterwards. <br />
                                            <Flex>
                                                <Text>คุณต้องการลบ</Text>
                                                <Text color="red" fontWeight="semibold">
                                                    &nbsp;{deleteName}&nbsp;
                                                </Text>
                                                <Text>ใช่หรือไม่</Text>
                                            </Flex>
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button ref={cancelRef.current} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button
                                                color="white"
                                                colorScheme="red"
                                                ml={3}
                                                onClick={async () => {
                                                    const response = await deleteJoinResell({
                                                        input: {
                                                            resellId: +params.id,
                                                            customerId: deleteCmId,
                                                        },
                                                    });
                                                    if (response.error) {
                                                        alert("Delete Error! โปรดติดต่อผู้ดูแล");
                                                    } else if (response.data?.deleteJoinResell) {
                                                        setDeleteDialog(false);
                                                    }
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                    </Flex>
                )}
                <SelectCustomer
                    setCustomerID={setCustomerID}
                    setCustomerData={setCustomerData}
                    orderCustomerId={data?.resellById.orderCustomer.id as number}
                    resellId={+params.id}
                    addedId={addedId}
                    setAlertSuccess={setAlertSuccess}
                    setAlertWarning={setAlertWarning}
                />
            </Flex>
        </Flex>
    );
};

export default ResellCreateStep2;

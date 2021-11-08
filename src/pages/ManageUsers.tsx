import React, { useState, useEffect } from 'react'
import {
    Flex, Table, Thead, Tbody, Th, Tr, Text
} from "@chakra-ui/react";
import SelectBranch from '../components/SelectBranch';
import { Branch } from '../utils/helpers';
import { RegularUserFragment, useUsersQuery } from '../generated/graphql';
import UserItem from '../components/manage-users/UserItem';
import { useDialog } from '../components/dialogs/useDialog';
import Spinner from '../components/Spinner';
import UpdateRoles from '../components/manage-users/UpdateRoles';
import { useIsSupperAuth } from '../utils/useIsSupperAuth';

interface Props { }

const ManageUsers: React.FC<Props> = () => {
    useIsSupperAuth()
    const [branch, setBranch] = useState<Branch>("All");
    const [item, setItem] = useState<RegularUserFragment[] | undefined>(
        undefined
    );
    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState("");

    const { isOpen, setIsOpen } = useDialog();
    const [{ data, fetching }] = useUsersQuery()

    useEffect(() => {
        if (branch === "All" && data?.users) {
            setItem(data.users);
        }
        if (branch === "ลาดกระบัง") {
            const latKraBang = data?.users?.filter((val) => val.roles === "client-LKB");
            setItem(latKraBang);
        }
        if (branch === "ชลบุรี") {
            const dataTest = data?.users?.filter((val) => val.roles === "client-CDC");
            setItem(dataTest);
        }
    }, [branch, data]);

    return (
        <Flex flexDir={["column", "column", "column", "column", "row"]}>
            <Flex w="100%" flexDir="column" mr="2">
                <SelectBranch
                    title="Manage Users"
                    branch={branch}
                    setBranch={setBranch}
                />
                {fetching ? (
                    <Flex justify="center">
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
                    <Flex w="100%" h="80vh" overflowX="auto" rounded="7px" boxShadow="xl" p="5">
                        <Table
                            variant="striped"
                            colorScheme="gray"
                            boxShadow="xl"
                        >
                            <Thead>
                                <Tr bg="#028174">
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                        w="15%"
                                    >
                                        username
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                        w="15%"
                                    >
                                        full-name
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                        w="15%"
                                    >
                                        departments
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                            w="10%"
                                        >
                                            branch
                                        </Th>
                                        <Th
                                            textAlign="center"
                                            fontSize={["xs", "xs", "sm", "md"]}
                                            color="white"
                                            w="10%"
                                    >
                                        roles
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                            w="10%"
                                    >
                                        position
                                    </Th>
                                    <Th
                                        textAlign="center"
                                        fontSize={["xs", "xs", "sm", "md"]}
                                        color="white"
                                        w="15%"
                                    >
                                        Manage
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody overflow="scroll" h="80vh">
                                {item?.map((user) => (
                                    <UserItem
                                        key={user.id}
                                        user={user}
                                        setOpen={() => setIsOpen(true)}
                                        setUserId={setUserId}
                                        setUserName={setUserName}
                                    />
                                ))}
                            </Tbody>
                        </Table>
                    </Flex>
                )}
                {isOpen && (
                    <UpdateRoles
                        userId={userId}
                        userName={userName}
                        open={isOpen}
                        setOpen={() => setIsOpen(false)}
                    />
                )}
            </Flex>
        </Flex>
    )
}

export default ManageUsers
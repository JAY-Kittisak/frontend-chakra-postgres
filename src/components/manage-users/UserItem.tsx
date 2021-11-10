import React from "react";
import { Tr, Td, Center, IconButton, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { RegularUserFragment } from "../../generated/graphql";

interface Props {
    user: RegularUserFragment;
    setOpen: (open: boolean) => void;
    setUserId: React.Dispatch<React.SetStateAction<number>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const UserItem: React.FC<Props> = ({
    user,
    setOpen,
    setUserId,
    setUserName,
}) => {
    return (
        <Tr>
            <Td>
                <Center>{user.username}</Center>
            </Td>
            <Td>
                <Center>
                    {user.fullNameTH}
                </Center>
            </Td>
            <Td>
                <Center>{user.departments}</Center>
            </Td>
            <Td>
                <Center>
                    <Text
                        as="i"
                        fontWeight="semibold"
                        color={user.branch === 1 ? "green" : "cyan.600"}
                    >
                        {user.branch === 1 ? "ชลบุรี" : "ลาดกระบัง"}
                    </Text>
                </Center>
            </Td>
            <Td>
                <Center>
                    <Text
                        as="i"
                        fontWeight="semibold"
                        color={
                            user.roles === "client-CDC"
                                ? "green"
                                : user.roles === "client-LKB"
                                    ? "cyan.600"
                                    : "orange"
                        }
                    >
                        {user.roles}
                    </Text>
                </Center>
            </Td>
            <Td>
                <Center>
                    <Text
                        fontWeight={
                            user.position === "หัวหน้างาน"
                                ? "semibold"
                                : user.position === "GM"
                                    ? "semibold"
                                    : "light"
                        }
                        color={
                            user.position === "หัวหน้างาน"
                                ? "orange.600"
                                : user.position === "GM"
                                    ? "orange.600"
                                    : ""
                        }
                    >
                        {user.position}
                    </Text>
                </Center>
            </Td>
            <Td>
                <Center>
                    <IconButton
                        aria-label=""
                        icon={<EditIcon />}
                        mr="3"
                        colorScheme="green"
                        onClick={() => {
                            setOpen(true);
                            setUserId(user.id);
                            setUserName(user.username);
                        }}
                    />
                </Center>
            </Td>
        </Tr>
    );
};

export default UserItem;

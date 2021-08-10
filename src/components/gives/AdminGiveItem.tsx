import React from 'react'
import {
    Tr,
    Td,
    Center,
    useColorMode,
    IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { RegularGiveFragment } from "../../generated/graphql";
import { formatAmount } from '../../utils/helpers'

interface Props {
    give: RegularGiveFragment
}

const AdminGiveItem: React.FC<Props> = ({ give: { giveName, details, price, inventory, category, imageUrl, updatedAt } }) => {
    const { colorMode } = useColorMode();

    let testD = new Date(+updatedAt)

    return (
        <Tr>
            <Td fontSize={["xs", "xs", "sm", "md"]}>
                <Center>{imageUrl}</Center>
            </Td>
            <Td>
                <Center>{giveName}</Center>
            </Td>
            <Td>
                <Center isTruncated>{details}</Center>
            </Td>
            <Td>
                <Center>{price && formatAmount(price)}</Center>
            </Td>
            <Td>
                <Center>{inventory && formatAmount(inventory)}</Center>
            </Td>
            <Td>
                <Center>{category}</Center>
            </Td>
            <Td>
                <Center>{testD.toDateString()}</Center>
            </Td>
            <Td>
                <Center>
                    <IconButton
                        aria-label=""
                        icon={<EditIcon />}
                        mr="1"
                        colorScheme={colorMode === "light" ? "green" : "blue"}
                    />
                    <IconButton
                        aria-label=""
                        icon={<DeleteIcon />}
                        color={colorMode === "light" ? "red" : "red.800"}
                        colorScheme={colorMode === "light" ? "green" : "blue"}
                    />
                </Center>
            </Td>
        </Tr >
    );
}

export default AdminGiveItem
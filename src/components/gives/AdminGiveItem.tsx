import React from "react";
import { Tr, Td, Center, useColorMode, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { RegularGiveFragment } from "../../generated/graphql";
import { formatAmount } from "../../utils/helpers";

interface Props {
    give: RegularGiveFragment;
    setOpen: (open: boolean) => void
    setGiveToEdit: (give: RegularGiveFragment | null) => void
}

const AdminGiveItem: React.FC<Props> = ({
    give,
    setOpen,
    setGiveToEdit
}) => {
    const { colorMode } = useColorMode();

    return (
        <Tr>
            <Td fontSize={["xs", "xs", "sm", "md"]}>
                {give.imageUrl ? (
                    <Center>{give.imageUrl}</Center>
                ) : (
                    <Center>
                        <IconButton
                            aria-label=""
                            icon={<AddIcon />}
                            mr="3"
                            colorScheme={colorMode === "light" ? "green" : "blue"}
                        />
                    </Center>
                )}
            </Td>
            <Td>
                <Center>{give.giveName}</Center>
            </Td>
            <Td>
                <Center isTruncated>{give.details}</Center>
            </Td>
            <Td>
                <Center>{give.price && formatAmount(give.price)} บาท</Center>
            </Td>
            <Td>
                <Center>{give.inventory && formatAmount(give.inventory)} ชิ้น</Center>
            </Td>
            <Td>
                <Center>{give.category}</Center>
            </Td>
            <Td>
                <Center>{new Date(+give.updatedAt).toDateString()}</Center>
            </Td>
            <Td>
                <Center>
                    <IconButton
                        aria-label=""
                        icon={<EditIcon />}
                        mr="3"
                        colorScheme={colorMode === "light" ? "green" : "blue"}
                        onClick={() => {
                            setOpen(true)
                            setGiveToEdit(give)
                        }}
                    />
                    <IconButton
                        aria-label=""
                        icon={<DeleteIcon />}
                        color={colorMode === "light" ? "red" : "red.800"}
                        colorScheme={colorMode === "light" ? "green" : "blue"}
                    />
                </Center>
            </Td>
        </Tr>
    );
};

export default AdminGiveItem;

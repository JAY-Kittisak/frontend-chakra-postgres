import React, { useState, useEffect } from "react";
import {
    Tr,
    Td,
    Center,
    Text,
    Flex,
    Image,
    Heading,
    Select,
} from "@chakra-ui/react";

import {
    RegularLeaveFragment,
    useMeQuery,
    useUpdateLeaveMutation,
} from "../../generated/graphql";
import { catApprove, formatDate } from "../../utils/helpers";

interface Props {
    item: RegularLeaveFragment;
}

const LeaveApprovalItem: React.FC<Props> = ({ item }) => {
    const [selectAp, setSelectAp] = useState(false)
    const [{ data }] = useMeQuery()
    const [, updateLeave] = useUpdateLeaveMutation();

    useEffect(() => {
        if (item.BossActionName) {
            setSelectAp(true)
        }
    }, [item.BossActionName])

    return (
        <Tr _hover={{ bgColor: "#eee" }}>
            <Td>
                <Text>{formatDate(+item.createdAt)}</Text>
            </Td>
            <Td fontSize={["xs", "xs", "sm", "md"]} p="8px">
                <Flex align="center">
                    {item.creator.imageUrl && (
                        <Image
                            mr={2}
                            borderRadius="full"
                            boxSize="70px"
                            objectFit="cover"
                            src={item.creator.imageUrl}
                        />
                    )}
                    <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight" w="200px" isTruncated>
                            {item.creator.fullNameTH}
                        </Heading>
                        <Text fontSize="sm" color="gray" isTruncated w="200px" mr="5">
                            แผนก {item.creator.departments}
                        </Text>
                    </Flex>
                </Flex>
            </Td>
            <Td>
                <Center>{item.title}</Center>
            </Td>
            <Td>
                <Center>{item.detail}</Center>
            </Td>
            <Td>
                <Center>
                    {item.sumDate} วัน / {item.sumHour} ช.ม.
                </Center>
            </Td>
            <Td>
                <Center>{formatDate(+item.dateBegin)}</Center>
            </Td>
            <Td>
                <Center>{formatDate(+item.dateEnd)}</Center>
            </Td>
            <Td>
                <Select
                    disabled={selectAp || data?.me?.position === "พนังงานทั่วไป"}
                    fontWeight="semibold"
                    boxShadow="md"
                    bg={
                        item.status === "รออนุมัติ"
                            ? "#51e8fc"
                            : item.status === "อนุมัติแล้ว"
                                ? "#60f067"
                                : "#f18686"
                    }
                    value={item.status}
                    onChange={async (e) => {
                        const response = await updateLeave({
                            id: item.id,
                            newStatus: e.target.value,
                        });
                        if (response.error) {
                            alert(response.error.message);
                        }
                        if (response.data?.updateLeave) {
                            alert("Update สำเร็จ");
                        }
                    }}
                >
                    {catApprove.map((value, i) => (
                        <option key={i} value={value}>
                            {value}
                        </option>
                    ))}
                </Select>
                {item.BossActionName &&
                    <Text mt="2" fontWeight="semibold">ลงชื่อ : {item.BossActionName}</Text>
                }
            </Td>
        </Tr>
    );
};

export default LeaveApprovalItem;

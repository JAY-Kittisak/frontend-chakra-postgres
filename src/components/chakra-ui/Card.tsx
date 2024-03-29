import React from "react";
import { Link } from "react-router-dom";
import { Text, Box } from "@chakra-ui/react";

type Label =
    | "สถานะงาน IT"
    | "สถานะงาน เบิกยืมอุปกรณ์ IT"
    | "สถานะงาน เบิกของแจกลูกค้า"
    | "สถานะงาน สั่งซื้อ"
    | "วันลาที่เหลือ"
    | "ลาป่วย"
    | "ลากิจ"
    | "หยุดงาน";

interface Props {
    label: Label;
    content: number;
}

const Card: React.FC<Props> = ({ label, content }) => {
    return (
        <Box w="100%" h="100%" bg="#fff" rounded="10px" boxShadow="md" mb="3">
            <Text fontWeight="semibold" fontSize="xl" p="3">
                {label}
            </Text>
            <Box align="center" mt="-6">
                <Text fontWeight="semibold" fontSize="6xl" color="#0AB68B">
                    {content}
                </Text>
            </Box>
            <Box align="center">
                <Link
                    to={
                        label === "สถานะงาน IT"
                            ? "/job-it/me"
                            : label === "สถานะงาน เบิกยืมอุปกรณ์ IT"
                                ? "/stock-it/my-order"
                                : label === "สถานะงาน เบิกของแจกลูกค้า"
                                    ? "/order-give/my-orders"
                                    : label === "สถานะงาน สั่งซื้อ"
                                        ? "สถานะงาน สั่งซื้อ"
                                        : label === "วันลาที่เหลือ"
                                            ? "วันลาที่เหลือ"
                                            : label === "ลาป่วย"
                                                ? "ลาป่วย"
                                                : label === "ลากิจ"
                                                    ? "ลากิจ"
                                                    : label === "หยุดงาน"
                                                        ? "หยุดงาน"
                                                        : "/"
                    }
                >
                    <Text as="u" fontSize="md">
                        รายละเอียด
                    </Text>
                </Link>
            </Box>
        </Box>
    );
};

export default Card;

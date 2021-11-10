import React from "react";
import {
    Tr,
    Td,
    Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type ValuesDemo = {
    maker: string;
    title: string;
    detail: string;
    orderById: number;
    resellId: number;

}

interface Props {
    item: ValuesDemo
}

const ResellItem: React.FC<Props> = ({ item }) => {
    return (
        <Tr _hover={{ bgColor: "#eee" }}>
            <Td w="10%">
                <Center>{item.maker}</Center>

            </Td>
            <Td w="10%">
                <Center>{item.title}</Center>

            </Td>
            <Td w="50%">
                <Center>{item.detail}</Center>

            </Td>
            <Td w="10%">
                <Link to={`/tiers/factories/${item.orderById}`}>
                    <Center _hover={{ fontWeight: "bold" }}>  {item.orderById}</Center>
                </Link>
            </Td>
            <Td w="10%">
                <Link to={`/tiers/factories/${item.resellId}`}>
                    <Center _hover={{ fontWeight: "bold" }}> {item.resellId}</Center>
                </Link>
            </Td>
        </Tr>
    )
}

export default ResellItem
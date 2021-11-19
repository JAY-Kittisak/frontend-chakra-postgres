import React, { useState } from "react";
import {
    Tr,
    Td,
    Text,
    Button,
    Flex
} from "@chakra-ui/react";
import { useHistory } from "react-router";

import { RegularResellFragment } from "../../generated/graphql";
import CustomerDetail from "./CustomerDetail";

interface Props {
    resell: RegularResellFragment
}

const ResellItem: React.FC<Props> = ({ resell }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [customerId, setCustomerId] = useState(0)

    const history = useHistory();

    return (
        <>
            <Tr _hover={{ bgColor: "#eee" }}>
                <Td w="15%">
                    <Text fontWeight="bold" color={resell.maker === "YAMAWA" ? "blue.600" : "red"}>{resell.maker}</Text>
                    <Text>{resell.category}</Text>
                </Td>
                <Td w="15%">
                    <Text>{resell.title}</Text>
                </Td>
                <Td w="30%">
                    <p>{resell.detail}</p>
                    <Flex justify="end">
                        <Button
                            colorScheme="green"
                            size="xs"
                            variant="outline"
                            onClick={() => history.push(`/resell/step2/${resell.id}`)}
                        >
                            รายละเอียดเพิ่มเติม...
                        </Button>
                    </Flex>
                </Td>
                <Td w="20%">
                    <Text
                        _hover={{ fontWeight: "bold" }}
                        cursor="pointer"
                        onClick={() => {
                            setCustomerId(resell.orderCustomer.id)
                            setIsOpen(true)
                        }}
                    >
                        {resell.orderCustomer.customerName}
                    </Text>
                </Td>
                <Td w="20%">
                    {/* <Link to={`/tiers/factories/${resell.resellId}`}>
                </Link> */}
                    {resell.customers?.map(val => (
                        // <Link to={`/tiers/factories/${val.id}`}>
                        // </Link>
                        <Text
                            _hover={{ fontWeight: "bold" }}
                            key={val.id}
                            cursor="pointer"
                            onClick={() => {
                                setCustomerId(val.id)
                                setIsOpen(true)
                            }}
                        >
                            {val.customerName}
                        </Text>
                    ))}
                </Td>
            </Tr>
            <CustomerDetail
                customerId={customerId}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}

export default ResellItem
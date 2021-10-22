import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    sumLength: {
        newNum: number | undefined;
        waitApprove: number | undefined;
        preparingNum: number | undefined;
        successNum: number | undefined;
        impossible: number | undefined;
    }
    toMain: string
    toOrder: string | undefined
    content: {
        main: string
        order: string | undefined
        addCategory: string | undefined;
    }
}

const AdministratorItem: React.FC<Props> = ({
    title,
    sumLength: {
        newNum,
        waitApprove,
        preparingNum,
        successNum,
        impossible
    },
    toMain,
    toOrder,
    content,
}) => {
    return (
        <Flex
            flexDir="column"
            w="375px"
            h="290px"
            boxShadow="md"
            ml="5"
            rounded="lg"
            p="3"
        >
            <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                {title}
            </Text>
            <Flex flexDir="column" mt="5">
                <Flex ml={impossible ? "2" : "6"} mb="3">
                    <Box
                        w="100px"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        p="3"
                        mr={impossible ? "2" : "6"}
                        align="center"
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {newNum}
                        </Text>
                        <Text fontSize={impossible ? "sm" : "xl"} fontWeight="bold" color="cyan.600">
                            New
                        </Text>
                    </Box>
                    {waitApprove &&
                        <Flex
                            w="100px"
                            flexDir="column"
                            boxShadow="md"
                            rounded="lg"
                            p="3"
                            mr={impossible ? "2" : "6"}
                            align="center"
                        >
                            <Text fontSize="4xl" fontWeight="bold">
                                {waitApprove}
                            </Text>
                            <Text fontSize={impossible ? "sm" : "xl"} fontWeight="bold" color="orange" align="center">
                                Wait Approve
                            </Text>
                    </Flex>
                    }
                    {preparingNum &&
                    <Flex
                        w="100px"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        p="3"
                        mr={impossible ? "2" : "6"}
                        align="center"
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {preparingNum}
                        </Text>
                        <Text fontSize={impossible ? "sm" : "xl"} fontWeight="bold" color="orange">
                            Preparing
                        </Text>
                    </Flex>
                    }
                    <Flex
                        w="100px"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        p="3"
                        mr={impossible ? "2" : "6"}
                        align="center"
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {successNum}
                        </Text>
                        <Text fontSize={impossible ? "sm" : "xl"} fontWeight="bold" color="green">
                            Success
                        </Text>
                    </Flex>
                    {impossible &&
                        <Flex
                            w="100px"
                            flexDir="column"
                            boxShadow="md"
                            rounded="lg"
                            p="3"
                            mr="6"
                            align="center"
                        >
                            <Text fontSize="4xl" fontWeight="bold">
                                {impossible}
                            </Text>
                            <Text fontSize="sm" fontWeight="bold" color="red">
                                Impossible
                            </Text>
                        </Flex>
                    }
                </Flex>
                <Link to={toMain}>
                    <Text as="u" fontSize="xl">
                        {content.main}
                    </Text>
                </Link>
                {toOrder &&
                <Link to={toOrder}>
                    <Text as="u" fontSize="xl">
                        {content.order}
                    </Text>
                </Link>
                }
                {content.addCategory && (
                    <Link to="/admin/manage-give-category">
                        <Text as="u" fontSize="xl">
                            {content.addCategory}
                        </Text>
                    </Link>
                )}
            </Flex>
        </Flex>
    );
};

export default AdministratorItem;

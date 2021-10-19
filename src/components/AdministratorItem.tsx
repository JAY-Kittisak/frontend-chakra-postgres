import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    sumLength: {
        newNum: number | undefined;
        preparingNum: number | undefined;
        successNum: number | undefined;
    }
    toMain: string
    toOrder: string
    content: {
        main: string
        order: string
        addCategory: string | undefined;
    }
}

const AdministratorItem: React.FC<Props> = ({
    title,
    sumLength: {
        newNum,
        preparingNum,
        successNum
    },
    toMain,
    toOrder,
    content,
}) => {
    return (
        <Flex
            flexDir="column"
            w="375px"
            h="31vh"
            boxShadow="md"
            ml="5"
            rounded="lg"
            p="3"
        >
            <Text fontSize="2xl" fontWeight="bold" as="i" color="gray">
                {title}
            </Text>
            <Flex flexDir="column" mt="5">
                <Flex flexDir="row" mb="3">
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
                            {newNum}
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" color="cyan.600">
                            New
                        </Text>
                    </Flex>
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
                            {preparingNum}
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" color="orange">
                            Preparing
                        </Text>
                    </Flex>
                    <Flex
                        w="100px"
                        flexDir="column"
                        boxShadow="md"
                        rounded="lg"
                        p="3"
                        align="center"
                    >
                        <Text fontSize="4xl" fontWeight="bold">
                            {successNum}
                        </Text>
                        <Text fontSize="xl" fontWeight="bold" color="green">
                            Success
                        </Text>
                    </Flex>
                </Flex>
                <Link to={toMain}>
                    <Text as="u" fontSize="xl">
                        {content.main}
                    </Text>
                </Link>
                <Link to={toOrder}>
                    <Text as="u" fontSize="xl">
                        {content.order}
                    </Text>
                </Link>
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

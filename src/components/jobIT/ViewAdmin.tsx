import React from "react";
import { Text, Flex, Image, Heading } from "@chakra-ui/react";
import { useUserAdminQuery } from "../../generated/graphql";

interface Props {
    setNameItAction: (name: string) => void;
}

const ViewAdmin: React.FC<Props> = ({ setNameItAction }) => {
    const [{ data }] = useUserAdminQuery();
    return (
        <Flex flexDir="column" mt="2">
            <Text fontSize="2xl" fontWeight="bold" as="i" color="gray" ml="8">
                IT Operator
            </Text>
            <Flex
                flexDir="column"
                ml="5"
                p="2"
                mt="3"
                overflowY="auto"
                maxH="38vh"
                w="100%"
            >
                {data &&
                    data.userAdmin.map((value) => (
                        <Flex
                          mr="3"
                          p="1"
                          mb="2"
                          boxShadow="md"
                          rounded="lg"
                          cursor="pointer"
                          _hover={{ bgColor: "#eee" }}
                          key={value.id}
                          onClick={() => setNameItAction(value.fullNameTH as string)}
                      >
                          <Image
                              mr={2}
                              borderRadius="full"
                              boxSize="60px"
                              objectFit="cover"
                              src={value.imageUrl as string}
                          />
                          <Flex flexDir="column">
                              <Heading size="sm" letterSpacing="tight">
                                  {value.fullNameTH}
                              </Heading>
                              <Text fontSize="sm" color="gray" isTruncated w="250px" mr="5">
                                  {value.roles}
                              </Text>
                          </Flex>
                      </Flex>
                  ))}
            </Flex>
        </Flex>
    );
};

export default ViewAdmin;

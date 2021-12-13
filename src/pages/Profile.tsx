import React, { useState } from "react";
import { Text, Flex, Box, Button, Center, Divider } from "@chakra-ui/react";

import {
    useMeQuery,
    RegularUserFragment,
    useGiveOrderByCreatorIdQuery,
    useJobItByCreatorIdQuery,
    useStockItOrdersQuery
} from "../generated/graphql";
import AddImageUser from "../components/manage-users/AddImageUser";
import Card from "../components/chakra-ui/Card";
import Spinner from "../components/Spinner";
import AddAndEditProfile from "../components/manage-users/AddAndEditProfile";
import { useDialog } from "../components/dialogs/useDialog";
import { useIsAuth } from "../utils/uselsAuth";

interface Props { }

const Profile: React.FC<Props> = () => {
    useIsAuth();
    const [userToEdit, setUserToEdit] = useState<RegularUserFragment | null>(
        null
    );

    const [{ data, fetching }] = useMeQuery();
    const [{ data: giveOrder }] = useGiveOrderByCreatorIdQuery();
    const [{ data: jobIt }] = useJobItByCreatorIdQuery();
    const [{ data: stockIt }] = useStockItOrdersQuery({
        variables: {
            createBy: true,
        },
    });

    const { isOpen, setIsOpen } = useDialog();

    return (
        <Flex flexDir="column" overflowY="auto" px="5" h="100vh">
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
                Dashboard
            </Text>
            <Divider mt={1} mb={5} orientation="horizontal" />

          {fetching || !data?.me?.username ? (
              <Flex justify="center" mt="5">
                  <Spinner color="grey" height={50} width={50} />
                  <Text fontWeight="bold" fontSize="2xl">
                      &nbsp; Loading...
                  </Text>
              </Flex>
          ) : (
                    <Flex flexDir={["column", "column", "column", "row"]} mb="51">
                  {/* ---------------------------------------Column 1--------------------------------------- */}
                  <Flex
                      w={["100%", "100%", "100%", "40%"]}
                      direction={["column", "column", "column", "column"]}
                            justify="center"
                      p="10"
                      bg="#eee"
                      rounded="10px"
                      boxShadow="md"
                  >
                      {data.me && <AddImageUser imagesUrl={data.me.imageUrl as string} />}
                      <Box w="100%" p="5" bg="#fff" rounded="10px" boxShadow="md">
                                <Text fontWeight="bold">ชื่อภาษาไทย</Text>
                                <Box
                                    h="30px"
                                    boxShadow="base"
                                    p="1"
                                    ml="5"
                                    rounded="md"
                                    bg="white"
                                    justify="center"
                                >
                                    <Text ml="2">{data.me.fullNameTH}</Text>
                                </Box>
                                <Text mt="3" fontWeight="bold">
                                    ชื่อภาษาอังกฤษ
                                </Text>
                                <Box
                                    h="30px"
                                    boxShadow="base"
                                    p="1"
                                    ml="5"
                                    rounded="md"
                                    bg="white"
                                    justify="center"
                                >
                                    <Text ml="2">{data.me.fullNameEN}</Text>
                                </Box>
                                <Text mt="3" fontWeight="bold">
                                    ชื่อเล่น
                                </Text>
                                <Box
                                    h="30px"
                                    boxShadow="base"
                                    p="1"
                                    ml="5"
                                    rounded="md"
                                    bg="white"
                                    justify="center"
                                >
                                    <Text ml="2">{data.me.nickName}</Text>
                                </Box>
                                <Text mt="3" fontWeight="bold">
                                    Email
                                </Text>
                                <Box
                                    h="30px"
                                    boxShadow="base"
                                    p="1"
                                    ml="5"
                                    rounded="md"
                                    bg="white"
                                    justify="center"
                              >
                                    <Text ml="2">{data.me.email}</Text>
                                </Box>
                                <Flex
                                    direction={["column", "column", "row", "row"]}
                                    justify="space-evenly"
                                    mt="5"
                                >
                                    <Flex>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md", "xl"]}
                                            p={3}
                                        >
                                            แผนก
                                        </Text>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["xl", "xl", "2xl"]}
                                            as="u"
                                            p={2}
                                        >
                                            {data?.me?.departments}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["sm", "md", "xl"]}
                                            p={3}
                                        >
                                            สาขา
                                        </Text>
                                        <Text
                                            fontWeight="semibold"
                                            fontSize={["xl", "xl", "2xl"]}
                                            as="u"
                                            p={2}
                                        >
                                            {data?.me?.roles === "client-LKB"
                                                ? "ลาดกระบัง"
                                                : data?.me?.roles === "client-CDC"
                                                    ? "ชลบุรี"
                                                    : "Admin"}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Center>
                                    <Button
                                        mt={4}
                                        type="submit"
                                        colorScheme="teal"
                                        onClick={() => {
                                            setIsOpen(true);
                                            if (data.me) {
                                                setUserToEdit(data.me);
                                            }
                                        }}
                                    >
                                        แก้ไขข้อมูล
                                    </Button>
                                    {isOpen && (
                                        <AddAndEditProfile
                                            Open={true}
                                            userToEdit={userToEdit}
                                            setOpen={() => setIsOpen(false)}
                                        />
                                    )}
                                </Center>
                            </Box>
                        </Flex>
                        {/* ---------------------------------------Column 2--------------------------------------- */}
                        <Flex
                            w={["100%", "100%", "100%", "30%"]}
                            p="2"
                            flexDir="column"
                            alignItems="center"
                            bg="#eee"
                            rounded="10px"
                            boxShadow="md"
                            mx={[null, null, null, "5"]}
                        >
                            <Text
                                h="155px"
                                fontWeight="semibold"
                                fontSize={["sm", "md", "xl"]}
                                p={3}
                                isTruncated
                            >
                                ประวัติการแจ้ง JOB
                            </Text>
                            {jobIt?.jobITByCreatorId && (
                                <Card
                                    label="สถานะงาน IT"
                                    content={jobIt.jobITByCreatorId.length}
                                />
                            )}
                            {stockIt?.stockItOrders && (
                                <Card label="สถานะงาน เบิกยืมอุปกรณ์ IT" content={stockIt.stockItOrders?.length} />
                            )}
                            {giveOrder?.giveOrderByCreatorId && (
                                <Card
                                    label="สถานะงาน เบิกของแจกลูกค้า"
                                    content={giveOrder.giveOrderByCreatorId.length}
                                />
                      )}
                            <Card label="สถานะงาน สั่งซื้อ" content={0} />
                  </Flex>
                  {/* ---------------------------------------Column 2--------------------------------------- */}
                  <Flex
                      w={["100%", "100%", "100%", "30%"]}
                      p="2"
                      flexDir="column"
                      alignItems="center"
                      bg="#eee"
                      rounded="10px"
                            boxShadow="md"
                  >
                      <Text
                          h="155px"
                          fontWeight="semibold"
                          fontSize={["sm", "md", "xl"]}
                          p={3}
                          isTruncated
                      >
                          ประวัติการ ลา/หยุดงาน
                      </Text>
                            <Card label="วันลาที่เหลือ" content={0} />
                            <Card label="ลาป่วย" content={0} />
                            <Card label="ลากิจ" content={0} />
                            <Card label="หยุดงาน" content={0} />
                  </Flex>
              </Flex>
          )}
        </Flex>
  );
};

export default Profile;

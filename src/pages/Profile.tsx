import React, { useState } from "react";
import { Text, Flex, Box, Button, Center, Divider } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import {
    useMeQuery,
    RegularUserFragment,
    useGiveOrderByCreatorIdQuery,
    useJobItByCreatorIdQuery,
} from "../generated/graphql";
import InputField from "../components/InputField";
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

    const { isOpen, setIsOpen } = useDialog();

    return (
        <>
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
              <Flex flexDir={["column", "column", "column", "row"]} overflow="hidden">
                  {/* ---------------------------------------Column 1--------------------------------------- */}
                  <Flex
                      w={["100%", "100%", "100%", "40%"]}
                      direction={["column", "column", "column", "column"]}
                      justify="center"
                      mt="5"
                      p="10"
                      bg="#eee"
                      rounded="10px"
                      boxShadow="md"
                  >
                      {data.me && <AddImageUser imagesUrl={data.me.imageUrl as string} />}
                      <Box w="100%" p="5" bg="#fff" rounded="10px" boxShadow="md">
                          <Formik
                              initialValues={{
                                  fullNameTH: "",
                                  fullNameEN: "",
                                  nickName: "",
                                  email: "",
                              }}
                                  onSubmit={async () => { }}
                              >
                                  {({ isSubmitting }) => (
                                      <Form>
                                          <InputField
                                              name="fullNameTH"
                                              label="ชื่อภาษาไทย"
                                              value={data.me?.fullNameTH ? data.me.fullNameTH : ""}
                                          />
                                          <InputField
                                              name="fullNameEN"
                                              label="ชื่อภาษาอังกฤษ"
                                              value={data.me?.fullNameEN ? data.me.fullNameEN : ""}
                                          />
                                          <InputField
                                              name="nickName"
                                              label="ชื่อเล่น"
                                              value={data.me?.nickName ? data.me.nickName : ""}
                                          />
                                          <InputField
                                              name="email"
                                              label="Email"
                                              value={data.me?.email ? data.me.email : ""}
                                          />
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
                                                      {data?.me?.roles === "client_LKB"
                                                          ? "ลาดกระบัง"
                                                          : data?.me?.roles === "client_CDC"
                                                              ? "ชลบุรี"
                                                              : "Admin"}
                                                  </Text>
                                              </Flex>
                                          </Flex>
                                          <Center>
                                              <Button
                                                  mt={4}
                                                  type="submit"
                                                  isLoading={isSubmitting}
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
                                      </Form>
                                  )}
                              </Formik>
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
                          mt="5"
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
                          <Card label="สถานะงาน Altas" content={10} />
                          {giveOrder?.giveOrderByCreatorId && (
                              <Card
                                  label="สถานะงาน เบิกของแจกลูกค้า"
                                  content={giveOrder.giveOrderByCreatorId.length}
                              />
                      )}
                      <Card label="สถานะงาน สั่งซื้อ" content={4} />
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
                      mt="5"
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
                      <Card label="วันลาที่เหลือ" content={10} />
                      <Card label="ลาป่วย" content={4} />
                      <Card label="ลากิจ" content={8} />
                      <Card label="หยุดงาน" content={1} />
                  </Flex>
              </Flex>
          )}
      </>
  );
};

export default Profile;

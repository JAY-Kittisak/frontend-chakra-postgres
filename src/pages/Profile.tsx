import React from "react";
import { Text, Flex, Box, Heading, Button, Center } from "@chakra-ui/react";
import { useMeQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import AddImageUser from "../components/manage-users/AddImageUser";
import Card from "../components/chakra-ui/Card";
import Spinner from "../components/Spinner";
import { Redirect } from 'react-router-dom'
import AddAndEditProfile from "../components/manage-users/AddAndEditProfile";
import { useDialog } from "../components/dialogs/useDialog";


interface Props { }

const Profile: React.FC<Props> = () => {
    const [{ data, fetching }] = useMeQuery();
    const { isOpen, setIsOpen } = useDialog()

    if (fetching) return <Spinner color="grey" height={50} width={50} />

    if (data?.me?.username === undefined)
        return <Redirect to='/' />

    return (
        <Layout variant="regular">
            <Box p="2" align="center">
                <Heading fontSize="4xl">Profile</Heading>
            </Box>

            <Flex flexDir={["column", "column", "column", "row"]} overflow="hidden">
                {/* ---------------------------------------Column 1--------------------------------------- */}
                <Flex
                    w={["100%", "100%", "100%", "50%"]}
                    direction={["column", "column", "column", "column"]}
                    justify="center"
                    mt="5"
                    p="10"
                    bg="gray.700"
                    rounded="10px"
                    boxShadow="md"
                >
                    {data.me &&
                        <AddImageUser imagesUrl={data.me.imageUrl as string} />
                    }

                    <Box w="100%" p="5" bg="gray.600" rounded="10px" boxShadow="md">
                        <Formik
                            initialValues={{
                                fullNameTH: "",
                                fullNameEN: "",
                                nickName: "",
                                email: "",
                            }}
                            onSubmit={async (values) => {
                                console.log(values)
                            }}
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
                                                    : "ชลบุรี"}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Center>
                                        <Button
                                            mt={4}
                                            type="submit"
                                            isLoading={isSubmitting}
                                            colorScheme="teal"
                                            onClick={() => setIsOpen(true)}
                                        >
                                            แก้ไขข้อมูล
                                        </Button>
                                        {isOpen &&
                                            <AddAndEditProfile
                                                Open={true}
                                                setOpen={() => setIsOpen(false)}
                                            />
                                        }
                                    </Center>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Flex>

                {/* ---------------------------------------Column 2--------------------------------------- */}
                <Flex
                    w={["100%", "100%", "100%", "25%"]}
                    p="5"
                    flexDir="column"
                    alignItems="center"
                    bg="gray.700"
                    rounded="10px"
                    boxShadow="md"
                    mt="5"
                    mx={[null, null, null, "5"]}
                >
                    <Text fontWeight="semibold" fontSize={["sm", "md", "xl"]} p={3}>
                        ประวัติการแจ้ง JOB และเบิกอุปกรณืต่างๆ
                    </Text>
                    <Card label="สถานะงาน IT" content="20" />
                    <Card label="สถานะงาน Altas" content="10" />
                    <Card label="สถานะงาน เบิกของแจกลูกค้า" content={String(data.me.giveOrders.length)} />
                    <Card label="สถานะงาน สั่งซื้อ" content="4" />
                </Flex>

                {/* ---------------------------------------Column 2--------------------------------------- */}
                <Flex
                    w={["100%", "100%", "100%", "25%"]}
                    p="5"
                    flexDir="column"
                    alignItems="center"
                    bg="gray.700"
                    rounded="10px"
                    boxShadow="md"
                    mt="5"
                >
                    <Text fontWeight="semibold" fontSize={["sm", "md", "xl"]} p={3}>
                        ประวัติการ ลา/หยุดงาน
                    </Text>

                    <Card label="วันลาที่เหลือ" content="10" />
                    <Card label="ลาป่วย" content="4" />
                    <Card label="ลากิจ" content="8" />
                    <Card label="หยุดงาน" content="1" />
                </Flex>
            </Flex>
        </Layout>
    );
};

export default Profile;

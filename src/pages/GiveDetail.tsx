import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    useColorModeValue,
    Flex,
    Text,
    Image,
    Stack,
    Button,
    Center,
    IconButton,
    Divider,
} from "@chakra-ui/react";
import { SmallAddIcon, MinusIcon } from "@chakra-ui/icons";

import { useGiveByIdQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { useDialog } from "../components/dialogs/useDialog";
import CreateGiveOrder from "../components/gives/CreateGiveOrder";
import { formatAmount } from "../utils/helpers"

interface Props { }

const GiveDetail: React.FC<Props> = () => {
    const [amount, setAmount] = useState(1);
    const { isOpen, setIsOpen } = useDialog();

    const bg = useColorModeValue("white", "gray.700");
    const bgButton = useColorModeValue("#0AB68B", "#4F80E2");

    const params = useParams<{ giveId: string }>();
    const gid = params.giveId;
    const [{ data, fetching }] = useGiveByIdQuery({
        variables: {
            id: +gid,
        },
  });

    return (
        <Layout variant="regular">
            <Text as="i" fontWeight="semibold" fontSize={["md", "md", "xl", "3xl"]}>
                รายละเอียดสินค้า
            </Text>
            <Divider mt={1} mb={3} orientation="horizontal" />

            <Center>
                {fetching &&
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading...
                        </Text>
                    </Flex>}

                {!data?.giveById ? (
                    <Text>No data.</Text>
                ) : (
                        <Flex
                            flexDir="column"
                            w={[null, null, "70%", "70%"]}
                            p={5}
                            rounded="7px"
                            boxShadow="md"
                            bg={bg}
                        >
                            <Flex flexDir={["column", "column", "column", "row"]} align="center">
                                <Flex w={[null, null, null, "40%"]} justify="center" align="center">
                                {data.giveById.imageUrl && (
                                    <Image boxSize="400px" src={data.giveById.imageUrl} />
                                )}
                                </Flex>
                                <Flex flexDir="column" w={[null, null, null, "60%"]} justify="center">
                                    <Flex p={5} flexDir="column" justifyContent="space-between">
                                        <Center>
                                            <Text fontSize="xl" fontWeight="bold">{data.giveById.giveName}</Text>
                                        </Center>

                                        <Stack isInline mt={3} justify="space-between">
                                            <Text fontSize={["sm", "sm", "md", "xl"]}>ราคา : </Text>
                                            <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">{data.giveById.price && formatAmount(data.giveById.price)} บาท</Text>
                                        </Stack>
                                        <Divider orientation="horizontal" mt={3} />

                                        <Stack isInline mt={3} justify="space-between">
                                            <Text fontSize={["sm", "sm", "md", "xl"]}>จำนวนคงเหลือ : </Text>
                                            <Text
                                                fontSize={["sm", "sm", "md", "xl"]}
                                                fontWeight="semibold"
                                                color={data.giveById.inventory === 0 ? "red" : undefined}
                                            >
                                                {data.giveById.inventory} ชิ้น
                                            </Text>
                                        </Stack>
                                        <Divider orientation="horizontal" mt={3} />

                                        <Stack isInline mt={3} justify="space-between">
                                            <Text fontSize={["sm", "sm", "md", "xl"]}>ประเภท : </Text>
                                            <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">{data.giveById.category}</Text>
                                        </Stack>
                                        <Divider orientation="horizontal" mt={3} />

                                        <Flex mt={3}>
                                            <Text w="130px" fontSize={["sm", "sm", "md", "xl"]}>
                                                Details :{" "}
                                            </Text>
                                        </Flex>
                                        <Flex ml={4}>
                                            <Flex fontSize={["sm", "sm", "md", "xl"]} overflow="inherit" fontWeight="semibold">{data.giveById.details}</Flex>
                                        </Flex>
                                        <Divider orientation="horizontal" mt={3} />

                                        <Stack isInline mt={3} justify="space-between">
                                            <Text fontSize={["sm", "sm", "md", "xl"]}>วันที่ซื้อ : </Text>
                                            <Text fontSize={["sm", "sm", "md", "xl"]} fontWeight="semibold">{new Date(+data.giveById.createdAt).toDateString()}</Text>
                                        </Stack>
                                        <Divider orientation="horizontal" mt={3} />

                                    </Flex>
                                </Flex>
                            </Flex>

                            <Center mt="5">
                                {data.giveById.inventory === 0 ? (
                                    <Center>
                                        <Text mt={3} fontWeight="semibold" color="red" fontSize="2xl">
                                            Out of stock
                                        </Text>
                                    </Center>
                                ) : (
                                        <>
                                            <Flex
                                                flexDir="row"
                                                h="40px"
                                                bg="blackAlpha.100"
                                                rounded="20px"
                                            >
                                                <IconButton
                                                    aria-label=""
                                                    icon={<MinusIcon />}
                                                    style={{
                                                        cursor: amount === 1 ? "not-allowed" : undefined,
                                                    }}
                                                    onClick={() =>
                                                        setAmount((prev) => {
                                                            if (prev < 2) return prev;
                                                            return prev - 1;
                                                        })
                                                    }
                                                />
                                                <Center>
                                                    <Flex ml={3} mr={3} mt="-1">
                                                        <Text fontWeight="semibold" fontSize="2xl">
                                                            {amount}
                                                        </Text>
                                                    </Flex>
                                                </Center>
                                                <IconButton
                                                    aria-label=""
                                                    icon={<SmallAddIcon />}
                                                    style={{
                                                        cursor:
                                                            amount === data.giveById.inventory
                                                                ? "not-allowed"
                                                                : undefined,
                                                    }}
                                                    onClick={() =>
                                                        setAmount((prev) => {
                                                            if (prev === data.giveById.inventory) return prev;
                                                            return prev + 1;
                                                        })
                                                    }
                                                />
                                            </Flex>
                                            <Flex flexDir="column" alignItems="center">
                                                <Button
                                                    ml={3}
                                                    mr={3}
                                                    bg={bgButton}
                                                    disabled={data.giveById.inventory === 0}
                                                    // disabled={data.giveById.inventory === 250 || addToCartLoading}
                                                    // loading={addToCartLoading}
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                    }}
                                                >
                                                    เบิกสินค้า
                                                </Button>
                                                {isOpen && (
                                                    <CreateGiveOrder
                                                        giveId={+gid}
                                                        amount={amount}
                                                        Open={true}
                                                        setOpen={() => setIsOpen(false)}
                                                    />
                                                )}
                                            </Flex>
                                    </>
                                )}
                            </Center>
                    </Flex>
                )}
            </Center>
        </Layout>
    );
};

export default GiveDetail;

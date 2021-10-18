import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Flex,
    Text,
    Image,
    Stack,
    Button,
    Center,
    Divider,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";

import { useGiveByIdQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";
import { useDialog } from "../components/dialogs/useDialog";
import CreateGiveOrder from "../components/gives/CreateGiveOrder";
import { formatAmount } from "../utils/helpers"

interface Props { }

const GiveDetail: React.FC<Props> = () => {
    const [amount, setAmount] = useState(1);
    const { isOpen, setIsOpen } = useDialog();

    const params = useParams<{ giveId: string }>();
    const gid = params.giveId;

    const [{ data, fetching }] = useGiveByIdQuery({
        variables: {
            id: +gid,
        },
    });

    const handleChange = (value: any) => setAmount(+value)

    return (
        <>
            <Text
                as="i"
                fontWeight="semibold"
                fontSize={["md", "md", "xl", "3xl"]}
                bgGradient="linear(to-l, teal.500,green.500)"
                bgClip="text"
            >
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
            >
                <Flex flexDir={["column", "column", "column", "row"]} align="center">
                    <Flex w={[null, null, null, "40%"]} justify="center" align="center">
                        {data.giveById.imageUrl && (
                            <Image borderRadius="xl" boxSize="400px" src={data.giveById.imageUrl} />
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
                                            {/* <IconButton
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
                                    /> */}
                                            <Flex>
                                                <NumberInput
                                                    // defaultValue={1}
                                                    min={1}
                                                    max={data.giveById.inventory as number}
                                                    value={amount}
                                                    onChange={handleChange}
                                                >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Flex>
                                <Flex flexDir="column" alignItems="center">
                                    <Button
                                        ml={3}
                                        mr={3}
                                                    colorScheme="green"
                                                    disabled={data.giveById.inventory === 0}
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
        </>
    );
};

export default GiveDetail;

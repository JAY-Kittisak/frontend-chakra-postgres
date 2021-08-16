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

import { useIsAuth } from "../utils/uselsAuth";
import { useGiveByIdQuery } from "../generated/graphql";
import Spinner from "../components/Spinner";
import { useDialog } from "../components/dialogs/useDialog";
import CreateGiveOrder from "../components/gives/CreateGiveOrder";

interface Props { }

const GiveDetail: React.FC<Props> = () => {
    useIsAuth();
    const [quantity, setQuantity] = useState(1);
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

    if (fetching) return <Spinner color="grey" height={50} width={50} />;

    return (
        <Center>
            {!data?.giveById ? (
              <Text>No data.</Text>
          ) : (
                  <Flex flexDir="row" w="50%" p={5} rounded="7px" boxShadow="md" bg={bg}>
                      <Image
                          boxSize="400px"
                          src="https://aumento.officemate.co.th/media/catalog/product/O/F/OFM5232010.jpg?imwidth=640"
                      />
                      <Flex flexDir="column" justifyContent="space-between">
                          <Flex
                              p={5}
                              flexDir="column"
                              justifyContent="space-between"
                              h="35vh"
                          >
                              <Center>
                                  <Text fontSize="3xl">{data.giveById.giveName}</Text>
                              </Center>
                              <Stack isInline mt={3}>
                                  <Text fontWeight="semibold">ราคา : </Text>
                                  <Text>{data.giveById.price}</Text>
                              </Stack>
                              <Divider orientation="horizontal" />
                              <Stack isInline mt={3}>
                                  <Text fontWeight="semibold">จำนวนคงเหลือ : </Text>
                                  <Text color={data.giveById.inventory === 0 ? "red" : undefined}>
                                      {data.giveById.inventory}
                                  </Text>
                              </Stack>
                              <Divider orientation="horizontal" />
                              <Stack isInline mt={3}>
                                  <Text fontWeight="semibold">ประเภท : </Text>
                                  <Text>{data.giveById.category}</Text>
                              </Stack>
                              <Divider orientation="horizontal" />
                              <Flex mt={3}>
                                  <Text w="130px" fontWeight="semibold">
                                      Details :{" "}
                                  </Text>
                              </Flex>
                              <Flex ml={4}>
                                  <Text>{data.giveById.details}</Text>
                              </Flex>
                              <Divider orientation="horizontal" />
                          </Flex>
                          {data.giveById.inventory === 0 ? (
                              <Text mt={3} fontWeight="semibold" color="red" fontSize="2xl">
                                  Out of stock
                              </Text>
                          ) : (
                              <Center>
                                      <Flex flexDir="row" h="40px" bg="blackAlpha.100" rounded="20px">
                                          <IconButton
                                              aria-label=""
                                              icon={<MinusIcon />}
                                              style={{
                                                  cursor: quantity === 1 ? "not-allowed" : undefined,
                                              }}
                                              onClick={() =>
                                                  setQuantity((prev) => {
                          if (prev < 2) return prev;
                          return prev - 1;
                      })
                                              }
                                          />
                                          <Center>
                                              <Flex ml={3} mr={3} mt="-1">
                                                  <Text fontWeight="semibold" fontSize="2xl">
                                                      {quantity}
                                                  </Text>
                                              </Flex>
                                          </Center>
                                          <IconButton
                                              aria-label=""
                                              icon={<SmallAddIcon />}
                                              style={{
                                                  cursor:
                                                      quantity === data.giveById.inventory
                                                          ? "not-allowed"
                                                          : undefined,
                                              }}
                                              onClick={() =>
                                                  setQuantity((prev) => {
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
                                                  Open={true}
                                                  setOpen={() => setIsOpen(false)}
                                          />
                                      )}
                                  </Flex>
                              </Center>
                          )}
                      </Flex>
                  </Flex>
            )}
        </Center>
    );
};

export default GiveDetail;

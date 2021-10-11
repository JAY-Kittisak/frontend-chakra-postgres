import React, { useState, useEffect } from "react";
import {
    Grid,
    Text,
    Flex,
    Button,
    Divider,
} from "@chakra-ui/react";

import Spinner from "../components/Spinner";
import StockItItem from "../components/StockIt/StockItItem";
import { useStockItsQuery, RegularStockItFragment } from "../generated/graphql";
import { Branch } from "../utils/helpers"
import CategoryFilter from "../components/StockIt/CategoryFilter";
import BrandFilter from "../components/StockIt/BrandFilter";
import SelectBranch from "../components/SelectBranch";

interface Props { }

const StockIt: React.FC<Props> = () => {
    const [item, setItem] = useState<RegularStockItFragment[] | undefined>(
        undefined
    );
    const [branch, setBranch] = useState<Branch>("All");

    const [reset, setReset] = useState(false);
    const [catItem, setCatItem] = useState("");
    const [brandItem, setBrandItem] = useState("");

    const [{ data, fetching }] = useStockItsQuery();

    useEffect(() => {
        if (branch === "All" && data?.stockIts) {
            setItem(data.stockIts);
        }
        if (branch === "ลาดกระบัง") {
            const dataTest = data?.stockIts?.filter((val) => val.branch === branch);
            setItem(dataTest);
        }
        if (branch === "ชลบุรี") {
            const dataTest = data?.stockIts?.filter((val) => val.branch === branch);
            setItem(dataTest);
        }
    }, [branch, data]);

    useEffect(() => {
        if (reset) {
            setCatItem("");
            setBrandItem("");
        }
        setReset(false);
    }, [reset]);

    if (!data && fetching) {
        return (
            <Flex>
                <Flex flexDir="row" m="auto" h="90vh" align="center">
                    <Spinner color="grey" height={50} width={50} />
                    <Text fontWeight="bold" fontSize="2xl">
                        &nbsp; Loading...
                    </Text>
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex flexDir={["column", "column", "column", "column", "row"]}>
            <Flex w={["100%", "100%", "100%", "100%", "80%"]} flexDir="column" mr="2">
                <SelectBranch
                    title="เบิก/ยืม อุปกรณ์ IT"
                    branch={branch}
                    setBranch={setBranch}
                />
                {fetching && (
                    <Flex justify="center" mt="5">
                        <Spinner color="grey" height={50} width={50} />
                        <Text fontWeight="bold" fontSize="2xl">
                            &nbsp; Loading...
                        </Text>
                    </Flex>
                )}
                {!data?.stockIts ? (
                    <Flex justify="center" mt="5">
                        <Text fontWeight="bold" fontSize="2xl">
                            No. Data
                        </Text>
                    </Flex>
                ) : (
                    <Grid templateColumns={["repeat(5, 1fr)"]} gap={6}>
                        {item?.map((value) => (
                            <StockItItem key={value.id} stockIt={value} />
                        ))}
                    </Grid>
                )}
            </Flex>
            <Flex w={["100%", "100%", "100%", "100%", "20%"]} minW="310px" h="94vh">
                <Divider orientation="vertical" />
                <Flex w="100%" flexDir="column" overflow="auto">
                    <Flex justify="end">
                        <Button
                            ml="5"
                            mb="2"
                            size="md"
                            colorScheme="teal"
                            variant="outline"
                            boxShadow="md"
                            disabled={
                                catItem === "" &&
                                brandItem === ""
                            }
                            isLoading={fetching}
                            onClick={() => setReset(true)}
                        >
                            Reset
                        </Button>
                    </Flex>
                    <CategoryFilter setCatItem={setCatItem} />
                    <BrandFilter setBrandItem={setBrandItem} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default StockIt;

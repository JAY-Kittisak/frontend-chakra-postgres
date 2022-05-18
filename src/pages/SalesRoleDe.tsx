import React, { useEffect, useState } from 'react'
import { Flex, Grid, Text, Select, Image, Button } from "@chakra-ui/react";
import {
    useParams, useHistory
} from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";

import Spinner from "../components/Spinner";
import {
    useMeQuery,
    useSalesRoleByIdQuery,
    useTargetByRoleIdQuery,
    useVisitByRoleIdQuery,
    useIssueByRoleIdQuery,
    useQuotationByRoleIdQuery,
    RegularSalesVisitFragment,
    RegularSalesIssueFragment,
} from "../generated/graphql";
import { useIsAuth } from "../utils/uselsAuth";
import { selectMonth, formatGetMonth, reducer, serviceLife } from "../utils/helpers";
import Target from '../components/sales-report/Target';
import TabsSaleRole from '../components/sales-report/TabsSaleRole';
import IssueChart from '../components/sales-report/IssueChart';

interface Props { }

const currentYear = new Date().getFullYear();
const initialIssue = {
    countIssue: 0,
    valueIssue: 0
}

const monthly = new Date().getMonth()

const SalesRoleDe: React.FC<Props> = () => {
    useIsAuth();

    // const [chooseMonth, setChooseMonth] = useState("เดือน");
    const [chooseYear, setChooseYear] = useState(currentYear.toString());
    // const [selectYear, setSelectYear] = useState([currentYear]);
    const [issueProcess, setIssueProcess] = useState(initialIssue);
    const [quotationValue, setQuotationValue] = useState(0);

    const [monthIndex, setMonthIndex] = useState(monthly+1);
    const [monthValue, setMonthValue] = useState({
        มกราคม: 0,
        กุมภาพันธ์: 0,
        มีนาคม: 0,
        เมษายน: 0,
        พฤษภาคม: 0,
        มิถุนายน: 0,
        กรกฎาคม: 0,
        สิงหาคม: 0,
        กันยายน: 0,
        ตุลาคม: 0,
        พฤศจิกายน: 0,
        ธันวาคม: 0,
    });
    const [monthlyVisit, setMonthlyVisit] = useState<RegularSalesVisitFragment[] | undefined>()
    const [monthlyIssue, setMonthlyIssue] = useState<RegularSalesIssueFragment[] | undefined>()

    const history = useHistory();
    const params = useParams<{ id: string }>();

    const [{ data: me }] = useMeQuery();
    const [{ data, fetching }] = useSalesRoleByIdQuery({
        variables: {
            id: +params.id,
            monthIndex: 0,
            year: +chooseYear
        },
    });
    const [{ data: target }] = useTargetByRoleIdQuery({
        variables: {
            salesRoleId: +params.id,
            year: +chooseYear
        }
    })
    const [{ data: visits }] = useVisitByRoleIdQuery({
        variables: {
            saleRoleId: +params.id,
        }
    })
    const [{ data: issues }] = useIssueByRoleIdQuery({
        variables: {
            saleRoleId: +params.id,
        }
    })
    const [{ data: quotations }] = useQuotationByRoleIdQuery({
        variables: {
            saleRoleId: +params.id,
        }
    })

    const branch = data?.salesRoleById.branch;
    const colorBranch = branch === "ลาดกระบัง" ? "#64c9e2" : "#7be4ca";
    const colorBranchPass = branch === "ลาดกระบัง" ? "#1379ec" : "#0AB68B";
    const colorOnMouse = branch === "ลาดกระบัง" ? "#0a7988" : "#0d4e3e";
    const selectYear = [currentYear]

    // const onChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setChooseMonth(e.target.value);
    // };

    const onChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChooseYear(e.target.value);
    };

    useEffect(() => {
        if (!quotations?.quotationByRoleId) return

        const valueQt = quotations.quotationByRoleId.reduce((value, e) => {
            const total = e.value + value
            return total
        }, 0)

        setQuotationValue(valueQt)

        setMonthValue({
            มกราคม: 0,
            กุมภาพันธ์: 0,
            มีนาคม: 0,
            เมษายน: 0,
            พฤษภาคม: 0,
            มิถุนายน: 0,
            กรกฎาคม: 0,
            สิงหาคม: 0,
            กันยายน: 0,
            ตุลาคม: 0,
            พฤศจิกายน: 0,
            ธันวาคม: 0,
        })

        if (!issues?.issueByRoleId || issues.issueByRoleId.length === 0) return

        const aprilFilter = issues.issueByRoleId
            .filter((m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "เมษายน")
            .map(value => value.issueValue)
            .reduce(reducer);

        const mayFilter = issues.issueByRoleId
            .filter((m) => selectMonth[formatGetMonth(+m.createdAt) + 1] === "พฤษภาคม")
            .map(value => value.issueValue)
            .reduce(reducer);

        setMonthValue({
            มกราคม: 0,
            กุมภาพันธ์: 0,
            มีนาคม: 0,
            เมษายน: aprilFilter,
            พฤษภาคม: mayFilter,
            มิถุนายน: 0,
            กรกฎาคม: 0,
            สิงหาคม: 0,
            กันยายน: 0,
            ตุลาคม: 0,
            พฤศจิกายน: 0,
            ธันวาคม: 0,
        })

    }, [quotations, visits, issues])

    useEffect(() => {
        if (!issues?.issueByRoleId) return
        if (!visits?.visitByRoleId) return

        const filterVisit = visits.visitByRoleId.filter(value => (formatGetMonth(+value.createdAt) + 1) === monthIndex)
        
        const countIssue = issues.issueByRoleId.length
        const valueIssue = issues.issueByRoleId.reduce((value, e) => {
            const total = e.issueValue + value
            return total
        }, 0)
        const filterIssue = issues.issueByRoleId.filter(value => (formatGetMonth(+value.createdAt) + 1) === monthIndex)

        setMonthlyVisit(filterVisit)
        setIssueProcess({ countIssue, valueIssue })
        setMonthlyIssue(filterIssue)

    }, [monthIndex, visits, issues])

    return (
        <Flex flexDir="column" p="5" pb="10" overflow="auto" h="96vh">
            <Flex justify="space-between">
                <Flex alignItems='center'>
                    <Text
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        color="gray.600"
                    >
                        {data?.salesRoleById.salesRole} {data?.salesRoleById.branch}
                    </Text>
                    {me?.me?.roles.includes("superAdmin") && (
                        <Button
                            ml='5'
                            colorScheme='orange'
                            leftIcon={<EditIcon />}
                            onClick={() => history.push(`/user-id/${data?.salesRoleById.id}`)}
                        >
                            แก้ไข
                        </Button>
                    )}
                </Flex>

                <Flex>
                    {/* <Select
                        w="150px"
                        mr="5"
                        fontWeight="semibold"
                        name="selectMonth"
                        onChange={(e) => onChangeMonth(e)}
                    >
                        {selectMonth.map((val, i) => (
                            <option key={i} value={val}>
                                {val}
                            </option>
                        ))}
                    </Select> */}
                    <Select
                        w="150px"
                        fontWeight="semibold"
                        name="selectYear"
                        onChange={(e) => onChangeYear(e)}
                    >
                        {selectYear.map((year, i) => {
                            return (
                                <option key={i} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </Select>
                </Flex>
            </Flex>

            {fetching ? (
                <Flex justify="center">
                    <Spinner color="grey" height={50} width={50} />
                    <Text
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        my={2}
                    >
                        {" "}
                        &nbsp; Loading...
                    </Text>
                </Flex>
            ) : !data?.salesRoleById ? (
                <Flex justify="center">
                    <Text
                        color="orange.600"
                        as="i"
                        fontWeight="semibold"
                        fontSize={["md", "md", "xl", "3xl"]}
                        my={2}
                    >
                        แจ้งเตือน: คุณไม่สามารถเข้าถึงข้อมูลนี้ได้
                    </Text>
                </Flex>
            ) : (
                <>
                    <Flex
                        py="2"
                        pl="5"
                        mt="3"
                        rounded="7px"
                        borderWidth='1px'
                        boxShadow="md"
                    >
                        {data?.salesRoleById.user.imageUrl && (
                            <Image
                                borderRadius="lg"
                                boxSize="60px"
                                src={data.salesRoleById.user.imageUrl}
                                alt="user"
                            />
                        )}

                        <Grid
                            ml="10"
                            w='100%'
                            templateColumns={[
                                'repeat(1, 1fr)',
                                'repeat(1, 1fr)',
                                'repeat(2, 1fr)',
                                'repeat(3, 1fr)',
                                'repeat(3, 1fr)',
                                'repeat(3, 1fr)'
                            ]}
                            gap={3}
                        >
                            <Flex>
                                <Text fontWeight="semibold">Name : </Text>
                                <Text>&nbsp;{data.salesRoleById.user.fullNameTH}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="semibold">Team : </Text>
                                <Text>&nbsp;{data.salesRoleById.channel}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="semibold">Area Code : </Text>
                                <Text>&nbsp;{data.salesRoleById.areaCode}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="semibold">Date Start : </Text>
                                <Text>&nbsp; {data.salesRoleById.startDate}</Text>
                            </Flex>
                            <Flex>
                                <Text fontWeight="semibold">อายุงาน : </Text>
                                {/* <Text>{data.salesRoleById.วันเริ่มตำแหน่ง หรือ อายุงาน}</Text> */}
                                <Text>
                                    &nbsp;{serviceLife(data.salesRoleById.startDate)}
                                </Text>
                            </Flex>
                        </Grid>
                    </Flex>

                    {target?.targetByRoleId && (
                        <>
                            <Grid
                                templateColumns={[
                                    'repeat(1, 1fr)',
                                    'repeat(1, 1fr)',
                                    'repeat(2, 1fr)',
                                    'repeat(3, 1fr)',
                                    'repeat(3, 1fr)',
                                    'repeat(6, 1fr)'
                                ]}
                                gap={3}
                            >
                                <Target
                                    color={colorBranchPass}
                                    title={'COMMISSION'}
                                    valueTarget={target.targetByRoleId.commission}
                                    valueCurrent={0}
                                />
                                <Target
                                    color={colorBranchPass}
                                    title={'STRATEGY'}
                                    valueTarget={target.targetByRoleId.strategy}
                                    valueCurrent={0}
                                />
                                <Target
                                    color={colorBranchPass}
                                    title={'การเข้าพบลูกค้า'}
                                    valueTarget={target.targetByRoleId.countVisit}
                                    valueCurrent={visits?.visitByRoleId?.length ? visits.visitByRoleId.length : 0}
                                />
                                <Target
                                    color={colorBranchPass}
                                    title={'Issue'}
                                    valueTarget={target.targetByRoleId.countIssue}
                                    valueCurrent={issueProcess.countIssue}
                                />
                                <Target
                                    color={colorBranchPass}
                                    title={'มูลค่า Issue'}
                                    valueTarget={target.targetByRoleId.valueIssue}
                                    valueCurrent={issueProcess.valueIssue}
                                />
                                <Target
                                    color={colorBranchPass}
                                    title={'มูลค่า QT'}
                                    valueTarget={target.targetByRoleId.valueQt}
                                    valueCurrent={quotationValue}
                                />
                            </Grid>

                            {/* กราฟ */}
                            <IssueChart
                                colorBranch={colorBranch}
                                colorBranchPass={colorBranchPass}
                                colorOnMouse={colorOnMouse}
                                countIssue={target.targetByRoleId.countIssue}
                                valueIssue={target.targetByRoleId.valueIssue}
                                countVisit={target.targetByRoleId.countVisit}
                                monthValue={monthValue}
                                setMonthIndex={setMonthIndex}
                                monthlyIssue={monthlyIssue}
                                monthlyVisit={monthlyVisit}
                            />
                        </>
                    )}

                    <TabsSaleRole
                        monthlyVisit={monthlyVisit}
                        issues={issues}
                        quotations={quotations}
                        color={colorBranchPass}
                    />
                </>
            )}

        </Flex>
    )
}

export default SalesRoleDe
import React, { useState, useEffect } from "react";
import { Flex, Image, Text, Divider, Input } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import {
    CatUserRole,
    AlertNt,
    reducer,
    firstDayOfMonth,
    lastDayOfMonth
} from "../utils/helpers";
import { 
    useMeQuery, 
    useSalesRolesQuery, 
    RegularSalesRoleFragment,
    useVisitsQuery,
    RegularSalesVisitFragment,
    useTargetByRoleQuery,
    RegularSalesTargetFragment
} from "../generated/graphql";
import Spinner from "../components/Spinner";
import SalesTarget from "../components/sales-report/SalesTarget";
import { useIsAuth } from "../utils/uselsAuth";
import AlertNotification from "../components/dialogs/AlertNotification";

import "../styles/card-sales.css";
import SalesChart from "../components/sales-report/SalesChart";
import MainChart from "../components/sales-report/MainChart";
import SwitchBranch from "../components/sales-report/SwitchBranch";
import ActualChart from "../components/sales-report/ActualChart";

interface Props { }

const SalesReportLeader: React.FC<Props> = () => {
    useIsAuth();

    const [branch, setBranch] = useState<CatUserRole>("ลาดกระบัง");
    const [loading, setLoading] = useState(false);

    const [colorBranch, setColorBranch] = useState("#64c9e2");
    const [colorBranchPass, setColorBranchPass] = useState("#1379ec");
    // const [colorOnMouse, setColorOnMouse] = useState("#0a7988");

    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");
    
    const [salesByChannel, setSalesByChannel] = useState<RegularSalesRoleFragment[] | undefined>(undefined)
    const [visits, setVisits] = useState<RegularSalesVisitFragment[] | undefined>(undefined)
    const [targets, setTargets] = useState<RegularSalesTargetFragment[] | undefined>(undefined)

    const [dateBegin, setDateBegin] = useState(firstDayOfMonth);
    const [dateEnd, setDateEnd] = useState(lastDayOfMonth);

    const [channel, setChannel] = useState("All")
    const [channels, setChannels] = useState(['All']);
    const [dataByChannel, setDataByChannel] = useState<{
        channel: string;
        sumIssue: number;
    }[]>()
    const [ sumValueIssue, setSumValueIssue] = useState(0)

    const [{ data: me }] = useMeQuery();

    const [{ data: salesRole, fetching }] = useSalesRolesQuery();

    const [{ data: dataVisits, fetching: visitFetching }] = useVisitsQuery({
        variables: {
            dateBegin,
            dateEnd
        }
    })
    
    const [{ data: target }] = useTargetByRoleQuery({
        variables: {
            year: +dateBegin.split('-')[0]
        },
    });

    const history = useHistory();

    const userHandle = (roleId: number, userId: number) => {
        if (me?.me?.position.includes("หัวหน้างาน")) {
            return history.push(`/sales-report/role-manage/${roleId}`);
        } else if (me?.me?.position.includes("GM")) {
            return history.push(`/sales-report/role-manage/${roleId}`);
        } else if (me?.me?.id === userId) {
            return history.push(`/sales-report/role-manage/${roleId}`);
        } else {
            return setAlertWarning("show");
        }
    };

    useEffect(() => {
        setLoading(true);

        if (branch === "ชลบุรี") {
            setColorBranch("#7be4ca");
            setColorBranchPass("#0AB68B");
            // setColorOnMouse("#0d4e3e");

            setTimeout(() => {
                setLoading(false);
            }, 500);
        } else {
            setColorBranch("#64c9e2");
            setColorBranchPass("#1379ec");
            // setColorOnMouse("#0a7988");

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [branch])

    useEffect(() => {
        if (!salesRole?.salesRoles) return
        if (!target?.targetByRole) return
        if (!dataVisits?.visits) return

        const filterVisits = dataVisits.visits.filter(val => val.saleRole.branch === branch)
        const filterTargets = target?.targetByRole.filter(val => val.sale.branch === branch)
        
        const roleFilterBranch = salesRole.salesRoles.filter((val) => val.branch === branch)
        const mapChannel = roleFilterBranch.map(item => item.channel)

        if (channel === 'All') {
            setVisits(filterVisits)
            setTargets(filterTargets)
            setSalesByChannel(roleFilterBranch)
        } else {
            const filteredData = roleFilterBranch.filter(item => item.channel === channel)
            const filterVisitChan = filterVisits.filter(item => item.saleRole.channel === channel)
            const filterTargetChan = filterTargets.filter(item => item.sale.channel === channel)
            
            setVisits(filterVisitChan)
            setTargets(filterTargetChan)
            setSalesByChannel(filteredData)
        }

        const newSetChannel = new Set(mapChannel)
        
        let itemChannels: string[] = ['All']
        newSetChannel.forEach(function (value) {
            itemChannels.push(value)
        });
        
        let issueChannel: { channel: string, sumIssue: number }[] = []

        itemChannels.forEach(team => {
            if (team === 'All') return

            const filterTeam = filterVisits.filter(val => val.saleRole.channel === team);
            const issues = filterTeam.map(val => val.issueReceives)

            let sumIssue: number[] = []

            issues.forEach(issue => {
                if (!issue) return

                const valueIssue = issue.map(issueVal => issueVal.issueValue)
                sumIssue.push(valueIssue.reduce(reducer, 0))
            })

            issueChannel.push({ channel: team, sumIssue: sumIssue.reduce(reducer, 0) })
        })

        setDataByChannel(issueChannel)
        setChannels(itemChannels)

    } ,[ salesRole, dataVisits, target, branch, channel])

    return (
        <Flex
            flexDir={["column", "column", "column", "column", "row"]}
            overflowY="auto"
            px="5"
            h="97vh"
        >
            <Flex w="100%" flexDir="column" mr="2">
                <SwitchBranch
                    title="Sales Report"
                    branch={branch}
                    defaultBranch={me?.me?.branch}
                    setBranch={setBranch}
                />

                <Divider mt={1} mb={2} orientation="horizontal" />
                <AlertNotification
                    alertWarning={alertWarning}
                    setAlertWarning={setAlertWarning}
                    label="คุณไม่สามารถเข้าถึงข้อมูลนี้ได้!"
                />
                {(fetching || loading) ? (
                    <Flex h="225px" justify="center" align="center">
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
                ) : (
                    <Flex flexDir="column">
                        <Flex
                            borderRadius="8px"
                            w="100%"
                            h="250px"
                            overflowX="auto"
                            overflowY="hidden"
                            sx={{
                                "&::-webkit-scrollbar": {
                                    width: "8px",
                                },
                                "&::-webkit-scrollbar-track": {
                                    width: "8px",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    width: "1em",
                                    backgroundColor: colorBranchPass,
                                    borderRadius: "24px",
                                },
                            }}
                        >
                            {salesByChannel &&
                                salesByChannel
                                    .filter((val) => val.branch === branch)
                                    .map(
                                        (val) =>
                                            val.user.imageUrl && (
                                                <div
                                                    className={`card ${branch === "ลาดกระบัง"
                                                        ? "bg-card-lkb"
                                                        : "bg-card-cdc"
                                                        }`}
                                                    key={val.id}
                                                    onClick={() => userHandle(val.id, val.userId)}
                                                >
                                                    <p>{val.salesRole}</p>
                                                    <Image
                                                        objectFit="cover"
                                                        src={val.user.imageUrl}
                                                        alt={
                                                            val.user.fullNameTH
                                                                ? val.user.fullNameTH
                                                                : "User ไม่ได้ทำการใส่ข้อมูล"
                                                        }
                                                        borderRadius="lg"
                                                    />
                                                    <h4>{val.user.fullNameTH}</h4>
                                                </div>
                                            )
                                    )}
                        </Flex>

                        <Flex flexDir="column">
                            <Flex justify="space-between">
                                <Text
                                    ml="3"
                                    fontWeight="semibold"
                                    fontSize={["md", "md", "xl", "3xl"]}
                                    color={colorBranchPass}
                                >
                                    {branch}
                                </Text>

                                <Flex>
                                    <Flex alignItems="center">
                                        <Text mr="5">วันที่ : </Text>
                                        <Input
                                            mr="5" 
                                            w="200px" 
                                            type="date"
                                            defaultValue={dateBegin}
                                            onChange={(e) => setDateBegin(e.target.value)}
                                        />
                                        <Text mr="5">ถึง :</Text>
                                        <Input
                                            w="200px"
                                            type="date"
                                            defaultValue={dateEnd}
                                            onChange={(e) => setDateEnd(e.target.value)}
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex mt="-2">
                                <SalesTarget
                                    colorBranch={colorBranch}
                                    colorBranchPass={colorBranchPass}
                                    targets={targets}
                                    dateBegin={dateBegin}
                                    sumValueIssue={sumValueIssue}
                                />

                                <MainChart
                                    colorBranch={colorBranch}
                                    dateBegin={dateBegin}
                                    dateEnd={dateEnd}
                                    channel={channel}
                                    channels={channels}
                                    dataByChannel={dataByChannel}
                                    fetching={visitFetching}
                                    setChannel={setChannel}
                                    visits={visits}
                                />
                            </Flex>
                            
                            <SalesChart
                                colorBranch={colorBranch}
                                visits={visits}
                                targets={targets}
                                setSumValueIssue={setSumValueIssue}
                            />
                            
                            <ActualChart
                                colorBranch={colorBranch}
                                dateBegin={dateBegin}
                                dateEnd={dateEnd}
                                branch={branch}
                                channel={channel}
                                targets={targets}
                            />
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default SalesReportLeader;

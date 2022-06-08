import React, { useState, useEffect } from "react";
import {
    Flex, Image, Text, Button, Divider, Input,
} from "@chakra-ui/react";
import { EditIcon, SettingsIcon , ViewIcon} from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

import {
    CatUserRole,
    AlertNt,
    firstDayOfMonth,
    lastDayOfMonth
} from "../utils/helpers";
import { useMeQuery, useSalesRolesQuery, RegularSalesRoleFragment } from "../generated/graphql";
import { useIsAuth } from "../utils/uselsAuth";
import Spinner from "../components/Spinner";
import AlertNotification from "../components/dialogs/AlertNotification";
import SalesTimestamp from "../components/sales-report/SalesTimestamp";
import SwitchBranch from "../components/sales-report/SwitchBranch";
import "../styles/card-sales.css";

interface Props { }

const SalesReport: React.FC<Props> = () => {
    useIsAuth();

    const [branch, setBranch] = useState<CatUserRole>("ลาดกระบัง");
    const [userIsSales, setUserIsSales] = useState(true);
    const [colorBranchPass, setColorBranchPass] = useState("#1379ec");

    const [alertWarning, setAlertWarning] = useState<AlertNt>("hide");
    const [ dataSales, setDataSales ] = useState<RegularSalesRoleFragment[] | undefined>(undefined)

    const [dateBegin, setDateBegin] = useState(firstDayOfMonth);
    const [dateEnd, setDateEnd] = useState(lastDayOfMonth);

    const [{ data: me }] = useMeQuery();

    const [{ data: salesRole, fetching }] = useSalesRolesQuery();

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

    const userHandleBtn = () => {
        if (me?.me?.position.includes("GM")) {
            history.push("/sales-report/role-manage")
        } else {
            return setAlertWarning("show");
        }
        history.push("/sales-report/role-manage")
    };

    useEffect(() => {
        if (!me?.me || !salesRole?.salesRoles) return

        const response = salesRole.salesRoles.map(item => item.userId)
        const meId = me.me.id
        if (response.includes(meId)) {
            setUserIsSales(false)
        }

        const result = salesRole.salesRoles.filter((val) => val.branch === branch)
        setDataSales(result)

        if (branch === "ชลบุรี") {
            setColorBranchPass("#0AB68B");
        } else {
            setColorBranchPass("#1379ec");
        }
    }, [branch, me, salesRole]);

    return (
        <Flex
            flexDir={["column", "column", "column", "column", "row"]}
            overflowY="auto"
            px="5"
            h="96vh"
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
                {(fetching) ? (
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
                            {dataSales &&
                                dataSales
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
                                                        // src="https://bit.ly/sage-adebayo"
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

                        <Flex justifyContent="space-between">
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
                            <Flex>
                                <Button
                                    disabled={userIsSales}
                                    leftIcon={<EditIcon />}
                                    colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "teal"}
                                    variant='outline'
                                    onClick={() => history.push("/sales-report/visit-create")}
                                >
                                    บันทึกการเข้าพบลูกค้า
                                </Button>
                                {(me?.me?.position.includes("GM") 
                                    || me?.me?.position.includes("หัวหน้างาน")) 
                                    && (
                                        <Button
                                            ml="2"
                                            leftIcon={<ViewIcon />}
                                            variant='outline'
                                            colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "teal"}
                                            onClick={() => history.push("/sales-report-leader")}
                                        >
                                            Channel
                                        </Button>
                                    )   
                                }
                                <Button
                                    ml="2"
                                    leftIcon={<SettingsIcon />}
                                    variant='outline'
                                    colorScheme={branch === "ลาดกระบัง" ? "linkedin" : "teal"}
                                    onClick={userHandleBtn}
                                >
                                    Sales Role
                                </Button>
                            </Flex>
                        </Flex>
                        <SalesTimestamp
                            branch={branch}
                            colorBranchPass={colorBranchPass} 
                            dateBegin={dateBegin}
                            dateEnd={dateEnd}
                        />
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default SalesReport;

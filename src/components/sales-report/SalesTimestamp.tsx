import React, { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/react";

import { Branch, initialRoleJsr, initialRoleCdc } from '../../utils/helpers';
import { RoleThisMonth, RoleJsr, RoleCdc, ThisMonth } from '../../types'

import { useVisitsQuery, RegularSalesVisitFragment } from '../../generated/graphql'

interface Props {
    branch: Branch
    colorBranchPass: string
}

const SalesTimestamp: React.FC<Props> = ({ branch, colorBranchPass}) => {
    const [visitByRoleJsr, setVisitByRoleJsr] = useState<RoleThisMonth[]>([])

    let headByDay = []

    const dt = new Date();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < daysInMonth; i++) {
        headByDay.push(i + 1)
    }

    const [{ data, fetching }] = useVisitsQuery({
        variables: {
            dateBegin: "2022-05-01",
            dateEnd: "2022-05-31"
        }
    })

    useEffect(() => {
        if (!data?.visits) return

        const filterBranch = data.visits.filter(value => value.branch === branch)

        let updatedRoleJsr: any = {}
        let countsVisitByDate: RoleThisMonth[] = []

        if (branch === "ลาดกระบัง") {
            Object.keys(initialRoleJsr).forEach(roleJsr => {
                const role = roleJsr as RoleJsr
    
                updatedRoleJsr[role] = filterBranch.filter(value => value.saleRole.salesRole === role)
    
                const dataForFilter = updatedRoleJsr[role] as RegularSalesVisitFragment[]
    
                let thisMonth: ThisMonth[] = []

                for (let i = 0; i < daysInMonth; i++) {
                    const response = dataForFilter.some(value => {
                        const created = new Date(+value.createdAt)
                        return created.getDate() === i + 1
                    })

                    thisMonth.push({
                        date: i + 1,
                        result: response
                    })
                }
    
                const response = { role: role, thisMonth }
                countsVisitByDate.push(response)
            })
        } else {
            Object.keys(initialRoleCdc).forEach(roleCdc => {
                const role = roleCdc.replace("sale","sale-") as RoleCdc
    
                updatedRoleJsr[role] = filterBranch.filter(value => value.saleRole.salesRole === role)
    
                const dataForFilter = updatedRoleJsr[role] as RegularSalesVisitFragment[]
    
                let thisMonth: ThisMonth[] = []
    
                for (let i = 0; i < daysInMonth; i++) {
                    const response = dataForFilter.some(value => {
                        const created = new Date(+value.createdAt)
                        return created.getDate() === i + 1
                    })

                    thisMonth.push({
                        date: i + 1,
                        result: response
                    })
                }
    
                const response = { role: role, thisMonth }
                countsVisitByDate.push(response)
            })
        }

        setVisitByRoleJsr(countsVisitByDate)

    }, [data, branch, daysInMonth])

    return (
        <Flex
            flexDir="column"
            mr="5"
            mt="3"
        >
            {fetching ? (
                <div>
                    <p>Loading...</p>
                </div>
            ) : (
                <table className='table-timestamp'>
                    <thead>
                        <tr style={{ backgroundColor: colorBranchPass}}>
                            <td>Sales</td>
                            {headByDay.map((item, i) => (
                                <td key={i}>{item}</td>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {visitByRoleJsr.map((item, i) => (
                            <tr key={i}>
                                <td>{item.role}</td>
                                {item.thisMonth.map(month => (
                                    <td 
                                        key={month.date} 
                                        style={month.result ? { color: colorBranchPass} : undefined }
                                    >
                                        {month.result ? (
                                            <i className="bi bi-check-square"></i>
                                            ) : (
                                            <i className="bi bi-square"></i>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Flex>
    )
}

export default SalesTimestamp
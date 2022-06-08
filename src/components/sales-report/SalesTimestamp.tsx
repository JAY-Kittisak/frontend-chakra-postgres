import React, { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons'

import { Branch, initialRoleJsr, initialRoleCdc, countDayInMonth } from '../../utils/helpers';
import { RoleThisMonth, RoleJsr, RoleCdc, ThisMonth } from '../../types'

import { useVisitsQuery, RegularSalesVisitFragment } from '../../generated/graphql'

interface Props {
    branch: Branch
    colorBranchPass: string
    dateBegin: string
    dateEnd: string
}

const SalesTimestamp: React.FC<Props> = ({ branch, colorBranchPass, dateBegin, dateEnd}) => {
    const [visitByRoleJsr, setVisitByRoleJsr] = useState<RoleThisMonth[]>([])

    let headByDay = []

    for (let i = 0; i < countDayInMonth; i++) {
        headByDay.push(i + 1)
    }

    const [{ data, fetching }] = useVisitsQuery({
        variables: {
            dateBegin,
            dateEnd
        }
    })

    useEffect(() => {
        if (!data?.visits) return

        const filterBranch = data.visits.filter(value => value.saleRole.branch === branch)

        let updatedRoleJsr: any = {}
        let countsVisitByDate: RoleThisMonth[] = []

        if (branch === "ลาดกระบัง") {
            Object.keys(initialRoleJsr).forEach(roleJsr => {
                const role = roleJsr as RoleJsr
    
                updatedRoleJsr[role] = filterBranch.filter(value => value.saleRole.salesRole === role)
    
                const dataForFilter = updatedRoleJsr[role] as RegularSalesVisitFragment[]
    
                let thisMonth: ThisMonth[] = []

                for (let i = 0; i < countDayInMonth; i++) {
                    const filterDate = dataForFilter.filter(value => {
                        const created = new Date(+value.createdAt)
                        return created.getDate() === i + 1
                    })
                    
                    if (filterDate.length > 0) {
                        const response = filterDate.map(val => {
                            const createdAt = new Date(+val.createdAt)
                            const visitDate = new Date(val.visitDate)

                            return createdAt.getDate() === visitDate.getDate()
                        })

                        const result = response.includes(true)

                        thisMonth.push({
                            date: i + 1,
                            result: result ? 'green' : '#ff8c00'
                        })
                    } else {
                        thisMonth.push({
                            date: i + 1,
                            result: 'black'
                        })
                    }
                }

                countsVisitByDate.push({ role: role, thisMonth })
            })
        } else {
            Object.keys(initialRoleCdc).forEach(roleCdc => {
                const role = roleCdc.replace("sale","sale-") as RoleCdc
    
                updatedRoleJsr[role] = filterBranch.filter(value => value.saleRole.salesRole === role)
    
                const dataForFilter = updatedRoleJsr[role] as RegularSalesVisitFragment[]
    
                let thisMonth: ThisMonth[] = []
    
                for (let i = 0; i < countDayInMonth; i++) {
                    const filterDate = dataForFilter.filter(value => {
                        const created = new Date(+value.createdAt)
                        return created.getDate() === i + 1
                    })
                    
                    if (filterDate.length > 0) {
                        const response = filterDate.map(val => {
                            const createdAt = new Date(+val.createdAt)
                            const visitDate = new Date(val.visitDate)

                            return createdAt.getDate() === visitDate.getDate()
                        })

                        const result = response.includes(true)

                        thisMonth.push({
                            date: i + 1,
                            result: result ? 'green' : '#ff8c00'
                        })
                    } else {
                        thisMonth.push({
                            date: i + 1,
                            result: 'black'
                        })
                    }
                }
    
                countsVisitByDate.push({ role: role, thisMonth })
            })
        }

        setVisitByRoleJsr(countsVisitByDate)

    }, [data, branch])

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
                                    >
                                        {month.result !== "black"  && (
                                            <CheckIcon color={month.result} />
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
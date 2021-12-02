import React from 'react'
import { useIsAuth } from '../utils/uselsAuth';

interface Props { }

const SalesRoleManage: React.FC<Props> = () => {
    useIsAuth();

    return (
        <div>SalesRoleManage</div>
    )
}

export default SalesRoleManage
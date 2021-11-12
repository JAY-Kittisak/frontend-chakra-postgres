import React from 'react'
import { useIsAuth } from '../utils/uselsAuth'

interface Props { }

const ResellCreateStep2: React.FC<Props> = () => {
    useIsAuth()

    return (
        <div>ResellCreateStep2</div>
    )
}

export default ResellCreateStep2
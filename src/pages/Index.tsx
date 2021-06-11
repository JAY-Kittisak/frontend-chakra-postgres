import React from 'react'
import { ColorModeSwitcher } from "../ColorModeSwitcher"

import NavBar from '../components/NavBar'

interface Props { }

const index: React.FC<Props> = () => {
    return (
        <>
            <NavBar />
            <ColorModeSwitcher justifySelf="flex-end" />
            <h1>Hello World!!!</h1>
        </>
    )
}

export default index
import React from 'react'

import NavBar from '../components/NavBar'
import PagePost from './PagePost'

interface Props { }

const index: React.FC<Props> = () => {

    return (
        <>
            <NavBar />
            <PagePost />
        </>
    )
}

export default index
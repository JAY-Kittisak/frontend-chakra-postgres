import React from 'react'

import PagePost from './PagePost'
import NavBar from '../components/NavBar'

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
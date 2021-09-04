import React, { useState } from 'react'
import Wrapper, { WrapperVariant } from './Wrapper'
import NavBar from './NavBar'
import SideMenu from "./SideMenu"

interface Props {
    variant?: WrapperVariant
}

const Layout: React.FC<Props> = ({ children, variant }) => {
    const [inactive, setInactive] = useState(true)
    return (
        <>
            <SideMenu onCollapse={(inactive) => {
                setInactive(inactive)
            }} />

            <div className={`container ${inactive ? "inactive" : ""}`}>
                <NavBar />
            </div>

            {/* <Flex
                h="100vh"
                flexDir="row"
                overflow="hidden"
                maxW="2000px"
            > */}
            {/* Column 1 */}
            {/* <Flex
                    w="15%"
                    flexDir="column"
                    alignItems="center"
                    backgroundColor="#028174"
                    color="#fff"
                >

                </Flex> */}

            {/* Column 2 */}
            {/* <Flex
                    w="85%"
                    flexDir="column"
                    alignItems="center"
                > */}
            <Wrapper variant={variant}>
                <div className={`container ${inactive ? "inactive" : ""}`}>
                {children}
                </div>
            </Wrapper>
            {/* </Flex>
            </Flex> */}
        </>
    )
}

export default Layout
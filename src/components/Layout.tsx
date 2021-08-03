import React from 'react'
import Wrapper, { WrapperVariant } from './Wrapper'
import NavBar from './NavBar'

interface Props {
    variant?: WrapperVariant
}

const Layout: React.FC<Props> = ({ children, variant }) => {
    return (
        <>
            <NavBar />

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
                {children}
            </Wrapper>
            {/* </Flex>
            </Flex> */}
        </>
    )
}

export default Layout
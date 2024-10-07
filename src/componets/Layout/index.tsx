import { ReactNode } from 'react'
import Navbar from '../Navbar'
import {Box, Center} from '@mantine/core'

interface Props {
    children: ReactNode
}

function Layout({children}:Props) {
  return (
  <Box>
    <header>PWA Test</header>
    <Navbar />
    <Center>
        {children}
    </Center>
  </Box>
  )
}

export default Layout
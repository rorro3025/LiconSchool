import Layout from "@/componets/Layout"
import { useDisclosure } from "@mantine/hooks"
import { Modal, Button, Box, Input } from '@mantine/core'
import { FormEvent } from "react"

function Home() {
  const [opened, { open, close }] = useDisclosure()

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => e.preventDefault()

  return (
    <Layout>
      <Box>
        <Button onClick={open} >Login</Button>
      </Box>

      <Modal opened={opened} onClose={close} title='Login'>
        <Box>
          <form onSubmit={handleSubmit}>
            <Input placeholder="username" type="text" m={12}/>
            <Input placeholder="password" type="password" m={12}/>
            <Button type="submit" m={12} >Log</Button>
          </form>
        </Box>
      </Modal>

    </Layout>
  )
}

export default Home
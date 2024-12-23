import { useEffect, useState } from "react"
import Layout from "@/componets/Layout"
import { useDisclosure } from "@mantine/hooks"
import { Modal, Button, Box, Input } from '@mantine/core'
import { FormEvent } from "react"
import { getData, saveIntoDB } from '@/utils/db'

function Home() {
  const [httpResponse, setHTTResponse] = useState(null)
  const [opened, { open, close }] = useDisclosure()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault()

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = await getData('1')
      if (cachedData) {
        console.log('loaded from cache', cachedData)
        setHTTResponse(cachedData)
      } else {
        try {
          const response = await fetch('https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary')
          const data = await response.json()
          console.log(data)
          setHTTResponse(data)
          await saveIntoDB('1', data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }

        fetchData().then(r => console.log(r))
      }

    }


  }, [])

  return (
    <Layout>
      <Box m={3}>
        <Button onClick={open} >Login</Button>
      </Box>

      <Modal opened={opened} onClose={close} title='Login'>
        <Box>
          <form onSubmit={handleSubmit}>
            <Input placeholder="username" type="text" m={12} />
            <Input placeholder="password" type="password" m={12} />
            <Button type="submit" m={12} >Log</Button>
          </form>
        </Box>
      </Modal>

      <Box>
        <p>offline data</p>
        <pre>
          {JSON.stringify(httpResponse, null, 2)}
        </pre>
      </Box>
    </Layout>
  )
}

export default Home
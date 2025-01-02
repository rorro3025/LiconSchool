import { mutate } from 'swr'
import { Container, Box, Input, Button, Select } from "@mantine/core";
import Layout from "@/componets/Layout";
import { FormEvent, useState } from "react";
import AccountsList from "@/componets/AccountsList";

export default function Pokemon() {

  const [message, setMessage] = useState('')
  const [data, setData] = useState({
    name: '',
    nature: '',
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/prisma/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result)
      await mutate('/api/prisma/accounts')
      setMessage('Account created1')
    } catch (err) {
      console.error(err);
      setMessage('Error creating account')
    }

  }
  return (
    <Layout>
      <h1>Postgrest test</h1>
      <AccountsList />
      <Container p={10}>
        <Box mt={12}>
          <form onSubmit={handleSubmit}>
            <Input placeholder="name" type="text" m={12} onChange={({ target }) => setData({ ...data, name: target.value })} value={data.name} />
            <Select m={12} placeholder="nature" name='nature' onChange={(value) => setData({ ...data, nature: value || '' })} value={data.nature} data={['1', '2']} />
            <Button type="submit" m={12}>
              save
            </Button>
          </form>
          <p>{message}</p>
        </Box>
      </Container>
    </Layout>
  );
}

import { Button, Box, Grid } from '@mantine/core'
import Layout from '@/componets/Layout'
import { makeHTTPRequest } from '@/utils'
import GenTable from '@/componets/GenTable'
import { useState } from 'react'

const headers = ['idUser', 'email', 'created_at', 'updated_at', 'name']

export default function Sql() {
    const [rows, setRows] = useState([])
    const handleClick = async () => {
        const response = await makeHTTPRequest('api/users', {
            method: 'GET',
        })
        if (!response.success) {
            console.log(response.message)
            return
        }
        setRows(response.data)
    }
    return (
        <Layout>
            <Grid>
                <Grid.Col span={'auto'}>
                    <h1>SQL</h1>
                </Grid.Col>
                <Grid.Col span={6}>
                </Grid.Col >
                <Grid.Col span={'auto'}>
                    <Button onClick={handleClick}>
                        Click me
                    </Button>
                </Grid.Col>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <GenTable headers={headers} rows={rows} />
            </div>
        </Layout>
    )
}
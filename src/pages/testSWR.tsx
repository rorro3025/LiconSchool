import Layout from "@/componets/Layout";
import { Box, Skeleton, Button, Grid } from '@mantine/core'
import AllTable from "@/componets/AllTable";
import swr from 'swr'
import { swrFetcher, useBoolean } from "@/utils";
import FormModal from "@/componets/FormModal";
import { useState } from "react";

const headers = [
    'UUID',
    'Type',
    'Description',
    'Actions'
];


export default function TestSWR() {
    //const uri = 'http://localhost:3000/api/dynamo/BI/glossary/termOwners'
    const uri = 'https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary'
    const [isAddFormOpen, setIsAddFormOpen] = useState(false) 
    const { data: response, error, isLoading } = swr(uri, swrFetcher)


    return (
        <Layout>
            <Box style={{ width: '80%' }}>
                <Grid>
                    <Grid.Col span={'auto'}>
                        <h1>Test SWR</h1>
                    </Grid.Col>
                    <Grid.Col span={6}></Grid.Col>
                    <Grid.Col span={'auto'} style={{ alignItems: 'center', justifyItems: 'center' }}>
                        <Button variant="filled" color="grape" onClick={()=>setIsAddFormOpen(true)}>New</Button>
                    </Grid.Col>
                </Grid>
                {
                    isLoading && <div>
                        <Skeleton height={'100%'} />
                        <Skeleton height={'100%'} />
                        <Skeleton height={'100%'} />
                    </div>
                }
                {error && response && <p>{String(response)}</p>}
                {!isLoading && response && response.data && <AllTable headers={headers} rows={response.data} />}
                <FormModal opened={isAddFormOpen} close={()=>setIsAddFormOpen(false)} editData={null}/>
            </Box>
        </Layout>
    )
}
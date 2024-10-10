import Layout from "@/componets/Layout";
import { useStore } from "@/store/owners.slice";
import { useEffect } from "react";
import AllTable from "@/componets/AllTable";
import { Grid, GridCol, Button, Box } from "@mantine/core";
import FormModal from "@/componets/FormModalV2";
import { useBoolean } from "@/utils";

export default function TestZustand() {
    const getAll = useStore((state) => state.fetch)
    const termOwnerList = useStore((state) => state.termOwnerList)
    const isModalOpen = useBoolean()

    useEffect(() => {
        getAll().catch(err=>console.log(err))
    }, [getAll])

    const headers = [
        'UUID',
        "Type",
        "Description",
        "Ultima fecha de actualizacion",
        "Actions"
    ]

    return (
        <Layout>
            <Box style={{ width: '80%' }}>
                <Grid>
                    <GridCol span={'auto'}>
                        <h1>Test Zustand</h1>
                    </GridCol>
                    <GridCol span={6}></GridCol>
                    <GridCol span={'auto'}>
                        <Button color="violet" onClick={()=>isModalOpen.setTrue()}>Add</Button>
                    </GridCol>
                </Grid>

                {
                    !termOwnerList && <h3>Fallo</h3>
                }
                {
                    termOwnerList && termOwnerList.length === 0 && <p>No hay datos</p>
                }
                {
                    termOwnerList && termOwnerList.length > 0 && <AllTable rows={termOwnerList} headers={headers} />
                }
            </Box>
            <FormModal  opened={isModalOpen.value} close={isModalOpen.setFalse} editData={null}/>
        </Layout>
    )
}



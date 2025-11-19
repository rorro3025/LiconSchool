import { Table, Button, Alert } from '@mantine/core'
import { useState } from 'react'
import { EditTermOwnerI } from '@/interfaces';
import { Modal } from '@mantine/core';
import { useBoolean } from '@/utils';
import FormModal from '../FormModal';
import { makeHTTPRequest } from '@/utils';
import { useStore } from '@/store/owners.slice';

interface Props {
    headers: string[];
    rows: EditTermOwnerI[];
}

export default function AllTable({ rows, headers }: Props) {
    const [editData, setEditData] = useState<EditTermOwnerI | null>(null)
    const [deleteUUID, setDeleteUUID] = useState<null | string>(null)
    const isModalDeleteOpen = useBoolean()
    const isModalEditOpen = useBoolean()
    const isDeleting = useBoolean()
    //const {setTermOwnerList, termOwnerList} = useStore((state)=> state)

    const handleEdit = (data: EditTermOwnerI) => {
        setEditData(data)
        isModalEditOpen.setTrue()
    }

    const sendDeleteRequest = async () => {
        /*
        isDeleting.setTrue()
        const res = await makeHTTPRequest(`https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary/${deleteUUID}`, {
            method: 'DELETE',
        })
        
        isDeleting.setFalse()
        */
        setDeleteUUID(null)
        isModalDeleteOpen.setFalse()
    }


    return (
        <div>
            <Table striped withRowBorders withColumnBorders highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        {
                            headers.map((header, index) => (
                                <Table.Th key={index}>{header}</Table.Th>
                            ))
                        }
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows.sort((a, b) => {
                        const uuid1 = Number(a.uuid.slice(2))
                        const uuid2 = Number(b.uuid.slice(2))
                        if (uuid1 < uuid2) return -1
                        if (uuid1 > uuid2) return 1
                        return 0
                    }).map((row, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{row.uuid}</Table.Td>
                            <Table.Td>{row.type}</Table.Td>
                            <Table.Td>{row.description}</Table.Td>
                            <Table.Td>{row.updatedAt}</Table.Td>
                            <Table.Td style={{ justifyContent: 'space-around', display: 'flex' }}>
                                <Button color='red' onClick={() => { setDeleteUUID(row.uuid); isModalDeleteOpen.setTrue() }}>Eliminar</Button>
                                <Button color='black' onClick={()=> handleEdit(row)}>Editar</Button>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <FormModal opened={isModalEditOpen.value} close={isModalEditOpen.setFalse} editData={editData}/>
            <Modal title='Are you sure?' opened={isModalDeleteOpen.value && deleteUUID !== null} onClose={isModalDeleteOpen.setFalse}>
                <p>Are you sure you want to delete this item {deleteUUID}?</p>
                <div style={{display:'flex', justifyContent: 'space-around'}}>
                        <Button onClick={()=> isModalDeleteOpen.setFalse()} color='red'>Cancelar</Button>
                        <Button loading={isDeleting.value} onClick={sendDeleteRequest}>Aceptar</Button>
                </div>
            </Modal>
        </div>
    )
}
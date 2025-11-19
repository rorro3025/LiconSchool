import { Table, Button } from "@mantine/core";

interface Props {
    headers: string[]
    rows: { [keyName: string]: string | number }[]
}
/*
sort((a, b) => {
                        const uuid1 = Number(a.uuid.slice(2))
                        const uuid2 = Number(b.uuid.slice(2))
                        if (uuid1 < uuid2) return -1
                        if (uuid1 > uuid2) return 1
                        return 0
                    }).
                    */

export default function GenTable({ headers, rows }: Props) {
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
                    {rows.map((row, index) => (
                        <Table.Tr key={index}>
                            {
                                Object.keys(row).map((key, ix) => (
                                    <Table.Td key={ix}>{key === 'created_at' || key === 'updated_at' ? new Date(row[key]).toLocaleDateString('es-MX'): row[key]}</Table.Td>
                                ))
                            }
                            {
                                /*
                                <Table.Td style={{ justifyContent: 'space-around', display: 'flex' }}>
                                    <Button color='red' onClick={() => { setDeleteUUID(row.uuid); isModalDeleteOpen.setTrue() }}>Eliminar</Button>
                                    <Button color='black' onClick={() => {setEditData(row);isModalEditOpen.setTrue()}}>Editar</Button>
                                </Table.Td>
                                */
                            }
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    )
}
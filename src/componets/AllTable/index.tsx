import { Table, Button } from '@mantine/core'

interface Props {
    headers: string[];
    rows: {
        uuid: string
        type: string;
        description: string;
    }[];
}

export default function AllTable({ rows, headers }: Props) {
    return (
        <Table>
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
                        <Table.Td>{row.uuid}</Table.Td>
                        <Table.Td>{row.type}</Table.Td>
                        <Table.Td>{row.description}</Table.Td>
                    <Table.Td style={{justifyContent: 'space-around', display:'flex'}}>
                        <Button onClick={()=>alert(`Eliminar ${row.uuid}`)}>Eliminar</Button>
                        <Button onClick={()=>alert(`Editar ${row.uuid}`)}>Editar</Button>
                    </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>


        </Table>


    )
}
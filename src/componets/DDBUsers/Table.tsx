import { Table, Container } from '@mantine/core'

export default function UTable() {

    return (
        <Container>
            <Table striped stickyHeader stickyHeaderOffset={60}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            Name
                        </Table.Th>
                        <Table.Th>
                            Role
                        </Table.Th>
                        <Table.Th>
                            CreatedAt
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
            </Table>
        </Container>
    )
}
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { Box, Container, Loader, Skeleton, List, ThemeIcon, rem } from '@mantine/core'
import useSWR from 'swr/immutable';
import { swrFetcher } from '@/utils';

export default function AccountsList() {
    const { data, isLoading, error } = useSWR<{ id: number, name: string, nature: number }[]>("/api/prisma/accounts", swrFetcher);

    const natureDC = {
        1: "Pacivo",
        2: "Activo",
    }
    return (
        <Container>
            {
                isLoading && <><Skeleton /><Skeleton /><Skeleton /></>
            }
            {
                !isLoading && error && <div>{error}</div>
            }
            {
                !isLoading && data && (
                    <Box>
                        <List
                            spacing={'xs'}
                            size='md'
                            center
                            icon={
                                <ThemeIcon color='teal' size={24} radius='xl'>
                                    {isLoading ? <Loader size={rem(24)} /> : <IconCircleCheck size='1rem' />}
                                </ThemeIcon>
                            }
                        >
                            {data.map(account => (
                                <List.Item
                                    icon={account.nature === 2 ? <IconCircleDashed size='1rem' /> : <IconCircleCheck size='1rem' />}
                                    key={account.id}>{account.name}</List.Item>
                            ))}
                        </List>
                    </Box>
                )
            }
        </Container>
    )
}



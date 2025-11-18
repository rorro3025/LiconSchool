import {
    Container, Grid, SimpleGrid,
    Skeleton, Button, TextInput, PasswordInput, Alert
} from '@mantine/core'
import { FormEvent, useState } from 'react';
import { useStore } from '@/store/owners.slice';
import RegisterForm from '../RegiterForm/inde';

export function LoginForm() {
    const { setIsLogin, isLogin } = useStore((s) => s)
    const [loginForm, setLoginForm] = useState({ username: '', password: '' })
    //const [loading, { toggle }] = useDisclosure(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const PRIMARY_COL_HEIGHT = '600px';
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: loginForm.username,
                    password: loginForm.password
                })
            })
            const result = await res.json()
            if (!res.ok) {
                setError(result.message)
                return
            }

            setError(null)
            console.log(result)
            setIsLogin({ username: result.username, token: result.token })
        } catch (e) {
            console.log(e)
            setError('Invalid username or password')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container my={'md'}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                <Skeleton height={PRIMARY_COL_HEIGHT} radius='md' animate={true} />
                <Grid gutter={'md'}>
                    <Grid.Col>
                        <form onSubmit={handleLogin} style={{
                            width: '600px', height: '600px',
                            padding: "20px"
                        }}>
                            <TextInput disabled={isLoading} onChange={({ target }) => setLoginForm({ ...loginForm, username: target.value })} label="Username" placeholder="you@example.com" my={'md'} />
                            <PasswordInput disabled={isLoading} onChange={({ target }) => setLoginForm({ ...loginForm, password: target.value })} label="Password" placeholder="Your password" my={'md'} />
                            <Button type="submit" my={'md'} disabled={isLoading} >Login</Button>
                            <RegisterForm />
                        </form>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
            {
                error && (
                    <Alert title="Error" color="red" my={'md'}>
                        {error}
                    </Alert>
                )
            }
        </Container>
    );
}
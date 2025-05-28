import { useEffect, useState } from "react";
import Layout from "@/componets/Layout";
import { useDisclosure } from "@mantine/hooks";
import { Container, Button, Center, Modal, Box, Input, Stack } from "@mantine/core";
import { FormEvent } from "react";
import { getData, saveIntoDB } from "@/utils/db";
import NotificationToast from "@/componets/NotificationToast";
import Feedback from "@/componets/Feedback";
import { makeHTTPRequest } from "@/utils";

function Home() {
    const [httpResponse, setHTTResponse] = useState<Record<string, any> | null>(null);
    const [opened, { open, close }] = useDisclosure();

    const handleNotification = async () => {
        const cache = await caches.open('v1' + 'ar1')
        const response = await makeHTTPRequest('/api/journal?userId=1', { method: 'GET' })
        if (!response.success) return console.log(response.message)
        await cache.addAll(response.data)
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();
    const getServerData = async () => {
        try {
            const response = await makeHTTPRequest('/api/journal?userId=1', { method: 'GET' })
            if (!response.success) return console.log(response.message)
            setHTTResponse(response.data);
            await saveIntoDB("1", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const cachedData = await getData("1");
            if (cachedData) {
                console.log("loaded from cache", cachedData);
                setHTTResponse(cachedData);
            } else {
                getServerData().catch(null);
            }
        };
        fetchData().then((r) => console.log("fetch response", r));
    }, []);

    return (
        <Layout>
            <Stack gap="xl">
                <Center>
                    <Button onClick={open} m={2} p={2}>
                        Login
                    </Button>
                    <Button onClick={handleNotification} m={2} p={2}>
                        cache something
                    </Button>
                    <NotificationToast />
                </Center>

                <Modal opened={opened} onClose={close} title="Login">
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <Input placeholder="username" type="text" m={12} />
                            <Input placeholder="password" type="password" m={12} />
                            <Button type="submit" m={12}>
                                Log
                            </Button>
                        </form>
                    </Box>
                </Modal>

                <Container>
                    <Feedback />
                </Container>

                <Container>
                    <p>offline data</p>
                    <pre>{JSON.stringify(httpResponse)}</pre>
                </Container>
                <Container>
                    <p>offline data 2</p>
                    <pre>{JSON.stringify(httpResponse)}</pre>
                </Container>
            </Stack>
        </Layout>
    );
}

export default Home;

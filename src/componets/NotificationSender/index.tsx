import { useState } from 'react';
import { Button, TextInput, Group, Stack, Text } from '@mantine/core';

export default function NotificationSender() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Enviando notificaciones...');

        try {
            const response = await fetch('/api/push/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('Notificaciones enviadas con éxito');
                setTitle('');
                setBody('');
            } else {
                setStatus(`Error: ${data.error}`);
            }
        } catch (error) {
            setStatus('Error al enviar las notificaciones');
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap="md">
                <TextInput
                    required
                    label="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ingresa el título de la notificación"
                />
                <TextInput
                    required
                    label="Mensaje"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Ingresa el mensaje de la notificación"
                />
                <Group>
                    <Button type="submit">Enviar Notificación</Button>
                </Group>
                {status && (
                    <Text color={status.includes('Error') ? 'red' : 'green'}>
                        {status}
                    </Text>
                )}
            </Stack>
        </form>
    );
} 
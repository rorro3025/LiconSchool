import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Dialog, Group, Button, Text } from "@mantine/core";

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default function NotificationToast() {
    const [opened, { open, close }] = useDisclosure()
    const [notificationsAvailable, setNotificationsAvailable] = useState(false)
    const [isNotificationAllowed, setIsNotificationIsAllowed] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);

    const subscribeToNotifications = async () => {
        try {
            console.log('Iniciando proceso de suscripción...');

            const registration = await navigator.serviceWorker.ready;
            console.log('Service Worker listo:', registration);

            const existingSubscription = await registration.pushManager.getSubscription();
            console.log('Suscripción existente:', existingSubscription);

            if (existingSubscription) {
                console.log('Usando suscripción existente');
                setSubscription(existingSubscription);
                console.log('Enviando suscripción al servidor...');
                const response = await fetch('/api/push/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(existingSubscription)
                });

                const responseData = await response.json();
                console.log('Respuesta del servidor:', responseData);
                return;
            }

            const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            console.log('VAPID Public Key:', vapidPublicKey);

            if (!vapidPublicKey) {
                console.error('VAPID public key not found');
                return;
            }

            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
            console.log('VAPID Key convertida');

            console.log('Intentando suscribir...');
            const newSubscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });
            console.log('Nueva suscripción creada:', newSubscription);

            setSubscription(newSubscription);

            console.log('Enviando suscripción al servidor...');
            const response = await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSubscription)
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

        } catch (error) {
            console.error('Error detallado al suscribirse:', error);
        }
    };

    const showNotification = async () => {
        if (!notificationsAvailable) {
            console.log('Notificaciones no disponibles');
            return open();
        }

        if (Notification.permission === 'granted') {
            console.log('Permiso ya concedido');
            setIsNotificationIsAllowed(true);
            await subscribeToNotifications();
        } else {
            console.log('Solicitando permiso...');
            const permission = await Notification.requestPermission();
            console.log('Permiso resultado:', permission);

            if (permission === 'granted') {
                setIsNotificationIsAllowed(true);
                await subscribeToNotifications();
            } else {
                setIsNotificationIsAllowed(false);
                open();
            }
        }
    };

    useEffect(() => {
        if ('Notification' in window) {
            console.log('Notificaciones disponibles en el navegador');
            setNotificationsAvailable(true);

            // Verificar estado actual del permiso
            console.log('Estado actual del permiso:', Notification.permission);
        } else {
            console.log('Notificaciones NO disponibles en el navegador');
        }
    }, []);

    return (
        <>
            <Group>
                <Button
                    disabled={!notificationsAvailable}
                    color={isNotificationAllowed ? 'dark' : 'red'}
                    onClick={showNotification}
                >
                    {isNotificationAllowed ? 'Test notification' : 'Allow notifications'}
                </Button>
            </Group>
            <Dialog opened={opened} withCloseButton onClose={close} size={'lg'} radius={'md'}>
                <Text size={'sm'} mb={'xs'} fw={500}>
                    This browser does not allow push notifications
                </Text>
            </Dialog>
        </>
    );
}
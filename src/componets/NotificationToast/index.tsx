import {useState, useEffect} from "react";
import {useDisclosure} from "@mantine/hooks";
import {Dialog, Group, Button, Text} from "@mantine/core";

export default function NotificationToast() {
    const [opened, {open, close}] = useDisclosure()
    const [notificationsAvailable, setNotificationsAvailable] = useState(false)
    const [isNotificationAllowed, setIsNotificationIsAllowed] = useState(false)

    const showNotification = () => {
        if (!notificationsAvailable) return open()
        if (Notification.permission === 'granted') {
            setIsNotificationIsAllowed(true)
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification("new users created", {
                    body: "New user RHernandez was created",
                    data: "data",
                    icon: "/icon-maskable-192x192.png",
                }).catch(err => console.error(err))
            })
        } else {
            Notification.requestPermission().then((permission) => {
                if(permission === 'granted'){
                    setIsNotificationIsAllowed(true)
                    navigator.serviceWorker.ready.then((registration) => {
                        registration.showNotification("You have activate notifications", {
                            icon: "/icon-maskable-192x192.png",
                        }).catch(err => console.error(err))
                    })
                }else {
                    setIsNotificationIsAllowed(false)
                    open()
                }
            })
        }

    }

    useEffect(() => {
        if ('Notification' in window) setNotificationsAvailable(true)
    }, []);

    return (
        <>
            <Group>
                <Button disabled={!notificationsAvailable} color={isNotificationAllowed ? 'dark' : 'red'}
                        onClick={showNotification}>
                    {isNotificationAllowed ? 'Test notification' : 'Allow notifications'}
                </Button>
            </Group>
            <Dialog opened={opened} withCloseButton onClose={close} size={'lg'} radius={'md'}>
                <Text size={'sm'} mb={'xs'} fw={500}>
                    This browser does not allow push notifications
                </Text>
            </Dialog>
        </>
    )
}
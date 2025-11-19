import { useEffect, useState } from "react";
import { Alert } from '@mantine/core'
import { IconInfoCircleFilled } from '@tabler/icons-react'

export default function OfflineHeader() {
    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [])

    useEffect(() => {
        setIsOnline(navigator.onLine)
    }, [])


    return (
        <Alert style={{ height: "50px" }} icon={<IconInfoCircleFilled size={16} />} title={isOnline ? 'All good' : 'Offline mode'} color={isOnline ? "green" : "yellow"}></Alert>
    )
}

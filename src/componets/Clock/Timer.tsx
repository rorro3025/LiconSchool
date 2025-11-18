import { useEffect, useState } from 'react';

interface TimerProps {
    minutes: number;
}

export default function Timer({ minutes }: TimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

    useEffect(() => {
        setSecondsLeft(minutes * 60);
    }, [minutes]);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsLeft]);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const mm = pad(Math.floor(secondsLeft / 60));
    const ss = pad(secondsLeft % 60);

    return <span>{mm}:{ss}</span>;
}

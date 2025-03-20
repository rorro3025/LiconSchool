import { NextApiRequest, NextApiResponse } from 'next';
import webpush from 'web-push';

// Configurar las credenciales VAPID
webpush.setVapidDetails(
    process.env.VAPID_EMAIL || '',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

// Aquí deberías almacenar las suscripciones en una base de datos
export const subscriptions: PushSubscription[] = [];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const subscription = req.body;

            // Almacenar la suscripción (en producción, esto debería ir a una base de datos)
            subscriptions.push(subscription);

            // Enviar una notificación de prueba
            const payload = JSON.stringify({
                title: '¡Suscripción exitosa!',
                body: 'Ahora recibirás notificaciones push.',
            });

            await webpush.sendNotification(subscription, payload);

            res.status(201).json({ message: 'Subscription added successfully' });
        } catch (error) {
            console.error('Error handling push subscription:', error);
            res.status(500).json({ error: 'Error handling subscription' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 
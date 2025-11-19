import { NextApiRequest, NextApiResponse } from 'next';
import webpush from 'web-push';

// Configurar las credenciales VAPID
webpush.setVapidDetails(
    process.env.VAPID_EMAIL || '',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

// Importar las suscripciones (en producción, esto vendría de una base de datos)
import { subscriptions } from './subscribe';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { title, body, icon = '/icon-192x192.png' } = req.body;

            if (!title || !body) {
                return res.status(400).json({
                    error: 'Se requieren los campos title y body'
                });
            }

            const payload = JSON.stringify({
                title,
                body,
                icon,
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: '1'
                }
            });

            // Array para almacenar las promesas de envío
            const notifications = [];

            // Enviar a cada suscriptor
            for (const subscription of subscriptions) {
                try {
                    const pushPromise = webpush.sendNotification(subscription as any, payload);
                    notifications.push(pushPromise);
                } catch (error) {
                    console.error('Error enviando notificación:', error);
                }
            }

            // Esperar a que todas las notificaciones se envíen
            await Promise.all(notifications);

            res.status(200).json({
                message: `Notificaciones enviadas a ${notifications.length} suscriptores`
            });
        } catch (error) {
            console.error('Error al enviar notificaciones push:', error);
            res.status(500).json({
                error: 'Error al enviar notificaciones push'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 
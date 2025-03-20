const webpush = require('web-push');

// Genera las claves VAPID
const vapidKeys = webpush.generateVAPIDKeys();

console.log('Clave pública VAPID:');
console.log(vapidKeys.publicKey);
console.log('\nClave privada VAPID:');
console.log(vapidKeys.privateKey); 


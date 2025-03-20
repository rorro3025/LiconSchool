import { useEffect } from "react";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        if (!('serviceWorker' in navigator)) {
          console.warn('Service Worker no soportado en este navegador');
          return;
        }

        console.log('Registrando Service Worker...');
        const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        console.log('Service Worker registrado con éxito:', registration);

        // Verificar si hay una actualización disponible
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Nueva versión del Service Worker encontrada:', newWorker);

          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              console.log('Estado del nuevo Service Worker:', newWorker.state);
            });
          }
        });

        // Verificar si ya hay un Service Worker activo
        if (registration.active) {
          console.log('Service Worker activo:', registration.active.state);
        }

      } catch (error) {
        console.error('Error al registrar el Service Worker:', error);
      }
    };

    registerServiceWorker();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

import { useEffect } from "react";
import '@mantine/core/styles.css'
import type { AppProps } from "next/app";
import { Workbox } from "workbox-window";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      console.warn("PWA support is diabled");
      return;
    }
    const wb = new Workbox("sw.js", { scope: "/" });
    wb.register();
  }, []);

  return <MantineProvider theme={theme}>
    <Component {...pageProps} />
  </MantineProvider>;
}

import { ReactNode } from "react";
import Navbar from "../Navbar";
import { Grid } from "@mantine/core";
import OfflineHeader from "../OfflineHeader";
import Head from 'next/head'

interface Props {
  children: ReactNode;
  title?: string
}

//

function Layout({ children, title }: Props) {
  return (
    <Grid>
      <Head>
        <title>{title || 'LiconSchool'}</title>
        <meta name="description" content="An offline first app using Next.js and Mantine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid.Col>
        <Navbar />
        <Grid>
          <Grid.Col span={12} style={{ padding: "20px" }}>
            <OfflineHeader />
            {children}
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}

export default Layout;

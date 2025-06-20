import { ReactNode } from "react";
import Navbar from "../Navbar";
import { Grid } from "@mantine/core";
import OfflineHeader from "../OfflineHeader";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <OfflineHeader />
      <Grid >
        <Grid.Col span={1}>
          <Navbar />
        </Grid.Col >
        <Grid.Col>
          {children}
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Layout;

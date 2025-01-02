import { ReactNode } from "react";
import Navbar from "../Navbar";
import { Box, Center, Container } from "@mantine/core";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container px={3} py={4}>
        {children}
      </Container>
    </>
  );
}

export default Layout;

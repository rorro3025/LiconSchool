import { useEffect, useState } from "react";
import Layout from "@/componets/Layout";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Box, Input } from "@mantine/core";
import { FormEvent } from "react";
import { getData, saveIntoDB } from "@/utils/db";

function Home() {
  const [httpResponse, setHTTResponse] = useState(null);
  const [opened, { open, close }] = useDisclosure();

  const handleNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Hello world!");
    } else {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification("new users created", {
            body: "New user RHernanez was created",
            data: "data",
            icon: "/favicon.ico",
          });
        }
      });
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();
  const getServerData = async () => {
    try {
      const response = await fetch(
        "https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary"
      );
      const data = await response.json();
      console.log(data);
      setHTTResponse(data);
      await saveIntoDB("1", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = await getData("1");
      if (cachedData) {
        console.log("loaded from cache", cachedData);
        setHTTResponse(cachedData);
      } else {
        getServerData();
      }
    };
    fetchData().then((r) => console.log("fetch response", r));
  }, []);

  return (
    <Layout>
      <Box m={3}>
        <Button onClick={open}>Login</Button>
      </Box>

      <Modal opened={opened} onClose={close} title="Login">
        <Box>
          <form onSubmit={handleSubmit}>
            <Input placeholder="username" type="text" m={12} />
            <Input placeholder="password" type="password" m={12} />
            <Button type="submit" m={12}>
              Log
            </Button>
          </form>
        </Box>
      </Modal>

      <Box>
        <Button onClick={handleNotification}>notification</Button>
      </Box>
      <Box>
        <p>offline data</p>
        <pre>{JSON.stringify(httpResponse, null, 2)}</pre>
      </Box>
    </Layout>
  );
}

export default Home;

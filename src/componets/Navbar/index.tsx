import { useDisclosure } from "@mantine/hooks";
import { Burger, NavLink, Box, Button } from "@mantine/core";
import { IconHomeBitcoin } from "@tabler/icons-react";
import { useStore } from "@/store/owners.slice";
import { useRef, useEffect } from 'react'

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure();
  const { setIsLogin, isLogin } = useStore((context) => context)
  const counter = useRef(0)

  const sendCoord = async (lat: number, lgn: number) => {
    try {
      const response = await fetch('/api/aws/location', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ lat, lgn })
      })
      if (response.ok) {
        const { message } = await response.json()
        return console.warn(response.status, message)
      }
      counter.current++
      console.log('location sent', counter)
    } catch (e) {
      console.log('erro', e)
    }
  }

  const handleLocation = async () => {
    if (!("geolocation" in navigator)) return console.warn('No location avaliable')

    const id = navigator.geolocation.watchPosition(async (pos) => {
      const { coords } = pos
      await sendCoord(coords.latitude, coords.longitude)
    }, (err) => {
      console.log(`${err.code} and ${err.message}`)
    }, {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 0
    })
    //console.log('the location id is', id)
  }

  const handleSingout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      if (!response.ok) {
        return alert(response)
      }
      setIsLogin(null)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    handleLocation()
  })

  return (
    <div style={{ position: "fixed", zIndex: '10', left: 5 }}>
      <Burger
        opened={opened}
        onClick={toggle}
        aria-label="Toggle navigation"
        size={"sm"}
      />
      <Box
        style={{
          width: "200px",
          backgroundColor: "white",
          display: opened ? "flow" : "none",
        }}
      >
        <NavLink
          href="/"
          label={isLogin ? isLogin.username : 'Icon'}
          leftSection={<IconHomeBitcoin size="1rem" stroke={1.5} />}
        />
        <NavLink href="/Calendar" label={"Google Calendar"} />
        <NavLink href={"/sql"} label={"sql"} />
        <NavLink href={"/files"} label={"files"} />
        <NavLink href={"/libreApi"} label={"libre list"} />
        <NavLink href={"/time"} label={"User active"} />
        <NavLink href={"/testSWR"} label={"SWR"} />
        <NavLink href={"/testZustand"} label={"Zustand"} />
        <NavLink href={"/httpClient"} label={"MapLibre"} />
        <Button variant="gradient" onClick={handleSingout}>Cerrar session</Button>
      </Box>
    </div>
  );
}

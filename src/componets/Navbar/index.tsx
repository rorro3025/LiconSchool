import { useDisclosure } from '@mantine/hooks';
import { Burger, NavLink, Box } from '@mantine/core';
import { IconHomeBitcoin } from '@tabler/icons-react'

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <div>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" size={'sm'} />
      <Box style={{
        width: "200px",
        display: opened ? 'flow' : 'none'
      }}>
        <NavLink
          href="/"
          label="With icon"
          leftSection={<IconHomeBitcoin size="1rem" stroke={1.5} />}
        />
        <NavLink href={"/files"} label={'files'} />
        <NavLink href={"/pokemon"} label={'Pokemon'} />
        <NavLink href={"/time"} label={'User active'} />
        <NavLink href={"/testSWR"} label={'SWR'} />
        <NavLink href={"/testZustand"} label={'Zustand'} />
      </Box>
    </div>

  );
}

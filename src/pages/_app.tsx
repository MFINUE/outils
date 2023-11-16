import '@/styles/globals.css'
import { AppBar, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import type { AppProps } from 'next/app'
import { ReactNode, useState } from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const DrawerButton = (props: { label: string, icon: ReactNode, href: string }) => {
  return <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItemButton>
  </ListItem>
}

export default function App({ Component, pageProps }: AppProps) {
  const [drawer, setDrawer] = useState(false)

  return <>
    <AppBar position="static">
      <Toolbar>
        <Drawer
          anchor="left"
          open={drawer}
          onClose={() => setDrawer(false)}
        >
          <List>
            <DrawerButton label="Créateur de comité" icon={<AutoFixHighIcon />} href={'/committee'} />
          </List>
        </Drawer>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MFINUE Outils
        </Typography>
      </Toolbar>
    </AppBar>
    <Component {...pageProps} />
  </>
}

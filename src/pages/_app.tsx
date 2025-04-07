import '@/styles/globals.css'
import { AppBar, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import type { AppProps } from 'next/app'
import { ReactNode, useState } from 'react';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MapIcon from '@mui/icons-material/Map';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import Head from 'next/head';
import DrawerButton from '@/components/DrawerButton';
import UserContextProvider from '@/context/AuthContext';
import AppBarComponent from '@/components/AppBarComponent';
import { useRouter } from 'next/router';



export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  return <>
    <Head>
      <title>MFINUE Outils</title>
    </Head>
    <UserContextProvider>
      { !router.pathname.startsWith(`/login`) && <AppBarComponent />}
      <Component {...pageProps} />
    </UserContextProvider>
  </>
}

import { AppBar, Drawer, IconButton, List, Toolbar, Typography } from "@mui/material";
import { Head } from "next/document";
import DrawerButton from "./DrawerButton";
import { useState } from "react";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MapIcon from '@mui/icons-material/Map';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

export default function AppBarComponent() {
    
    const [drawer, setDrawer] = useState(false);
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
                    <DrawerButton label="Créateur de parcour" icon={<MapIcon />} href={'/tour'} />
                    <DrawerButton label="Signature d'email" icon={<MailIcon />} href={'/signature'} />
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
    </>
}
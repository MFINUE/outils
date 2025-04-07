import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Link from "next/link"
import { ReactNode } from "react"


const DrawerButton = (props: { label: string, icon: ReactNode, href: string }) => {
    return <ListItem disablePadding>
      <Link href={props.href}>
        <ListItemButton>
          <ListItemIcon>
            {props.icon}
          </ListItemIcon>
          <ListItemText primary={props.label} />
        </ListItemButton>
      </Link>
    </ListItem>
}

export default DrawerButton;
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import INavProps from '../../interfaces/INavProps';
interface IProps {
    navlinks: INavProps[]
    toggleDrawer: (st: boolean) => void
}


export default function NavigationItems({ toggleDrawer, navlinks }: IProps) {
    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >


            {navlinks && navlinks.length > 0 && <List>
                {navlinks.map(link => (

                    <ListItem key={link.name} disablePadding>
                        <ListItemButton>
                            <Link to={link.to} style={{ textDecoration: "none", display: 'inline' }} >
                                <ListItemText primary={link.name} />
                            </Link>

                        </ListItemButton>
                    </ListItem>

                ))}
            </List>}
            {/* <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );
    return (
        list()
    )
}

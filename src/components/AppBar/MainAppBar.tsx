
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainDrawer from '../Drawer/Drawer';
import INavProps from '../../interfaces/INavProps';
import IAdmin from '../../interfaces/IAdmin';
import { Dispatch, SetStateAction } from 'react';
interface IProps {
    navlinks: INavProps[]
    setUser: Dispatch<SetStateAction<IAdmin | undefined>>
}
export default function MainAppBar({ navlinks, setUser }: IProps) {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static"  >
                <Toolbar >
                    <MainDrawer navlinks={navlinks} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Modern Shop Admin
                    </Typography>
                    <Button onClick={() => { setUser(undefined); localStorage.clear() }} color="inherit">Log Out</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
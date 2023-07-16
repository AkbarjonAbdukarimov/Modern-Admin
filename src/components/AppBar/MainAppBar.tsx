
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainDrawer from '../Drawer/Drawer';
import INavProps from '../../interfaces/INavProps';
interface IProps {
    navlinks: INavProps[]

}
export default function MainAppBar({ navlinks }: IProps) {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static"  >
                <Toolbar >
                    <MainDrawer navlinks={navlinks} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
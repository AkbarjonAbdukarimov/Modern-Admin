import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MainDrawer from "../Drawer/Drawer";
import INavProps from "../../interfaces/INavProps";
import IAdmin from "../../interfaces/IAdmin";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { Menu, MenuItem, IconButton, Badge, } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from "react";
interface IProps {
  navlinks: INavProps[];
  setUser: Dispatch<SetStateAction<IAdmin | undefined>>;
}
export default function MainAppBar({ navlinks, setUser }: IProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MainDrawer navlinks={navlinks} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Modern Shop Admin
          </Typography>
          <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            id={'somerandId'}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
          >
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <p>Messages</p>
            </MenuItem>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Profile</p>
            </MenuItem>
          </Menu>
          <Button
            onClick={() => {
              setUser(undefined);
              localStorage.clear();
              navigate("/");
            }}
            color="inherit"
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

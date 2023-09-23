import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import { AccountCircle } from "@mui/icons-material";
import { Menu, MenuItem, Badge } from "@mui/material";
import axios from "axios";
import MoreIcon from "@mui/icons-material/MoreVert";
import MainDrawer from "../../Drawer/Drawer";
import INavProps from "../../../interfaces/INavProps";
import ChatListDrawer from "./ChatList";

const drawerWidth = 240;


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));


export default function Chats({
  navLinks,
  setUser,
}: {
  navLinks: INavProps[];
  setUser: Function;
}) {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [unreadMsgs, setCount] = React.useState(0);
  React.useEffect(() => {
    axios
      .get("/chats/admin/msgcount")
      .then((res) => setCount(res.data.unreadMsgs))
      .catch((e) => console.log(e));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          setUser(undefined);
          localStorage.clear();
          handleMenuClose();
          navigate("/");
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {pathname != "/chats"&&<MenuItem>
        <Link
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
          to={"/chats"}
        >
          <IconButton
            size="large"
            aria-label={`${unreadMsgs} new messages`}
            color="inherit"
          >
            <Badge badgeContent={unreadMsgs} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p className="m-0">Messages</p>
        </Link>
      </MenuItem>}
      

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
        <p className="m-0">Profile</p>
      </MenuItem>
    </Menu>
  );

 

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <MainDrawer navlinks={navLinks} />

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Persistent drawer
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pathname != "/chats" && (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/chats"}
              >
                <IconButton
                  size="large"
                  aria-label={`${unreadMsgs} new messages`}
                  color="inherit"
                >
                  <Badge badgeContent={unreadMsgs} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Link>
            )}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {pathname === "/chats" && (
            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleDrawerOpen}
                color="inherit"
                sx={{ ...(open && { display: "none" }) }}
              >
                <ChatIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
     
      {pathname==='/chats'&&<ChatListDrawer open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen}/>}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
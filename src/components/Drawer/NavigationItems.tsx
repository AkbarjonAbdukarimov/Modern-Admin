import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import * as reactRouterDom from "react-router-dom";
import INavProps from "../../interfaces/INavProps";
import { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import IAdmin from "../../interfaces/IAdmin";
import IconListNav from "./IconListNav"
import "../../style/list.scss"


interface IProps {
  navlinks: INavProps[];
  toggleDrawer: (st: boolean) => void;
}

export default function NavigationItems({ toggleDrawer, navlinks }: IProps) {
  const location = reactRouterDom.useLocation()
  const context = useContext(AdminContext);
  let admin: IAdmin;
  if (context && context.admin) {
    admin = context.admin
  }
  const list = () => (
    // @ts-ignore
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {navlinks && navlinks.length > 0 && (
        <List className="list__nav">
          {navlinks.map((link) => {
            if (admin.super) {
              return (
                <reactRouterDom.Link to={link.to} style={{ textDecoration: "none", display: "inline" }}>
                  <ListItem key={link.name} disablePadding className={`list__nav__button ${link.to === location.pathname && "active"}`}>
                    <ListItemButton >
                      <IconListNav links={link.to} />
                      <ListItemText primary={link.name} />
                    </ListItemButton>
                    <Divider />
                  </ListItem>
                </reactRouterDom.Link>
              );
            } else {
              if (!link.super) {
                return (
                  <reactRouterDom.Link to={link.to} style={{ textDecoration: "none", display: "inline" }}>
                    <ListItem key={link.name} disablePadding className={`list__nav__button ${link.to === location.pathname && "active"}`}>
                      <ListItemButton>
                        <IconListNav links={link.to} />
                        <ListItemText primary={link.name} />
                      </ListItemButton>
                      <Divider />
                    </ListItem>
                  </reactRouterDom.Link>
                );
              }
            }
          })}
        </List>
      )}
    </Box>
  );
  return list();
}

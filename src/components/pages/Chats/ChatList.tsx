import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  List,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import IChat from "../../../interfaces/IChat";
import { useQuery } from "react-query";
import ChatItems from "./ChatItem/ChatItem";
const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
const getChats = () =>
  axios.get<IChat[]>("/chats/admin").then((res) => res.data);
const ChatListDrawer = ({ open, handleDrawerClose }:{ open:boolean, handleDrawerClose:Function}) => {
  const { data, isLoading } = useQuery(["chats"], getChats);
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={()=>handleDrawerClose()}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          Chats
        </Typography>
      </DrawerHeader>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div>
        
        <List>
          {data &&
            data.map((chat) => (
             <ChatItems key={chat.id} chat={chat}/>
            ))}
        </List>
      </div>
    </Drawer>
  );
};

export default ChatListDrawer;

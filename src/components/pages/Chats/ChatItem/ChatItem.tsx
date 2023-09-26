import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Avatar,
  ListItemText,
  Badge,
} from "@mui/material";
import IChat from "../../../../interfaces/IChat";
import { socket } from "../../../../socket";
import { Link } from "react-router-dom";

export default function ChatItems({
  chat,
  selectChat,
}: {
  chat: IChat;
  selectChat: Function;
}) {
  return (
    <Link style={{textDecoration:"none"}}
      to={`/chats/${chat.id}`}
      onClick={() => {
        selectChat(chat);
        socket.emit("chatSelected", chat);
      }}
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Badge badgeContent={chat.unreadMsgs} color="error">
              <Avatar className="" alt="Profile Picture">
                {chat.user.fullName[0]}
              </Avatar>
            </Badge>
          </ListItemIcon>
          <ListItemText primary={chat.user.fullName} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

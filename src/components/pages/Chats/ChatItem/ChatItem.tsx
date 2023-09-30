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
import { useEffect, useState } from "react";
import { IMessage } from "../../../../interfaces/IMessage";

export default function ChatItems({
  chat,
  selectChat,
  selectedChat,
}: {
  chat: IChat;
  selectChat: Function;
  selectedChat: IChat|undefined;
}) {
  const [unreadMsgs, setUnreadMsgs] = useState(chat.unreadMsgs);
  function handleUnread(msg: IMessage) {
  
    if (msg.reciever.toString() === chat.admin.id && !msg.viewed) {
      setUnreadMsgs((prev) => prev + 1);
    }
  }
  useEffect(() => {
    if (selectedChat && selectedChat.id === chat.id) {
      setUnreadMsgs(0);
    }
  }, []);
  useEffect(() => {
    if (selectedChat && selectedChat.id === chat.id) {
      setUnreadMsgs(0);
    }
  }, [selectedChat]);


  useEffect(() => {
    socket.on(chat.id.toString(), handleUnread);
    return () => {
      socket.off(chat.id.toString(), handleUnread);
    };
  }, [setUnreadMsgs]);
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/chats/${chat.id}`}
      onClick={() => {
        selectChat(chat);
        socket.emit("chatSelected", chat);
      }}
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Badge badgeContent={unreadMsgs} color="error">
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

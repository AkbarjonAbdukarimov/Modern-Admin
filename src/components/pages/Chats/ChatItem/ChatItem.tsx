import { ListItem, ListItemButton, ListItemIcon, Avatar, ListItemText } from "@mui/material";
import IChat from "../../../../interfaces/IChat";

export default function ChatItems({chat}:{chat:IChat}){
    return( <ListItem key={chat.id} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Avatar className="" alt="Profile Picture">
              {chat.user.fullName[0]}
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={chat.user.fullName} />
        </ListItemButton>
      </ListItem>)
}
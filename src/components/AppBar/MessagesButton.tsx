import { useEffect, useState } from "react";
import { Badge, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { socket } from "../../socket";
import { IMessage } from "../../interfaces/IMessage";

export default function MessagesButton({ msgs }: { msgs: number }) {
  const [unreadMsgs, setUnreadMsgs] = useState(msgs);

  

  function handleUnread(_msg: IMessage) {
    setUnreadMsgs((prev) => prev + 1);
  }

  useEffect(() => {
    socket.on("total-count", handleUnread);
    return () => {
      socket.off("total-count", handleUnread);
    };
  }, [setUnreadMsgs]);
  return (
    <IconButton
      size="large"
      aria-label={`${unreadMsgs} new messages`}
      color="inherit"
    >
      <Badge badgeContent={unreadMsgs > 0 ? unreadMsgs : msgs} color="error">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}

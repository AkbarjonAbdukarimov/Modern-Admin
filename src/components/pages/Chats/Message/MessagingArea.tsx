import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IMessage } from "../../../../interfaces/IMessage";
import { socket } from "../../../../socket";
import MessageForm from "./MessageForm";
import Message from "./Message";
import IAdmin from "../../../../interfaces/IAdmin";
import IChat from "../../../../interfaces/IChat";
import ListLoading from "../../../ListLoading";
import { useNavigate } from "react-router-dom";
import "../../../../style/chats/chat.scss"

const Renavigate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/chats");
    return;
  }, []);
  return <></>;
};

export default function MessagingArea({
  user,
  chat,
}: {
  user: IAdmin;
  chat: IChat | undefined;
}) {
  const [loading, setLoading] = useState(true);


  if (!chat) {
    return <Renavigate />;
  }

  const [messages, setMessages] = useState<IMessage[]>([]);

  const endRef = useRef<HTMLDivElement | any>();
  useEffect(() => {
    setLoading(true)
    axios
      .get<IMessage[]>("/chats/admin/" + chat.id)
      .then((res) => { setLoading(false); setMessages(res.data) });
  }, [chat]);
  //scroling logic
  useEffect(() => {
    endRef &&
      endRef.current &&
      endRef.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [messages]);

  function sendMessage(msg: IMessage) {
    setMessages((prev) => [...prev, msg]);
  }

  useEffect(() => {
    socket.on(`sendMessage-${chat.id}`, sendMessage);
    return () => {
      socket.off(`sendMessage-${chat.id}`, sendMessage);
    };
  }, [chat, setMessages]);
  if (loading) {
    return (
      <div className="row w-100 p-0">
        <div
          style={{
            width: "98%",
            maxHeight: "86vh",
            overflowY: "scroll",
            position: "absolute",
            bottom: 50,
          }}
          className="h-100 d-flex justify-content-center align-items-center loading"
        >
          <ListLoading />
        </div>
      </div>
    );
  }
  return (
    <div className="row w-100 p-0">
      <div className="container h-100 mt-4 chat-area p-0">
        {messages && messages.length > 0 ? (
          <div
            style={{
              width: "98%",
              maxHeight: "86vh",
              overflowY: "scroll",
              position: "absolute",
              bottom: 50,
            }}
            className={`p-0 ms-4 selectedChat`}
          >
            {messages.map((m) => (
              <Message key={m.id} message={m} user={user} />
            ))}
          </div>
        ) : (
          <div
            style={{
              width: "98%",
              maxHeight: "86vh",
              overflowY: "scroll",
              position: "absolute",
              bottom: 50,
            }}
            className="h-100 d-flex justify-content-center align-items-center"
          >
            <h5 className="text-muted">No Messages Yet</h5>
          </div>
        )}
      </div>
      <div ref={endRef} />
      <div
        style={{ height: 50, position: "absolute", bottom: 0 }}
        className="d-flex justify-content-center w-100 p-0  "
      >
        <MessageForm chat={chat} user={user} />
      </div>
    </div>
  );
}

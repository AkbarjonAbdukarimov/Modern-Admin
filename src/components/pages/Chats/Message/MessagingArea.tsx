import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IMessage } from "../../../../interfaces/IMessage";
import { socket } from "../../../../socket";
import MessageForm from "./MessageForm";
import Message from "./Message";
import IAdmin from "../../../../interfaces/IAdmin";
import IChat from "../../../../interfaces/IChat";
import { useQuery } from "react-query";
const getChatDetails = (id:string) =>
  axios
    .get<IMessage[]>("/chats/admin/" + id)
    .then((res) =>res.data);
export default function MessagingArea({ user, chat }: { user: IAdmin, chat:IChat }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
const {data, isLoading}=useQuery(['chat',chat.id],()=>getChatDetails(chat.id))
  const endRef = useRef<HTMLDivElement | any>();

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
    if (chat) {
      return () => {};
    }
    return setMessages([]);
  }, [chat]);
  useEffect(() => {
    socket.on("sendMessage", sendMessage);
    return () => {
      socket.off("sendMessage", sendMessage);
    };
  }, [chat, setMessages]);

  return (
    <div className=" w-100 vh-100">
      <h1>Messaging Area</h1>
      <div className="h-100 top-container ">
        <div className="bg-info bg-gradient w-100 px-4 py-2">
          <h3>{chat.user.fullName}</h3>
        </div>

        <div className="container mt-4 chat-area ">
          {messages.length > 0 ? (
            <div className="pb-3">
              {messages.map((m) => (
                <Message key={m.id} message={m} user={user} />
              ))}
            </div>
          ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <h5 className="text-muted">No Messages Yet</h5>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="input-container d-flex justify-content-center bg-light w-100 p-1 ">
          <MessageForm chat={chat} user={user} />
        </div>
      </div>
    </div>
  );
}

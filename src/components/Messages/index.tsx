import { HTMLAttributes, useContext, useEffect, useState } from "react";
import cx from "classnames";
import { ChatMessage } from "../Message";
import { SocketContext } from "../../hooks/socket";
import { Message } from "../../types";

import "./styles.scss";

interface MessagesProps extends HTMLAttributes<HTMLDivElement> { }

export function Messages(props: MessagesProps) {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (message) => setMessages(prev => [...prev, message]));
    socket.on("deleteMessage", (id) => setMessages(prev => prev.filter(message => message.id !== id && message)));
    socket.on("allMessages", (messages) => setMessages(messages));
  }, [socket.connected]);

  return (
    <div {...props} className={cx("messages", props.className)}>
      {messages.map(message => <ChatMessage key={message.id} message={message}/>)}
    </div>
  );
}

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
    const messageListener = (message: Message) => setMessages(prev => [...prev, message]);
    const deleteMessageListener = (id: string) => setMessages(prev => prev.filter(message => message.id !== id && message));
    const previousMessagesListener = (messages: Message[]) => setMessages(messages);

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.on("previousMessages", previousMessagesListener);
  
    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
      socket.off("previousMessages", previousMessagesListener);
    };
  }, []);

  return (
    <div {...props} className={cx("messages", props.className)}>
      {messages.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}

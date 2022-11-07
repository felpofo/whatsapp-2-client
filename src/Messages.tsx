import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ClientToServerEvents, Message, ServerToClientEvents } from "./types";
import cx from "classnames";

import "./Messages.scss";

interface MessagesProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export function Messages({ socket }: MessagesProps) {
  const [messages, setMessages] = useState<Record<string, Message>>({});

  function deleteMessage(id: string) {
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      delete newMessages[id];
      return newMessages;
    });
  }

  function parseTime(time: number) {
    return new Date(time).toLocaleTimeString().substring(0, 5);
  }

  useEffect(() => {
    const messageListener = (message: Message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    const previousMessagesListener = (messages: Record<string, Message>) => {
      setMessages(messages);
    };

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessage);
    socket.on("previousMessages", previousMessagesListener);

    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessage);
      socket.off("previousMessages", previousMessagesListener);
    };
  }, [socket]);

  return (
    <div className="messages">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className={cx("message", message.user.id === socket.id ? "sent-by-me" : "")}
            title={`Sent at ${parseTime(message.time)}`}
          >
            <span className="user">{message.user.name}</span>
            <span className="text">{message.value}</span>
            <span className="date">{parseTime(message.time)}</span>
          </div>
        ))
      }
    </div>
  );

}

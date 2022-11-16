import { HTMLAttributes, useContext } from "react";
import cx from "classnames";
import { SocketContext } from "../../hooks/socket";
import { Message } from "../../types";

import "./styles.scss";

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  message: Message;
}

export function ChatMessage(props: MessageProps) {
  const socket = useContext(SocketContext);

  const { time, user, value } = props.message;

  function parseTime(time: number) {
    return new Date(time).toLocaleTimeString().substring(0, 5);
  }

  return (
    <div {...props}
      className={cx("message", user.id === socket.id ? "sent-by-me" : "", props.className)}
      title={`Sent at ${parseTime(time)}`}
    >
      <span className="user">{user.name}</span>
      <span className="text">{value}
        <span className="date">{parseTime(time)}</span>
      </span>
    </div>
  );
}

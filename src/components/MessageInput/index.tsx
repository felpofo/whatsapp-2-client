import { FormEvent, HTMLAttributes, useContext, useState } from "react";
import cx from "classnames";
import { SocketContext } from "../../hooks/socket";

import "./styles.scss";

interface MessageInputProps extends HTMLAttributes<HTMLFormElement> { }

export function MessageInput(props: MessageInputProps) {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState<string>("");

  function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    socket.emit("message", message);
    setMessage("");
  }

  return (
    <form {...props} className={cx("send-message", props.className)} onSubmit={handleSendMessage}>
      <input
        autoFocus
        value={message}
        placeholder="Mensagem"
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  );
}

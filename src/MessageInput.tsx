import { useState } from "react";
import { Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "./types";

import "./MessageInput.scss";

interface MessageInputProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export function MessageInput({ socket }: MessageInputProps) {
  const [value, setValue] = useState<string>("");

  return (
    <form className="send-message" onSubmit={(e) => {
      e.preventDefault();
      socket.emit("message", value);
      setValue("");
    }}>
      <input
        autoFocus
        value={value}
        placeholder="Mensagem"
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </form>
  );
}

import { FormEvent, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Messages } from "./Messages";
import { MessageInput } from "./MessageInput";
import { ClientToServerEvents, ServerToClientEvents } from "./types";

import "./App.scss";

export default function App() {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const [name, setName] = useState<string>("");
  const [tempName, setTempName] = useState<string>("");

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SERVER_IP);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  function handleSetName(event: FormEvent) {
    event.preventDefault();

    
    if (tempName.trim() === "") return;
    setName(tempName);
    
    socket?.emit("setName", tempName);
    
    setTempName("");
  }

  return (
    <div className="App">
      <header>
        <span>Whatsapp 2</span>
        {name ? (
          <span>Nickname: {name}</span>
        ) : (
          <div>
            <form onSubmit={handleSetName}>
              <input placeholder={"Your nickname"} value={tempName} onChange={e => setTempName(e.target.value)}/>
            </form>
          </div>
        )}
      </header>
      {socket ? (
        <>
          <div className="chat">
            <Messages socket={socket}/>
          </div>
          {name ? <MessageInput socket={socket}/>
            : <span>Set your nickname to send messages</span>
          }
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

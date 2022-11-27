import { FormEvent, useContext, useEffect, useState } from "react";
import { Messages } from "./components/Messages";
import { MessageInput } from "./components/MessageInput";
import { SocketContext } from "./hooks/socket";

import whatsapp2Img from "./assets/logo512.png";

import "./App.scss";
import { User } from "./types";
import { CircleNotch } from "phosphor-react";

export default function App() {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [tempName, setTempName] = useState<string>("");

  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.on("onlineUsers", (users: User[]) => setUsers(users));
    
    socket.on("connect", () => {
      setConnected(true);
      socket.connected = true;

      getNameFromLocalStorage();
      localStorage.setItem("previousSocketId", socket.id);
    });
    
    socket.on("disconnect", () => {
      setConnected(false);
      socket.connected = false;
    });
  }, []);

  function getNameFromLocalStorage() {
    const name = localStorage.getItem("name");

    if (name) {
      setName(name);
      socket.emit("setName", name, localStorage.getItem("previousSocketId"));
    }
  }

  function handleSetName(event: FormEvent) {
    event.preventDefault();

    if (tempName.trim()) {
      setName(tempName);
      socket.emit("setName", tempName);
      localStorage.setItem("name", tempName);
      setTempName("");
    }
  }

  return (
    <div className="App">
      {connected ? (
        <>
          <header>
            <div className="group-info">
              <img src={whatsapp2Img}/>
              <div>
                <span className="title">Whatsapp 2</span>
                <span className="online">
                  {users.map(({ name }, i, arr) =>
                    `${name.split(" ")[0]}${arr.length !== i + 1 ? ", " : ""}`
                  )}</span>
              </div>
            </div>
          </header>
          <div className="chat">
            <Messages/>
          </div>
          {name
            ? <MessageInput/>
            : <div className="send-message">
              <form onSubmit={handleSetName}>
                <input placeholder={"Your nickname"} value={tempName} onChange={e => setTempName(e.target.value)}/>
              </form>
            </div>
          }
        </>
      ) : (
        <div className="offline">
          <h1>Connecting</h1>
          <CircleNotch className="spinner" size={48}/>
        </div>
      )}
    </div>
  );
}

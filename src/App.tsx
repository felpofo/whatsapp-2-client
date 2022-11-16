import { FormEvent, useContext, useEffect, useState } from "react";
import { Messages } from "./components/Messages";
import { MessageInput } from "./components/MessageInput";
import { SocketContext } from "./hooks/socket";

import whatsapp2Img from "./assets/logo24.png";

import "./App.scss";
import { User } from "./types";

export default function App() {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [tempName, setTempName] = useState<string>("");


  useEffect(() => {
    const onlineUsersListener = (users: User[]) => setUsers(users);

    socket.on("onlineUsers", onlineUsersListener);

    return () => {
      socket.off("onlineUsers", onlineUsersListener);
    };
  }, []);
  

  function handleSetName(event: FormEvent) {
    event.preventDefault();

    if (tempName.trim() === "") return;
    setName(tempName);
    socket.emit("setName", tempName);
    setTempName("");
  }

  return (
    <div className="App">
      <header>
        <div className="group-info">
          <img src={whatsapp2Img}/>
          <div>
            <span className="title">Whatsapp 2</span>
            <div className="online">{
              users.map(({ id, name }, i, arr) => (
                <span key={id}>{name.split(" ")[0]}{arr.length !== i + 1 && ", "}</span>
              ))
            }</div>
          </div>
        </div>
      </header>
      {socket ? (
        <>
          <div className="chat">
            <Messages/>
          </div>
          {name ? <MessageInput/>
            : <div className={"send-message"}>
              {!name && (
                <form onSubmit={handleSetName}>
                  <input placeholder={"Your nickname"} value={tempName} onChange={e => setTempName(e.target.value)}/>
                </form>
              )}
            </div>
          }
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

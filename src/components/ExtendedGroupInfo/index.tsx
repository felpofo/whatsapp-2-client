import { HTMLAttributes, useContext } from "react";
import cx from "classnames";
import { LockOpen, UserCircle, X } from "phosphor-react";
import { SocketContext } from "../../hooks/socket";

import whatsappLogo from "../../assets/logo512.png";
import "./styles.scss";
import { User } from "../../types";

interface ExtendedGroupInfoProps extends HTMLAttributes<HTMLDivElement> {
  users: User[];
  onclose: () => void;
}

export function ExtendedGroupInfo(props: ExtendedGroupInfoProps) {
  const socket = useContext(SocketContext);

  return (
    <div {...props} className={cx("extended-group-info", props.className)}>
      <header>
        <button onClick={props.onclose}>
          <X size={24} color="#808080" weight="bold"/>
        </button>
        <span>Informações adicionais</span>
      </header>
      <main>
        <div className="info">
          <img src={whatsappLogo}/>
          <h1>Whatsapp 2</h1>
          <span>Chat · {props.users.length} participante{props.users.length != 1 ? "s" : ""}</span>
        </div>
        <div className="cryptography">
          <LockOpen size={48} weight="fill" color="#8696a0"/>
          <div>
            <h2>Criptografia</h2>
            <span>As mensagens não são protegidas com nenhum tipo de criptografia. Boa sorte!</span>
          </div>
        </div>
        <div className="online-now">
          <span>{props.users.length} participante{props.users.length != 1 ? "s" : ""}</span>
          {props.users.map(user => (
            <div className={cx("user", user.id === socket.id ? "me" : "")} key={user.id}>
              <UserCircle size={48} weight="fill" color="#8696a0"/>
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents>
  = io(import.meta.env.VITE_SERVER_IP);

export const SocketContext = createContext(socket);

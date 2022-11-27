import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents as In, ClientToServerEvents as Out } from "../types";

export const socket: Socket<In, Out> = io(import.meta.env.VITE_SERVER_IP);

export const SocketContext = createContext(socket);

export type User = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  user: User;
  value: string;
  time: number;
};

export interface ClientToServerEvents {
  message: (message: string) => void;
  deleteMessage: (id: string) => void;
  setName: (name: string, previousId?: string | null) => void;
}

export interface ServerToClientEvents {
  message: (message: Message) => void;
  allMessages: (messages: Message[]) => void;
  deleteMessage: (id: string) => void;
  onlineUsers: (users: User[]) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  name: string;
}

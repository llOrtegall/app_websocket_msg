export interface OnlineUser {
  id: string;
  email: string;
  names: string;
  lastnames: string;
}

export interface Messages {
  text: string;
  sender: string;
  recipient: string;
  id: string;
}

export interface MessageData {
  online: OnlineUser[];
  messages: Messages;
}
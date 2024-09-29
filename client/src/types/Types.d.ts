export interface OnlineUser {
  id: string;
  email: string;
  names: string;
  lastnames: string;
}

export interface MessageData {
  online: OnlineUser[];
  messages: Messages;
}
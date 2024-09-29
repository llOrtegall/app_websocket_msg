export interface OnlineUser {
  id: string;
  email: string;
}

export interface MessageData {
  online: OnlineUser[];
  messages: Messages;
}
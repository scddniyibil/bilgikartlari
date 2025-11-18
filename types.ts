export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string; // This will act as the username
  email: string;
  password?: string; // Stored in user list, but not in currentUser session state
  role: Role;
}

export interface Card {
  id:string;
  category: string;
  text: string;
  imageUrl?: string;
  backgroundColor?: string;
}

export type Category = string;

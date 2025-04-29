// src/types/User.ts

export interface User {
  id: string; // UUID or simple numeric id
  username: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Developer' | 'Admin';
}

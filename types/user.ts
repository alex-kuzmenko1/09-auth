export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string
}

export interface AuthResponse {
  user: User;
  token: string;
}
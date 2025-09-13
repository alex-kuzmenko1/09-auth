export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string; 
  token?: string;    
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

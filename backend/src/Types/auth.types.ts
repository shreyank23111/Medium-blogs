export interface signupData {
  firstName: string
  lastName?: string
  email: string
  password: string
}

export interface loginData {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
    password: string;
  };
  token: string;
}
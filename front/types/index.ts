export interface TokenProps {
  token: string;
  id: number;
  mail: string;
  nome: string;
  telefone: string;
  pais: string;
}

export interface ErrorProps {
  error: string;
}

export interface UserProps {
  id: number;
  mail: string;
  nome: string;
  telefone: string;
  pais: string;
}

export interface ProfileProps {
  id: number;
  nome: string;
  telefone: string;
  pais: string;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface UserContextProps {
  loading: boolean;
  token: TokenProps | null;
  profile: ProfileProps | null;
  setToken: (token: TokenProps | null) => void;
  users: UserProps[] | null;
  login: (mail: string, password: string) => Promise<void>;
  logout: () => void;
  create: (
    name: string,
    mail: string,
    fone: string,
    pais: string,
    password: string
  ) => Promise<void>;
  getUsers: () => Promise<void>;
  error: ErrorProps | null;
  setError: (error: ErrorProps | null) => void;
  updateAlias: (alias: string) => Promise<boolean>;
  updateMail: (mail: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
  deleteProfile: () => Promise<boolean>;
}

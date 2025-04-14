import { TokenProps } from "../types";

// Salvar dados no LocalStorage
export const saveToLocalStorage = (key: string, value: TokenProps): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Ler dados do LocalStorage
export const loadFromLocalStorage = (key: string): TokenProps | null => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as TokenProps) : null;
};

// Remover dados do LocalStorage
export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
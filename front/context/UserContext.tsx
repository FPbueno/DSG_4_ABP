import React, { createContext, useState, useEffect } from 'react';
import { saveToLocalStorage, removeFromLocalStorage } from '../utils/localStorage';
import { UserContextProps, ProviderProps, ErrorProps, UserProps, TokenProps, ProfileProps } from '../types';
import { Profile, User } from '../services';
import { loadFromLocalStorage } from '../utils/localStorage';
import { isErrorProps } from '../utils/isError';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definindo as rotas possíveis
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  // Outras rotas que você tenha
};


export const UserContext = createContext<UserContextProps | undefined>(undefined);
// Função do provider
export function UserProvider({ children }: ProviderProps) {
  const [error, setError] = useState<ErrorProps | null>(null);
  const [users, setUsers] = useState<UserProps[] | null>(null);
  const [token, setToken] = useState<TokenProps | null>(null);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Carregar propriedades se estiverem salvas no localStorage
    const data = loadFromLocalStorage('user');
    if (data) {
      setToken(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
    getProfile();
  }, []);

  const login = async (mail: string, password: string) => {
    const response = await User.login(mail, password);
    if (isErrorProps(response)) {
      setError(response);
    } else {
      setError(null);
      setToken(response);
      saveToLocalStorage('user', response);
      navigation.navigate('Home'); // Navegar para a tela inicial após o login
    }
  };

  const create = async (
    name: string,
    mail: string,
    fone:string,
    pais:string,
    password: string,

  ) => {
    const response = await User.create(name, mail, fone, pais, password);
    if (isErrorProps(response)) {
      setError(response);
    } else {
      setError(null);
      setToken(response);
      saveToLocalStorage('user', response);
      navigation.navigate('Home'); // Navegar para a tela inicial após a criação do usuário
    }
  };

  const logout = () => {
    setError(null);
    setToken(null);
    removeFromLocalStorage('user');
    navigation.navigate('Login'); // Navegar para a tela de login após o logout
  };

  const updateAlias = async (alias: string): Promise<boolean> => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError({ error: 'User ID não encontrado.' });
      return false;
    }

    const response = await User.updateAlias(userId, alias);

    if (isErrorProps(response)) {
      setError(response);
      return false;
    } else {
      setError(null);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.alias = alias;
      saveToLocalStorage('user', user);
      return true;
    }
  };

  const updateMail = async (mail: string): Promise<boolean> => {
    const response = await User.updateMail(mail);

    if (isErrorProps(response)) {
      setError(response);
      return false;
    } else {
      setError(null);
      if (token) {
        const temp = { ...token };
        temp.mail = mail;
        setToken(temp);
        saveToLocalStorage('user', temp);
      }
      return true;
    }
  };

  const updatePassword = async (password: string): Promise<boolean> => {
    const response = await User.updatePassword(password);

    if (isErrorProps(response)) {
      setError(response);
      return false;
    } else {
      setError(null);
      return true;
    }
  };



  const getProfile = async (): Promise<void> => {
    const response = await Profile.list();
    setProfile(null);
    if (!isErrorProps(response)) {
      if (response.length === 1) {
        setProfile(response[0]);
      }
    }
  };

  const deleteProfile = async (): Promise<boolean> => {
    const response = await Profile.delete();
    if (isErrorProps(response)) {
      setError(response);
      return false;
    } else {
      setError(null);
      setProfile(null);
      return true;
    }
  };

  const getUsers = async () => {
    const response = await User.list();
    if (isErrorProps(response)) {
      setError(response);
    } else {
      setError(null);
      setUsers(response);
    }
  };


  return (
    <UserContext.Provider
      value={{
        loading,
        token,
        profile,
        setToken,
        users,
        login,
        logout,
        create,
        getUsers,
        error,
        setError,
        updateAlias,
        updateMail,
        updatePassword,
        deleteProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

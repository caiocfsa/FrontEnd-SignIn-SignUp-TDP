import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
};

interface signInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: signInCredentials): Promise<void>;
  SignOut(): void;
}

 const AuthContext = createContext<AuthContextData>({} as AuthContextData);

 const AuthProvider: React.FC = ({ children }) => {

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:tokken');
    const user = localStorage.getItem('@GoBarber:user');

    if(token && user){
      return {token, user: JSON.parse(user)};
    }

    return {} as AuthState;
     });

  const signIn = useCallback( async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:tokken', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user })
  }, []);

  const SignOut = useCallback(() => {

    localStorage.removeItem('@GoBarber:tokken');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context){
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}


export { AuthProvider, useAuth }

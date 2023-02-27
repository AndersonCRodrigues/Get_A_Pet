import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({ children }) {

  const { register, authenticade, logout, login } = useAuth();

  return (
    <Context.Provider value={{register, authenticade, logout, login }}>
      {children}
    </Context.Provider>
  )
}

export {UserProvider, Context};
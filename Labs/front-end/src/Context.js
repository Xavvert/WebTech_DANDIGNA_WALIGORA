import React from 'react'
import { useState } from 'react';
export const Context = React.createContext();

export const ContextProvider = ({
    children
}) => {
    const [user, setUser] = useState("")
    return (
      <Context.Provider value={{
        
        user: user,
        login: (user) => {
          setUser(user)
        },
        logout: () => {
          setUser(null)
        }
      }}>{children}</Context.Provider>
    )
  }
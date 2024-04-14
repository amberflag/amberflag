'use client'
import React, { createContext, useContext, useState } from 'react'

const Context = createContext<any>({})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>({})

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  )
}

export function useUserContext() {
  return useContext(Context)
}

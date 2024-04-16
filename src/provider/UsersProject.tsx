'use client'
import React, { createContext, useContext, useState } from 'react'

const Context = createContext<any>([])

export function UsersProjectProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [usersProject, setUsersProject] = useState<any>({})

  return (
    <Context.Provider value={{ usersProject, setUsersProject }}>
      {children}
    </Context.Provider>
  )
}

export function useUsersProjectContext() {
  return useContext(Context)
}

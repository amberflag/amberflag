'use client'
import React, { createContext, useContext, useState } from 'react'

const Context = createContext<any>({})

export function SelectedProjectProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [selectedProject, setSelectedProject] = useState<any>({})

  return (
    <Context.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </Context.Provider>
  )
}

export function useSelectedProjectContext() {
  return useContext(Context)
}

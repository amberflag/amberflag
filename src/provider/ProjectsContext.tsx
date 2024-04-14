'use client'
import React, { createContext, useContext, useState } from 'react'

const Context = createContext<any>({})

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<any>({})

  return (
    <Context.Provider value={{ projects, setProjects }}>
      {children}
    </Context.Provider>
  )
}

export function useProjectsContext() {
  return useContext(Context)
}

'use client'
import React, { createContext, useContext, useState } from 'react'

const Context = createContext<any>({})

export function CreateEditProjectProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [project, setProject] = useState<any>({})
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  return (
    <Context.Provider
      value={{ project, setProject, openDialog, setOpenDialog }}
    >
      {children}
    </Context.Provider>
  )
}

export function useCreateEditProjectContext() {
  return useContext(Context)
}

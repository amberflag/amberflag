'use client'
import React, { createContext, useContext, useState } from 'react'

const Context = createContext<any>({})

export function CreateEditEnvironmentOrFlagProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [entity, setEntity] = useState<any>({})
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  return (
    <Context.Provider value={{ entity, setEntity, openDialog, setOpenDialog }}>
      {children}
    </Context.Provider>
  )
}

export function useCreateEditEnvironmentOrFlagContext() {
  return useContext(Context)
}

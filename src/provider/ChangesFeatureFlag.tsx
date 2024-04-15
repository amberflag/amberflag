'use client'
import React, { createContext, useContext, useState } from 'react'

const Context = createContext<any>([])

export function ChangesFeatureFlagsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [changesFeaturesFlags, setChangesFeatureFlags] = useState<any>([])

  return (
    <Context.Provider value={{ changesFeaturesFlags, setChangesFeatureFlags }}>
      {children}
    </Context.Provider>
  )
}

export function useChangesFeatureFlagsContext() {
  return useContext(Context)
}

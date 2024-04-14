'use client'
import React, { createContext, useContext, useState } from 'react'

const Context = createContext<any>({})

export function FeatureFlagsProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [featureFlags, setFeatureFlags] = useState<any>({})

  return (
    <Context.Provider value={{ featureFlags, setFeatureFlags }}>
      {children}
    </Context.Provider>
  )
}

export function useFeatureFlagsContext() {
  return useContext(Context)
}

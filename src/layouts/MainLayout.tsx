import React, { PropsWithChildren } from 'react'

export const MainLayout = ({children}:PropsWithChildren) => {
  return (
    <div>
      { children }
    </div>
  )
}

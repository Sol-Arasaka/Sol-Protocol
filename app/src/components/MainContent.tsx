import type { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  return     <div className={'z-0 flex h-screen w-screen flex-col items-center justify-center bg-black text-white'}>{children}</div>
}

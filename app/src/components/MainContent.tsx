import type { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <div className={'z-0 flex h-screen w-screen justify-center bg-black px-8 text-white'}>
      <div className={'w-full max-w-[1400px] text-center'}>{children}</div>
    </div>
  )
}

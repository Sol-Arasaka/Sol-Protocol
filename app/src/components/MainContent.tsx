import type { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  return <div className={'mx-auto max-w-[1200px]'}>{children}</div>
}

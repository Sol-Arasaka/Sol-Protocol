import type { ReactNode } from 'react'

import Footer from '@/components/Footer'
import MainContent from '@/components/MainContent'
import NavBar from '@/components/Navbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  )
}

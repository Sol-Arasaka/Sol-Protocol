import Image from 'next/image'
import { useRouter } from 'next/router'

import { cn } from '@/utils/classnames'
import { Button } from '@/components/base'

import { WalletButton } from './wallet-button'

interface Navbarlink {
  label: string
  link: string
}
export default function NavBar() {
  const router = useRouter()
  console.log(router.pathname)

  const NavLinks: Navbarlink[] = [
    {
      label: 'Home',
      link: '/'
    },
    {
      label: 'Topics',
      link: '/topics'
    },
    {
      label: 'Create',
      link: '/topics/create'
    }
  ]

  return (
    <header className={'z-5 relative left-0 top-0 w-full'}>
      <div className={'flex h-[60px] items-center justify-between bg-navbarBg px-4 shadow-lg shadow-second-dark'}>
        <Button className={'flex gap-0'} variant={null} onClick={() => router.push('/')}>
          <Image src={'/images/logo_1.png'} alt={'Logo'} width={120} height={120} className={'h-12 w-auto'} />
          <div className={'flex flex-col justify-center'}>
            <p className={'text-left text-lg italic leading-none text-second'}>
              {'Reality'}
              <span className={'text-hint'}>{'S'}</span>
              {'ync'}
            </p>
            <p className={'ml-2 text-[10px] leading-4'}>{'Solana Optimistic Oracle'}</p>
          </div>
        </Button>
        <div className={'flex items-center gap-4'}>
          <div className={'flex'}>
            {NavLinks.map((link, key) => {
              return (
                <Button
                  className={cn(
                    'flex h-auto gap-0 rounded-none border-r-2 px-4 text-sm font-bold text-white hover:text-primary-hover',
                    router.pathname === link.link && 'text-primary-light'
                  )}
                  key={key}
                  variant={null}
                  onClick={() => router.push(link.link)}
                >
                  {link.label}
                </Button>
              )
            })}
          </div>

          <WalletButton />
        </div>
      </div>
    </header>
  )
}

import Image from 'next/image'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Button, Icon } from '@/components/base'

import { WalletButton } from './wallet-button'

export default function NavBar() {
  const router = useRouter()
  return (
    <header className={'left-0 top-0 z-40  w-full  shadow-lg'}>
      <div className={'flex h-[60px] items-center justify-between bg-background px-4'}>
        <Button className={'flex gap-0'} variant={null} onClick={() => router.push('/')}>
          <Image src={'/images/logo_1.png'} alt={'Logo'} width={32} height={32} className={'h-12 w-auto'} />
          <div className={"flex flex-col justify-center"}>
            <p className={'text-left text-lg italic leading-none text-second'}>
              {'Reality'}
              <span className={"text-hint"}>{"S"}</span>
              {'ync'}
              </p>
            <p className={"ml-2 text-[10px] leading-4"}>{"Solana Optimistic Oracle"}</p>
          </div>
        </Button>
        <div className={'flex items-center gap-4'}>
          <WalletButton />
          <Button size={'icon'} className={'rounded-full bg-transparent text-white hover:bg-primary'}>
            <Icon name={'Menu'} className={'w-5'} />
          </Button>
        </div>
      </div>
    </header>
  )
}

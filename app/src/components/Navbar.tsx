import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Button, Icon } from '@/components/base'

import { WalletButton } from "./wallet-button";


export default function NavBar() {
  return (
    <header className={'left-0 top-0 z-40  w-full  shadow-lg'}>
      <div className={'bg-background flex h-[60px] items-center justify-between px-4'}>
        <div className={'flex'}>
          <Image src={'/images/logo_1.png'} alt={'Logo'} width={32} height={32} className={'h-8 w-auto'} />
          <p className={'leading-8 text-white'}>{'RealitySync'}</p>
        </div>
        <div className={'flex items-center gap-4'}>
          {/* <ConnectButton label={"Connect wallet"} /> */}
          <WalletButton />
          <Button size={'icon'} className={'hover:bg-primary rounded-full bg-transparent text-white'}>
            <Icon name={'Menu'} className={'w-5'} />
          </Button>
        </div>
      </div>
    </header>
  )
}

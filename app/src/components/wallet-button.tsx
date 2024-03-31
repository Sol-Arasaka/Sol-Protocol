'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Adapter } from '@solana/wallet-adapter-base'
import { useWallet } from '@solana/wallet-adapter-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from './ui/button'

export function WalletButton() {
  const { connected, publicKey, wallet, wallets, connect, select, disconnect } = useWallet()

  const [showWalletDialog, setShowWalletDialog] = useState(false)

  const onClickWalletButton = useCallback(() => {
    setShowWalletDialog(true)
  }, [])

  const connectWallet = useCallback(
    (adapter: Adapter) => () => {
      select(adapter.name)
    },
    [select]
  )

  const disconnectWallet = useCallback(() => {
    disconnect()
  }, [disconnect])

  const showDialog = useCallback(() => {
    setShowWalletDialog(true)
  }, [])

  useEffect(() => {
    try {
      if (!wallet) {
        setShowWalletDialog(true) // If wallet is not selected, show the wallet selection dialog
        return // Return to prevent further execution
      }

      connect().then(() => {
        setShowWalletDialog(false)
      })
    } catch (e) {
      e instanceof Error && console.log(e)
    }
  }, [wallet, connect])

  return (
    <>
      {connected === true && wallet !== null && publicKey !== null ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={null} className={'h-9 rounded-full bg-primary py-1 hover:bg-primary-hover'}>
              {
                <div className={'flex flex-row items-center justify-center space-x-2 '}>
                  <Image src={wallet.adapter.icon} alt={''} width={15} height={15} />
                  <p>{publicKey.toString().slice(0, 4) + '...' + publicKey.toString().slice(-4)}</p>
                </div>
              }
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className={'py-1'}>
            {/* <DropdownMenuSeparator />  idk what it is */}
            <DropdownMenuItem onClick={showDialog} className={"cursor-pointer rounded-none hover:border-l-4 hover:border-l-primary-light"}>{'Change Wallet'}</DropdownMenuItem> {/* currently only phantom no another  */}
            <DropdownMenuItem onClick={disconnectWallet} className={"cursor-pointer rounded-none hover:border-l-4 hover:border-l-primary-light"}>{'Disconnect'}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant={null}
          onClick={onClickWalletButton}
          className={'h-9 rounded-full bg-white py-1 text-primary hover:bg-primary-hover hover:text-white'}
        >
          {'Connect Wallet'}
        </Button>
      )}

      <Dialog open={showWalletDialog} onOpenChange={(open: boolean) => setShowWalletDialog(open)}>
        <DialogContent className={'max-w-xs border-0 bg-black shadow-2xl  shadow-second-light'}>
          <DialogHeader className={'mb-2'}>
            <DialogTitle className={'text-white'}>{'Connect Sol-Wallet'}</DialogTitle>
          </DialogHeader>

          {wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              className={
                'flex flex-row items-center space-x-4 rounded-e-md border-l-4 p-3 transition-colors hover:bg-gray-800'
              }
              onClick={connectWallet(wallet.adapter)}
            >
              <Image src={wallet.adapter.icon} alt={''} width={25} height={25} />
              <p className={'text-hint'}>{wallet.adapter.name}</p>
            </button>
          ))}
        </DialogContent>
      </Dialog>
    </>
  )
}

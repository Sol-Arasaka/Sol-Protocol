"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Adapter } from "@solana/wallet-adapter-base";
import { cn } from "@/utils/classnames";

export function WalletButton() {
  const { connected, publicKey, wallet, wallets, connect, select, disconnect } =
    useWallet();

  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const onClickWalletButton = useCallback(() => {
    setShowWalletDialog(true);
  }, []);

  const connectWallet = useCallback(
    (adapter: Adapter) => () => {
      select(adapter.name);
    },
    [select]
  );

  const disconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const showDialog = useCallback(() => {
    setShowWalletDialog(true);
  }, []);

  useEffect(() => {
    try {
      if (!wallet) {
        setShowWalletDialog(true); // If wallet is not selected, show the wallet selection dialog
        return; // Return to prevent further execution
      }
  
      connect().then(() => {
        setShowWalletDialog(false);
      });
    } catch (e) {
      e instanceof Error && console.log(e);
    }
  }, [wallet, connect]);
  
  return (
    <>
      {connected === true && wallet !== null && publicKey !== null ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"default"}>
              {
                <div className={"flex flex-row items-center justify-center space-x-2 "}>
                  <Image
                    src={wallet.adapter.icon}
                    alt={""}
                    width={15}
                    height={15}
                  />
                  <p>
                    {publicKey.toString().slice(0, 4) +
                      "..." +
                      publicKey.toString().slice(-4)}
                  </p>
                </div>
              }
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className={"text-white"}>
            <DropdownMenuLabel>{"Settings"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={showDialog }>
              {"Change Wallet"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet}>
              {"Disconnect"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant={"outline"}
          onClick={onClickWalletButton}
          className={cn("text-white",`${!connected && "text-primary"}`)}
        >
          {"Connect Wallet"}
        </Button>
      )}

      <Dialog
        open={showWalletDialog}
        onOpenChange={(open: boolean) => setShowWalletDialog(open)}
      >
        <DialogContent className={"max-w-xs"}>
          <DialogHeader className={"mb-2"}>
            <DialogTitle>{"Connect Wallet"}</DialogTitle>
          </DialogHeader>

          {wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              className={"flex flex-row items-center space-x-4 rounded-lg border border-white/5 p-3 transition-colors hover:bg-white/5"}
              onClick={connectWallet(wallet.adapter)}
            >
              <Image src={wallet.adapter.icon} alt={""} width={25} height={25} />
              <p>{wallet.adapter.name}</p>
            </button>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}

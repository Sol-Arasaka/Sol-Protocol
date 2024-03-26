import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import type { AppProps } from 'next/app'
import { connectorsForWallets, midnightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { metaMaskWallet, phantomWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'

const projectId = 'YOUR_PROJECT_ID'

const appName = 'RainbowKit demo'

const connectors = connectorsForWallets(
  [{ groupName: 'Popular', wallets: [metaMaskWallet, phantomWallet, walletConnectWallet] }],
  {
    projectId,
    appName
  }
)

const config = createConfig({
  connectors: [
    ...connectors,
    coinbaseWallet({
      appName
    }),
    walletConnect({
      projectId
    })
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  },
  multiInjectedProviderDiscovery: false,
  ssr: true
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={midnightTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default MyApp

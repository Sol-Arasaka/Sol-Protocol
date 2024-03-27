import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import type { AppProps } from 'next/app'
import { Web3Provider } from "@/components/web3-provider";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>

    // <WagmiProvider config={config}>
    //   <QueryClientProvider client={queryClient}>
    //     <RainbowKitProvider theme={midnightTheme()}>
    //       <Component {...pageProps} />
    //     </RainbowKitProvider>
    //   </QueryClientProvider>
    // </WagmiProvider>
  )
}

export default MyApp

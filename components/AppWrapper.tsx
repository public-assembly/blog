import NextNProgress from 'nextjs-progressbar'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { createClient, configureChains, WagmiConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { SWRConfig } from 'swr'
import '@rainbow-me/rainbowkit/styles.css';
import {createClient as urqlCreateClient} from 'urql';
import {Provider as UrqlProvider} from 'urql';

const { chains, provider } = configureChains(
  // [mainnet],
  [goerli],
  [
    alchemyProvider({
      priority: 0,
      // apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || ""
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY_GOERLI || ""
    }),
    jsonRpcProvider({
      priority: 1,
      rpc: (chain) =>
        chain.id === 1
          ? { http: 'https://rpc.ankr.com/eth' }
          : { http: 'https://rpc.ankr.com/eth_goerli' },
    }),
    publicProvider({ priority: 2 }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'index',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const urqlClient = urqlCreateClient({
  url: "https://api.zora.co/graphql"
})    

export function AppWrapper({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div>
      <UrqlProvider value={urqlClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            coolMode
            theme={lightTheme({
              accentColor: 'black',
              borderRadius: 'large',
            })}>
            <SWRConfig
              value={{
                fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
              }}>
              <NextNProgress
                color="rgba(0,0,0,.5)"
                startPosition={0.125}
                stopDelayMs={200}
                height={2}
                showOnShallow={true}
                options={{ showSpinner: false }}
              />
              {children}
            </SWRConfig>
          </RainbowKitProvider>
        </WagmiConfig>
      </UrqlProvider>
    </div>
  )
}

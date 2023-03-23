import dynamic from 'next/dynamic'
import { ConnectButton} from '@rainbow-me/rainbowkit'

const DisconnectButton = dynamic(() => import('./auth/Disconnect'), {
  ssr: false,
})

const Connect = dynamic(() => import('./auth/Connect'), {
  ssr: false,
})

import { Navigation } from './Navigation'

export function Header() {

  return (
    <header className="absolute flex flex-row justify-start items-start py-4 w-full px-2 sm:px-[70px]  gap-2">
      <Navigation />
      <div className="fixed top-4 right-4">
        <Connect /> 
      </div>
    </header>
  )
}

{/* <ConnectButton /> */}
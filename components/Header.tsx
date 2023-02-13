import dynamic from 'next/dynamic'
import { ConnectButton} from '@rainbow-me/rainbowkit'

const DisconnectButton = dynamic(() => import('./elements/auth/Disconnect'), {
  ssr: false,
})

const Connect = dynamic(() => import('./elements/auth/Connect'), {
  ssr: false,
})

import { Navigation } from './Navigation'

export function Header() {

  return (
    <header className="absolute flex flex-row justify-start items-start py-4 w-full px-4 gap-2">
      <Navigation />
      {/* <div className="fixed top-4 right-4">
        <Connect /> 
      </div> */}
    </header>
  )
}

{/* <ConnectButton /> */}
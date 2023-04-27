import dynamic from 'next/dynamic'
import { ConnectButton} from '@rainbow-me/rainbowkit'
import { useRouter } from "next/router";
import { Navigation } from './Navigation'

const Connect = dynamic(() => import('./auth/Connect'), {
  ssr: false,
})

export function Header() {

  const router = useRouter()

  return (
    <>
      {router.asPath === "/" ? (
        <header className="absolute flex flex-row justify-start items-start py-4 w-full px-2 sm:px-[30px]  gap-2">          
          <div className="fixed top-4 right-4">
            <Connect /> 
          </div>
        </header>  
        ) : (
          <header className="absolute flex flex-row justify-start items-start py-4 w-full px-2 sm:px-[30px]  gap-2">
            <Navigation />            
            <div className="fixed top-4 right-4">
              <Connect /> 
            </div>
          </header>
      )}
    </>

  )
}

{/* <ConnectButton /> */}
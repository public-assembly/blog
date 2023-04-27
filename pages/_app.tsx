import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from './../components'
import { AppWrapper } from './../components'
import dynamic from 'next/dynamic'

function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>    
      <div>
        <Header />
        <main className="">
          <Component {...pageProps} />
        </main>
      </div>
    </AppWrapper>
  )
}

export default App

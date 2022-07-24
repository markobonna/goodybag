import 'focus-visible'
import '@/styles/tailwind.css'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import { Header } from '../components/Header'

const desiredChainId = ChainId.Mumbai

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Header />
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}
